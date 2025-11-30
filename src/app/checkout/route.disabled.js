// src/app/checkout/route.js
import Stripe from "stripe";
import { headers as nextHeaders, cookies as nextCookies } from "next/headers";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
});

// Fallback: dacă vine doar productKey, îl mapăm la priceId din .env
const PRODUCT_TO_PRICE = {
  AA_SL: process.env.STRIPE_PRICE_AA_SL,
  AA_HL: process.env.STRIPE_PRICE_AA_HL,
};

function withSessionId(u) {
  if (!u) return u;
  return u.includes("{CHECKOUT_SESSION_ID}")
    ? u
    : (u.includes("?")
        ? `${u}&session_id={CHECKOUT_SESSION_ID}`
        : `${u}?session_id={CHECKOUT_SESSION_ID}`);
}

async function getUidAndEmail() {
  const hdrs = await nextHeaders();
  const bearer = hdrs.get("authorization")?.replace(/^Bearer\s+/i, "") || null;
  const cookieToken =
    (await nextCookies()).get("firebase_id_token")?.value ||
    (await nextCookies()).get("__session")?.value ||
    null;
  const token = bearer || cookieToken;
  if (!token) return { uid: null, email: null };

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    const user = await adminAuth.getUser(decoded.uid).catch(() => null);
    return { uid: decoded.uid, email: user?.email || null };
  } catch {
    return { uid: null, email: null };
  }
}

async function findOrCreateCustomer(uid, email) {
  // caută maparea existentă
  const mapSnap = await adminDb
    .collection("stripe_customers")
    .where("uid", "==", uid)
    .limit(1)
    .get();
  if (!mapSnap.empty) return mapSnap.docs[0].id;

  // evită duplicate pe email
  let existing = null;
  if (email) {
    const found = await stripe.customers.list({ email, limit: 1 });
    existing = found.data?.[0] || null;
  }

  const customer =
    existing ||
    (await stripe.customers.create({
      email: email || undefined,
      metadata: { uid },
    }));

  await adminDb.collection("stripe_customers").doc(customer.id).set(
    {
      uid,
      email: customer.email || email || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );

  return customer.id;
}

export async function POST(req) {
  try {
    const { uid, email } = await getUidAndEmail();
    if (!uid) return new Response("Unauthorized", { status: 401 });

    let { priceId, productKey, quantity = 1, successUrl, cancelUrl } =
      (await req.json?.()) || {};

    // Fallback dacă nu primim priceId
    if (!priceId && productKey) priceId = PRODUCT_TO_PRICE[productKey];
    if (!priceId) return new Response("Missing priceId", { status: 400 });

    const customerId = await findOrCreateCustomer(uid, email);
    const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer: customerId,
      line_items: [{ price: priceId, quantity }],
      allow_promotion_codes: true,
      client_reference_id: uid,
      metadata: { uid, productKey: productKey || "", from: "web" },
      success_url: withSessionId(
        successUrl || process.env.STRIPE_SUCCESS_URL || `${origin}/success`
      ),
      cancel_url:
        cancelUrl || process.env.STRIPE_CANCEL_URL || `${origin}/cancel`,
    });

    return new Response(
      JSON.stringify({ id: session.id, sessionId: session.id, url: session.url }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("[create-checkout-session] error:", err);
    return new Response("Server error", { status: 500 });
  }
}
