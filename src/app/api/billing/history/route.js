// src/app/api/billing/history/route.js 
import Stripe from "stripe";
import { headers, cookies } from "next/headers";
import { admin } from "../../../../lib/firebaseAdmin.js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
});

/* ---------------- helpers ---------------- */

// cache local pentru numele produsului (din Price -> Product)
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

async function getUidAndEmailFromRequest() {
  const h = await headers();
  const ck = await cookies();

  const rawAuth = h.get("authorization");
  const bearer = rawAuth?.match(/^Bearer\s+(.+)$/i)?.[1] || null;
  const token =
    bearer ||
    ck.get("idToken")?.value ||
    ck.get("firebase_id_token")?.value ||
    ck.get("__session")?.value ||
    null;

  if (!token) return { uid: null, email: null };

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const user = await admin.auth().getUser(decoded.uid).catch(() => null);
    return { uid: decoded.uid, email: user?.email || null };
  } catch {
    return { uid: null, email: null };
  }
}

/* ---------------- route ---------------- */

export async function GET() {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return new Response(JSON.stringify({ error: "Missing STRIPE_SECRET_KEY" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 1) Auth
    const { uid, email } = await getUidAndEmailFromRequest();
    if (!uid) {
      return new Response(JSON.stringify({ error: "unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 2) Adunăm posibile customerIds: Firestore map (opțional), Stripe search (metadata), email
    const customerIds = new Set();

    // Firestore map (opțional, nu cade ruta)
    try {
      const { adminDb } = await import("../../../../lib/firebaseAdmin.js");
      const snap = await adminDb
        .collection("stripe_customers")
        .where("uid", "==", uid)
        .get();
      snap.forEach((doc) => customerIds.add(doc.id));

      // legacy: doc id == uid
      const legacy = await adminDb.collection("stripe_customers").doc(uid).get();
      if (legacy.exists) customerIds.add(legacy.id);
    } catch (e) {
      console.warn("[billing/history] Firestore mapping skipped:", e?.message || e);
    }

    // Lansăm în paralel căutările Stripe (nu depind de rezultate între ele)
    const stripeSearchPromise = stripe.customers
      .search({ query: `metadata['firebase_uid']:'${uid}'`, limit: 20 })
      .then((found) => found?.data || [])
      .catch((e) => {
        console.warn("[billing/history] Stripe search warn:", e?.message || e);
        return [];
      });

    const stripeByEmailPromise = email
      ? stripe.customers
          .list({ email, limit: 20 })
          .then((res) => res?.data || [])
          .catch((e) => {
            console.warn("[billing/history] Stripe list-by-email warn:", e?.message || e);
            return [];
          })
      : Promise.resolve([]);

    const [searchCustomers, emailCustomers] = await Promise.all([
      stripeSearchPromise,
      stripeByEmailPromise,
    ]);

    for (const c of searchCustomers) customerIds.add(c.id);
    for (const c of emailCustomers) customerIds.add(c.id);

    const ids = Array.from(customerIds);
    if (!ids.length) {
      return new Response(JSON.stringify({ customerIds: [], invoices: [] }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "private, max-age=30, s-maxage=0, stale-while-revalidate=120",
        },
      });
    }

    // 3) Invoices: cerem pentru toți clienții în paralel (de obicei 1–2)
    const lists = await Promise.all(
      ids.map((cid) =>
        stripe.invoices
          .list({
            customer: cid,
            limit: 50,
            expand: [
              "data.payment_intent",
              "data.payment_intent.latest_charge",
              // NU extindem product-ul aici – îl luăm separat din Price (cu cache)
            ],
          })
          .catch((e) => {
            console.warn("[billing/history] invoices.list warn:", e?.message || e);
            return { data: [] };
          })
      )
    );

    const aggregate = [];
    for (const list of lists) {
      for (const inv of list.data || []) {
        const line = inv.lines?.data?.[0] || null;
        const priceObj = line?.price || null;

        const priceId =
          (priceObj && typeof priceObj === "object" && priceObj.id) ||
          (typeof line?.price === "string" ? line.price : null);

        // product label: prioritate description/nickname, altfel fetch Price->Product (cu cache)
        const productLabel =
          line?.description ||
          (priceObj && typeof priceObj === "object" && priceObj.nickname) ||
          (await productLabelFromPrice(priceId)) ||
          null;

        const amount_total = inv.amount_paid ?? inv.total ?? inv.amount_due ?? 0;

        // receipt_url din latest_charge
        let receipt_url = null;
        const pi =
          inv.payment_intent && typeof inv.payment_intent === "object"
            ? inv.payment_intent
            : null;
        if (pi && pi.latest_charge && typeof pi.latest_charge === "object") {
          receipt_url = pi.latest_charge.receipt_url || null;
        }

        aggregate.push({
          id: inv.id,
          number: inv.number || null,
          status: inv.status,
          paid: inv.status === "paid",
          currency: inv.currency,
          amount_total,
          amount_paid: inv.amount_paid ?? amount_total,
          amount_due: inv.amount_due ?? amount_total,
          created: inv.created ? new Date(inv.created * 1000).toISOString() : null,
          hosted_invoice_url: inv.hosted_invoice_url || null,
          invoice_pdf: inv.invoice_pdf || null,
          receipt_url,
          view_url: inv.hosted_invoice_url || receipt_url || null,
          priceId,
          product_id:
            (priceObj && typeof priceObj === "object" && priceObj.product && typeof priceObj.product === "string"
              ? priceObj.product
              : null) || null,
          product_label: productLabel,
        });
      }
    }

    // dedupe + sort desc după created
    const byId = new Map();
    for (const row of aggregate) byId.set(row.id, row);
    const invoices = Array.from(byId.values()).sort(
      (a, b) =>
        (b.created ? Date.parse(b.created) : 0) -
        (a.created ? Date.parse(a.created) : 0)
    );

    return new Response(JSON.stringify({ customerIds: ids, invoices }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        // cache privat (browser) 30s + SWR 120s — percepție mai rapidă la reveniri
        "Cache-Control": "private, max-age=30, s-maxage=0, stale-while-revalidate=120",
      },
    });
  } catch (err) {
    console.error("[billing/history] error:", err);
    return new Response(
      JSON.stringify({ error: "history-failed", details: err?.message || "Unknown" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
