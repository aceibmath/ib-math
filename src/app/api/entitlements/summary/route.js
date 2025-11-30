// src/app/api/entitlements/summary/route.js
import Stripe from "stripe";
import { headers as nextHeaders, cookies as nextCookies } from "next/headers";
import { admin, adminDb } from "../../../../lib/firebaseAdmin.js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripeSecret = process.env.STRIPE_SECRET_KEY || "";
const stripe = stripeSecret ? new Stripe(stripeSecret, { apiVersion: "2024-06-20" }) : null;

// course keys acceptate în UI
const COURSE_KEYS = ["AA_SL", "AA_HL", "AI_SL", "AI_HL"];
const isCourseKey = (s) => typeof s === "string" && COURSE_KEYS.includes(s);

// mapare fallback din prețuri cunoscute din env (dacă le ai setate)
const PRICE_TO_COURSE = {};
if (process.env.STRIPE_PRICE_AA_SL) PRICE_TO_COURSE[process.env.STRIPE_PRICE_AA_SL] = "AA_SL";
if (process.env.STRIPE_PRICE_AA_HL) PRICE_TO_COURSE[process.env.STRIPE_PRICE_AA_HL] = "AA_HL";
if (process.env.STRIPE_PRICE_AI_SL) PRICE_TO_COURSE[process.env.STRIPE_PRICE_AI_SL] = "AI_SL";
if (process.env.STRIPE_PRICE_AI_HL) PRICE_TO_COURSE[process.env.STRIPE_PRICE_AI_HL] = "AI_HL";

function toISO(d) {
  if (!d) return null;
  try {
    if (typeof d === "string" || typeof d === "number") {
      const dd = new Date(d);
      return Number.isNaN(dd.getTime()) ? null : dd.toISOString();
    }
    if (d instanceof Date) {
      return Number.isNaN(d.getTime()) ? null : d.toISOString();
    }
    if (typeof d === "object") {
      if (typeof d.toDate === "function") {
        const dd = d.toDate();
        return Number.isNaN(dd.getTime()) ? null : dd.toISOString();
      }
      if (typeof d._seconds === "number") {
        const dd = new Date(d._seconds * 1000);
        return Number.isNaN(dd.getTime()) ? null : dd.toISOString();
      }
    }
  } catch {}
  return null;
}
const isActive = (iso) => {
  if (!iso) return false;
  const t = Date.parse(iso);
  return Number.isFinite(t) && Date.now() < t;
};

async function getUid() {
  const hdrs = await nextHeaders();
  const bearer = hdrs.get("authorization")?.replace(/^Bearer\s+/i, "") || null;
  const cookieToken =
    (await nextCookies()).get("firebase_id_token")?.value ||
    (await nextCookies()).get("__session")?.value ||
    null;
  const token = bearer || cookieToken;
  if (!token) return null;
  try {
    const d = await admin.auth().verifyIdToken(token);
    return d?.uid || null;
  } catch {
    return null;
  }
}

// cache simplu pentru Stripe
const priceMetaCache = new Map();
async function resolveFromStripe(priceId) {
  if (!stripe || !priceId) return { keys: [], teacher: false };
  if (priceMetaCache.has(priceId)) return priceMetaCache.get(priceId);

  try {
    const price = await stripe.prices.retrieve(priceId, { expand: ["product"] });
    const prod = price?.product && typeof price.product === "object" ? price.product : null;
    const md = prod?.metadata || {};
    let keys = [];

    // suportă diverse forme: course_keys (CSV), course_keys_array (JSON), course_key (unic)
    if (md.course_keys_array) {
      try { keys = JSON.parse(md.course_keys_array); } catch {}
    }
    if (!keys?.length && md.course_keys) {
      keys = String(md.course_keys).split(",").map(s => s.trim());
    }
    if (!keys?.length && md.course_key) {
      keys = [String(md.course_key).trim()];
    }

    keys = (keys || []).filter(isCourseKey);
    const teacher = String(md.teacher || "").toLowerCase() === "true";

    const out = { keys, teacher };
    priceMetaCache.set(priceId, out);
    return out;
  } catch {
    return { keys: [], teacher: false };
  }
}

export async function GET() {
  try {
    const uid = await getUid();
    if (!uid) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const snap = await adminDb.collection("users").doc(uid).collection("entitlements").get();

    // default: toate free
    const result = {
      student: { AA_SL: "free", AA_HL: "free", AI_SL: "free", AI_HL: "free" },
      educator: { AA_SL: "free", AA_HL: "free", AI_SL: "free", AI_HL: "free" },
    };

    for (const doc of snap.docs) {
      const id = doc.id;
      const data = doc.data() || {};

      // expirare
      const endIso = toISO(data.expiresAt) || toISO(data.activeUntil) || toISO(data.endsAt);
      if (!isActive(endIso)) continue;

      // detectăm audience
      let teacher = !!data.teacher;

      // ce course keys acoperă acest entitlement?
      let keys = [];

      // 1) doc.id chiar e un course key?
      if (isCourseKey(id)) {
        keys = [id];
      }

      // 2) câmpuri din document
      if (!keys.length && isCourseKey(data.courseKey)) keys = [data.courseKey];
      if (!keys.length && isCourseKey(data.productKey)) keys = [data.productKey];

      // 3) fallback: doc.id e un price_... ?
      if (!keys.length && typeof id === "string" && id.startsWith("price_")) {
        // întâi mapare statică din env, apoi Stripe
        if (PRICE_TO_COURSE[id]) {
          keys = [PRICE_TO_COURSE[id]];
        } else {
          const fromStripe = await resolveFromStripe(id);
          keys = fromStripe.keys || [];
          // dacă în doc nu e setat teacher, folosește ce spune metadata Stripe
          if (!data.hasOwnProperty("teacher")) teacher = !!fromStripe.teacher;
        }
      }

      // nimic de marcat
      if (!keys.length) continue;

      // marchează premium la audiența corectă
      const audience = teacher ? "educator" : "student";
      for (const k of keys) {
        if (isCourseKey(k)) result[audience][k] = "premium";
      }
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[entitlements/summary] error:", err);
    // în caz de eroare: tot free (UI rămâne funcțional)
    return new Response(
      JSON.stringify({
        student: { AA_SL: "free", AA_HL: "free", AI_SL: "free", AI_HL: "free" },
        educator: { AA_SL: "free", AA_HL: "free", AI_SL: "free", AI_HL: "free" },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
}
