// src/app/api/create-checkout-session/route.js 
import Stripe from "stripe";
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
  // mapare existentă uid → customer
  const mapSnap = await adminDb
    .collection("stripe_customers")
    .where("uid", "==", uid)
    .limit(1)
    .get();
  if (!mapSnap.empty) return mapSnap.docs[0].id;

  // creează customer
  const customer = await stripe.customers.create({
    email: email || undefined,
    metadata: { firebase_uid: uid },
  });

  // persistă maparea
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

    // 1) Autentificare: token din headers/cookies. În DEV permitem fallback la uid din body.
    let { uid, email } = await getUidAndEmail();
    if (!uid && uidFromBody && process.env.NODE_ENV !== "production") {
      uid = uidFromBody; // DEV fallback (pentru testele locale)
    }
    if (!uid) return new Response("Unauthorized", { status: 401 });

    if (!lookupKey) {
      return new Response(JSON.stringify({ error: "lookupKey is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 2) Rezolvăm Price după lookup_key și expandăm product pentru metadata
    const priceList = await stripe.prices.list({
      lookup_keys: [lookupKey],
      expand: ["data.product"],
      limit: 1,
    });

    if (!priceList.data.length) {
      return new Response(
        JSON.stringify({ error: `No price found for lookupKey: ${lookupKey}` }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const price = priceList.data[0];
    const product = price.product;

    // 3) Extragem metadata relevante (redundanță utilă pentru webhook)
    const productMeta = product?.metadata || {};
    const durationMonths = parseInt(price?.metadata?.duration_months || "0", 10) || 0;

    let courseKeys = [];
    if (productMeta.course_keys) {
      courseKeys = String(productMeta.course_keys)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (productMeta.course_keys_array) {
      try {
        courseKeys = JSON.parse(productMeta.course_keys_array) || [];
      } catch {
        courseKeys = [];
      }
    }

    const teacher = String(productMeta.teacher || "").toLowerCase() === "true";
    const bundle = String(productMeta.bundle || "").toLowerCase() === "true";

    // 4) Customer (pentru invoice/istoric)
    const customerId = await findOrCreateCustomer(uid, email);

    // 5) URL-uri de redirect
    const base = siteUrlFrom(req);
    const successUrl =
      process.env.STRIPE_SUCCESS_URL ||
      `${base}/billing/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = process.env.STRIPE_CANCEL_URL || `${base}/billing/cancel`;

    // 6) Creăm sesiunea de Checkout în modul "payment" (one-off)
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer: customerId,
      line_items: [{ price: price.id, quantity }],
      allow_promotion_codes: true,
      invoice_creation: { enabled: true },
      client_reference_id: uid,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        uid,                               // <-- ADĂUGAT: trimitem UID și în metadata
        lookup_key: lookupKey,
        duration_months: String(durationMonths),
        course_keys_csv: courseKeys.join(","),
        teacher: String(teacher),
        bundle: String(bundle),
      },
    });

    return new Response(
      JSON.stringify({ id: session.id, url: session.url }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("[create-checkout-session] error:", err);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
