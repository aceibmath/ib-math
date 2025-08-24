// src/app/api/stripe/create-portal-session/route.js
import Stripe from "stripe";
import { headers as nextHeaders, cookies as nextCookies } from "next/headers";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
});

async function getUidAndEmail() {
  const hdrs = await nextHeaders();
  const bearer = hdrs.get("authorization")?.replace(/^Bearer\s+/i, "") || null;
  const cookieToken = (await nextCookies()).get("idToken")?.value || null;
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
  // mapare existentă
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

  // persist maparea
  await adminDb.collection("stripe_customers").doc(customer.id).set({
    uid,
    createdAt: Date.now(),
  });

  return customer.id;
}

export async function POST(req) {
  try {
    const { uid, email } = await getUidAndEmail();
    if (!uid) return new Response("Unauthorized", { status: 401 });

    const { priceId, productKey = "", quantity = 1, successUrl, cancelUrl } =
      await req.json();

    if (!priceId) return new Response("Missing priceId", { status: 400 });

    const customerId = await findOrCreateCustomer(uid, email);
    const origin = new URL(req.url).origin;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer: customerId,
      line_items: [{ price: priceId, quantity }],
      allow_promotion_codes: true,
      invoice_creation: { enabled: true },
      metadata: { uid, productKey, from: "web" },
      client_reference_id: uid,
      success_url:
        successUrl ||
        `${origin}/account/billing?success=1&cs={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${origin}/membership?canceled=1`,
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
