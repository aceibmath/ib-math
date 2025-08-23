// src/app/api/stripe/webhook/route.js
import Stripe from "stripe";
import { admin, adminDb } from "../../../../lib/firebaseAdmin.js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
});

/* ================= Helpers ================= */

function plusOneYear(msOrIso) {
  const d = new Date(msOrIso);
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString();
}

async function upsertEntitlement({ uid, priceId, created, displayName }) {
  if (!uid || !priceId) return;
  const ref = adminDb.collection("users").doc(uid).collection("entitlements").doc(priceId);
  const snap = await ref.get();
  const newUntil = plusOneYear(created);

  let activeUntil = newUntil;
  if (snap.exists && snap.data()?.activeUntil) {
    const prev = new Date(snap.data().activeUntil).getTime();
    const next = new Date(newUntil).getTime();
    activeUntil = new Date(Math.max(prev, next)).toISOString();
  }

  await ref.set(
    {
      priceId,
      displayName: displayName || null,
      activeUntil,
      status: "active",
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}

async function mapCustomerToUid(customerId, fallbackUid = null, email = null) {
  if (!customerId) return fallbackUid || null;

  // caută mapare existentă
  const doc = await adminDb.collection("stripe_customers").doc(customerId).get();
  if (doc.exists && doc.data()?.uid) return doc.data().uid;

  // dacă nu există, încearcă să cauți după email (din Stripe)
  if (!fallbackUid && email) {
    try {
      const usersByEmail = await admin.auth().getUserByEmail(email).catch(() => null);
      if (usersByEmail?.uid) fallbackUid = usersByEmail.uid;
    } catch {}
  }

  // scrie o mapare minimă
  if (fallbackUid || email) {
    await adminDb
      .collection("stripe_customers")
      .doc(customerId)
      .set({ uid: fallbackUid || null, email: email || null }, { merge: true });
  }
  return fallbackUid || null;
}

const priceNameCache = new Map();
async function productLabelFromPrice(priceId) {
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

async function getPriceAndProductFromInvoice(inv) {
  // În unele evenimente, invoice nu are lines expandate complet → fallback la retrieve
  let invoice = inv;
  if (!invoice?.lines?.data?.length || !invoice.lines.data[0]?.price) {
    try {
      invoice = await stripe.invoices.retrieve(inv.id, { expand: ["lines.data.price"] });
    } catch {
      invoice = inv;
    }
  }
  const line = invoice?.lines?.data?.[0] || null;
  const priceId =
    (line?.price && typeof line.price === "object" && line.price.id) ||
    (typeof line?.price === "string" ? line.price : null) ||
    null;

  const displayName =
    (line?.price && typeof line.price === "object" && line.price.nickname) ||
    (await productLabelFromPrice(priceId)) ||
    line?.description ||
    null;

  return { priceId, displayName };
}

/* ================= Handler ================= */

export async function POST(req) {
  // Stripe cere raw body pentru verificarea semnăturii
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET;
  if (!sig || !secret) {
    return new Response("Missing webhook signature/secret", { status: 400 });
  }

  const rawBody = await req.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, secret);
  } catch (err) {
    console.error("[webhook] Bad signature:", err?.message);
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const uid = session.metadata?.uid || null;
        const email =
          session.customer_details?.email || session.customer_email || null;
        const customerId = session.customer || null;

        // 🔗 păstrăm maparea customer → uid/email
        if (customerId) {
          await adminDb.collection("stripe_customers").doc(customerId).set(
            {
              uid: uid || null,
              email: email || null,
              lastCheckoutSessionId: session.id,
              updatedAt: new Date().toISOString(),
            },
            { merge: true }
          );
        }

        // ✅ dacă e subscription, o marcăm NO-RENEW: cancel_at_period_end = true
        if (session.mode === "subscription" && typeof session.subscription === "string") {
          await stripe.subscriptions.update(session.subscription, {
            cancel_at_period_end: true,
          });
        }

        break;
      }

      // 🔁 Fallback: în unele fluxuri Stripe poate trimite întâi acest eveniment
      case "customer.subscription.created": {
        const sub = event.data.object;
        if (sub?.id) {
          try {
            await stripe.subscriptions.update(sub.id, {
              cancel_at_period_end: true,
            });
          } catch (e) {
            console.warn("[webhook] cancel_at_period_end on subscription.created failed:", e?.message);
          }
        }
        break;
      }

      case "invoice.payment_succeeded": {
        // prima plată a subscripției (și fiecare reînnoire, în general)
        const inv = event.data.object;
        const customerId = inv.customer || null;
        const email = inv.customer_email || null;
        let uid = null;

        if (customerId) {
          uid = await mapCustomerToUid(customerId, null, email);
        }

        // dacă tot nu avem uid, încearcă din hosted invoice customer
        if (!uid && typeof inv.customer === "string") {
          try {
            const c = await stripe.customers.retrieve(inv.customer);
            uid = c?.metadata?.firebase_uid || uid;
          } catch {}
        }

        if (!uid) break; // fără uid nu putem acorda entitlement

        const { priceId, displayName } = await getPriceAndProductFromInvoice(inv);
        if (!priceId) break;

        await upsertEntitlement({
          uid,
          priceId,
          created: new Date((inv.created || Math.floor(Date.now() / 1000)) * 1000),
          displayName,
        });

        break;
      }

      case "charge.succeeded": {
        // fallback pentru plăți one-time (dacă mai există)
        const charge = event.data.object;
        const customerId = charge.customer || null;
        const invId = charge.invoice || null;
        const email = charge.billing_details?.email || null;

        let uid = null;
        if (customerId) {
          uid = await mapCustomerToUid(customerId, null, email);
        }

        if (uid && invId) {
          try {
            const inv = await stripe.invoices.retrieve(invId, { expand: ["lines.data.price"] });
            const { priceId, displayName } = await getPriceAndProductFromInvoice(inv);
            if (priceId) {
              await upsertEntitlement({
                uid,
                priceId,
                created: new Date(charge.created * 1000),
                displayName,
              });
            }
          } catch {}
        }
        break;
      }

      default:
        // alte evenimente le ignorăm
        break;
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[webhook] handler error:", err);
    return new Response("Webhook handler failed", { status: 500 });
  }
}
