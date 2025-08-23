// src/app/api/entitlements/route.js
import Stripe from "stripe";
import { headers as nextHeaders, cookies as nextCookies } from "next/headers";
import { admin, adminDb } from "../../../lib/firebaseAdmin.js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
});

// Map productKey -> priceId (fallback)
const PRODUCT_KEY_TO_PRICE = {
  AA_SL: process.env.STRIPE_PRICE_AA_SL,
  AA_HL: process.env.STRIPE_PRICE_AA_HL,
};

function isActive(iso) {
  if (!iso) return false;
  const t = Date.parse(iso);
  return Number.isFinite(t) && Date.now() < t;
}

// Acceptă ISO string, number (ms), Date, Firestore Timestamp
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

const priceNameCache = new Map();
async function getNameFromPrice(priceId) {
  if (!priceId) return null;
  if (priceNameCache.has(priceId)) return priceNameCache.get(priceId);
  try {
    const price = await stripe.prices.retrieve(priceId, { expand: ["product"] });
    const name =
      (price.product && typeof price.product === "object" && price.product?.name) ||
      price.nickname ||
      null;
    if (name) priceNameCache.set(priceId, name);
    return name;
  } catch {
    return null;
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

    const snap = await adminDb
      .collection("users")
      .doc(uid)
      .collection("entitlements")
      .get();

    const items = [];
    for (const doc of snap.docs) {
      const it = doc.data() || {};
      const endIso =
        toISO(it.activeUntil) ||
        toISO(it.expiresAt) ||
        toISO(it.endsAt) ||
        null;

      // numele produsului: preferă displayName; altfel din Stripe (priceId / productKey / doc.id dacă e price_)
      let name = it.displayName || null;
      if (!name) {
        let priceId =
          it.priceId ||
          PRODUCT_KEY_TO_PRICE[it.productKey] ||
          (typeof doc.id === "string" && doc.id.startsWith("price_") ? doc.id : null);
        name = (await getNameFromPrice(priceId)) || it.productKey || "Premium Access";
      }

      items.push({
        id: doc.id,
        name,
        tier: "premium",
        status: isActive(endIso) ? "active" : "expired",
        currentPeriodEnd: endIso,
      });
    }

    const actives = items
      .filter((x) => x.status === "active")
      .sort((a, b) => Date.parse(b.currentPeriodEnd || 0) - Date.parse(a.currentPeriodEnd || 0));
    const expireds = items
      .filter((x) => x.status === "expired")
      .sort((a, b) => Date.parse(b.currentPeriodEnd || 0) - Date.parse(a.currentPeriodEnd || 0));

    const list = [...actives, ...expireds];

    // Free la final
    list.push({
      id: "free",
      name: "Free Membership",
      tier: "free",
      status: "active",
      currentPeriodEnd: null,
    });

    return new Response(JSON.stringify({ items: list }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[api/entitlements] error:", err);
    return new Response(
      JSON.stringify({
        items: [
          {
            id: "free",
            name: "Free Membership",
            tier: "free",
            status: "active",
            currentPeriodEnd: null,
          },
        ],
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
}
