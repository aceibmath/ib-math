// src/app/api/create-checkout-session/route.js
import Stripe from "stripe";
import fs from "node:fs/promises";
import path from "node:path";
import { headers as nextHeaders, cookies as nextCookies } from "next/headers";
import { admin, adminDb } from "../../../lib/firebaseAdmin.js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
});

function siteUrlFrom(req) {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const origin = new URL(req.url).origin;
  return (envUrl || origin).replace(/\/$/, "");
}

function parseLookupKey(lk) {
  // ex: "aa_sl_12m" -> { base:"aa_sl", months:12 }
  const m = String(lk || "").match(/^([a-z_]+)_(\d{1,2})m$/i);
  if (!m) return null;
  return { base: m[1], months: parseInt(m[2], 10) };
}

async function readPricingTable() {
  try {
    const p = path.join(process.cwd(), "public", "pricing-table.json");
    const raw = await fs.readFile(p, "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function friendlyName(base) {
  const TITLES = {
    aa_sl: "SL Analysis & Approaches – Student",
    aa_hl: "HL Analysis & Approaches – Student",
    ai_sl: "SL Applications & Interpretation – Student",
    ai_hl: "HL Applications & Interpretation – Student",
    suite: "Complete Learning Suite – Student",
    teacher_aa_sl: "SL Analysis & Approaches – Teacher PRO",
    teacher_aa_hl: "HL Analysis & Approaches – Teacher PRO",
    teacher_ai_sl: "SL Applications & Interpretation – Teacher PRO",
    teacher_ai_hl: "HL Applications & Interpretation – Teacher PRO",
    teacher_suite: "Complete Learning Suite – Teacher PRO",
  };
  return TITLES[base] || base;
}

function metaFromBase(base) {
  const COURSE_KEY_MAP = { aa_sl: "AA_SL", aa_hl: "AA_HL", ai_sl: "AI_SL", ai_hl: "AI_HL" };
  const teacher = base.startsWith("teacher_");
  const isSuite = base.includes("suite");

  let course_keys = [];
  if (isSuite) {
    course_keys = ["AA_SL", "AA_HL", "AI_SL", "AI_HL"];
  } else {
    const clean = teacher ? base.replace(/^teacher_/, "") : base;
    const ck = COURSE_KEY_MAP[clean];
    if (ck) course_keys = [ck];
  }
  return { teacher, bundle: isSuite, course_keys };
}

async function getUidAndEmail() {
  const hdrs = await nextHeaders();
  const bearer = hdrs.get("authorization")?.replace(/^Bearer\s+/i, "") || null;
  const cookieToken =
    (await nextCookies()).get("firebase_id_token")?.value ||
    (await nextCookies()).get("idToken")?.value ||
    (await nextCookies()).get("__session")?.value ||
    null;

  const token = bearer || cookieToken;
  if (!token) return { uid: null, email: null };

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const user = await admin.auth().getUser(decoded.uid).catch(() => null);
    return { uid: decoded.uid, email: user?.email || null };
  } catch {
    return { uid: null, email: null };
  }
}

async function findOrCreateCustomer(uid, email) {
  const mapSnap = await adminDb
    .collection("stripe_customers")
    .where("uid", "==", uid)
    .limit(1)
    .get();
  if (!mapSnap.empty) return mapSnap.docs[0].id;

  const customer = await stripe.customers.create({
    email: email || undefined,
    metadata: { firebase_uid: uid },
  });

  await adminDb.collection("stripe_customers").doc(customer.id).set({
    uid,
    createdAt: Date.now(),
  });

  return customer.id;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { lookupKey, uid: uidFromBody, quantity = 1 } = body || {};

    // auth
    let { uid, email } = await getUidAndEmail();
    if (!uid && uidFromBody && process.env.NODE_ENV !== "production") {
      uid = uidFromBody; // dev fallback
    }
    if (!uid) return new Response("Unauthorized", { status: 401 });

    if (!lookupKey) {
      return new Response(JSON.stringify({ error: "lookupKey is required" }), {
        status: 400, headers: { "Content-Type": "application/json" },
      });
    }

    const parsed = parseLookupKey(lookupKey);
    if (!parsed) {
      return new Response(
        JSON.stringify({ error: `Invalid lookupKey format: ${lookupKey}` }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const { base, months } = parsed;

    // read pricing-table.json (suma totală pentru lunile alese)
    const table = await readPricingTable();
    const currency = table?.meta?.currency || "eur";
    const row = table?.prices?.[base]?.[String(months)];
    if (!row || typeof row.total_cents !== "number") {
      return new Response(
        JSON.stringify({ error: `No computed price for ${lookupKey} in pricing-table.json` }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    const totalCents = row.total_cents;

    const { teacher, bundle, course_keys } = metaFromBase(base);
    const customerId = await findOrCreateCustomer(uid, email);

    const baseUrl = siteUrlFrom(req);
    const successUrl =
      process.env.STRIPE_SUCCESS_URL ||
      `${baseUrl}/billing/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = process.env.STRIPE_CANCEL_URL || `${baseUrl}/billing/cancel`;

    // UNIFICAT: mereu folosim price_data pentru un look identic în Checkout
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer: customerId,
      line_items: [{
        price_data: {
          currency,
          unit_amount: totalCents,
          product_data: {
            name: `${friendlyName(base)} – ${months} ${months === 1 ? "month" : "months"}`,
            // fără description pentru a nu afișa subtitlu diferit
            metadata: {
              base,
              months: String(months),
              teacher: String(teacher),
              bundle: String(bundle),
              course_keys_csv: course_keys.join(","),
            },
          },
        },
        quantity,
      }],
      allow_promotion_codes: true,
      invoice_creation: { enabled: true },
      client_reference_id: uid,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        uid,
        lookup_key: lookupKey,
        duration_months: String(months),
        course_keys_csv: course_keys.join(","),
        teacher: String(teacher),
        bundle: String(bundle),
      },
    });

    return new Response(JSON.stringify({ id: session.id, url: session.url }), {
      status: 200, headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[create-checkout-session] error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500, headers: { "Content-Type": "application/json" },
    });
  }
}
