// src/lib/entitlements.js
import Stripe from "stripe";
import { admin, adminDb } from "./firebaseAdmin";
import { PRICE_TO_PRODUCT } from "./products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
});

export function plusOneYear(dateOrMs) {
  const d = new Date(dateOrMs);
  d.setFullYear(d.getFullYear() + 1);
  return d;
}

/* ---------- storage ---------- */
export async function upsertEntitlement(uid, productKey, activeUntil, meta = {}) {
  const ref = adminDb.collection("users").doc(uid).collection("entitlements").doc(productKey);
  await ref.set(
    {
      productKey,
      activeUntil, // Date sau Firestore Timestamp — ambele merg, Firestore o salvează corect
      updatedAt: new Date(),
      source: "stripe",
      ...meta,
    },
    { merge: true }
  );
}

/* ---------- read helpers (pt. gating & UI) ---------- */
export async function hasAccess(uid, productKey) {
  const doc = await adminDb
    .collection("users").doc(uid)
    .collection("entitlements").doc(productKey)
    .get();

  if (!doc.exists) return false;
  const data = doc.data();
  const until = typeof data.activeUntil?.toDate === "function"
    ? data.activeUntil.toDate()
    : new Date(data.activeUntil);
  return Date.now() < until.getTime();
}

export async function listEntitlements(uid) {
  const snap = await adminDb.collection("users").doc(uid).collection("entitlements").get();
  return snap.docs.map(d => {
    const x = d.data();
    const until = typeof x.activeUntil?.toDate === "function"
      ? x.activeUntil.toDate()
      : new Date(x.activeUntil);
    return { productKey: d.id, activeUntil: until, ...x };
  });
}

/* ---------- helpers: găsire uid din customerId ---------- */
export async function findUidByCustomer(customerId) {
  // 1) stripe_customers/{customerId} -> { uid }
  const m = await adminDb.collection("stripe_customers").doc(customerId).get();
  if (m.exists && m.data()?.uid) return m.data().uid;

  // 2) users.stripe.customerId == customerId
  const q = await adminDb.collection("users")
    .where("stripe.customerId", "==", customerId)
    .limit(1).get();
  if (!q.empty) return q.docs[0].id;

  return null;
}

/* =============================================================================
   Handlers pe care le chemi din webhook (nu-ți rescriu tot webhook-ul).
   Doar le imporți și le apelezi în switch(event.type).
============================================================================= */

/** invoice.payment_succeeded → setează/înnoiește entitlements la +1 an */
export async function handleInvoicePaymentSucceeded(invoice) {
  const customerId = invoice.customer;
  const uid = await findUidByCustomer(customerId);
  if (!uid) return;

  // asigură-te că avem line items (expand dacă lipsesc)
  const full = invoice.lines
    ? invoice
    : await stripe.invoices.retrieve(invoice.id, { expand: ["lines.data.price.product"] });

  const createdMs = (invoice.created || Math.floor(Date.now() / 1000)) * 1000;
  const activeUntil = plusOneYear(createdMs);

  for (const line of full.lines?.data ?? []) {
    const priceId = line?.price?.id;
    if (!priceId) continue;

    const map = PRICE_TO_PRODUCT[priceId] || {
      key: priceId,
      label: line?.price?.product?.name || line?.price?.nickname || "Unknown Product",
    };

    await upsertEntitlement(uid, map.key, activeUntil, {
      lastInvoiceId: invoice.id,
      productLabel: map.label,
    });
  }
}

/** charge.refunded → revocă imediat entitlements pentru produsele de pe acea factură */
export async function handleChargeRefunded(charge) {
  const paymentIntentId = charge.payment_intent;
  if (!paymentIntentId) return;

  const pi = await stripe.paymentIntents.retrieve(paymentIntentId, { expand: ["invoice"] });
  const invoice = pi?.invoice;
  if (!invoice?.customer) return;

  const uid = await findUidByCustomer(invoice.customer);
  if (!uid) return;

  const full = await stripe.invoices.retrieve(invoice.id, { expand: ["lines.data.price.product"] });

  for (const line of full.lines?.data ?? []) {
    const priceId = line?.price?.id;
    if (!priceId) continue;

    const map = PRICE_TO_PRODUCT[priceId] || { key: priceId };
    await upsertEntitlement(uid, map.key, new Date(), {
      revokedBy: "refund",
      lastInvoiceId: invoice.id,
    });
  }
}
