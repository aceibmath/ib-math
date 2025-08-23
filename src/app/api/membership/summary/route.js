// src/app/api/membership/summary/route.js
import Stripe from "stripe";
import admin from "firebase-admin";
import { headers, cookies } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Map PriceID -> { key, label } (completează dacă mai adaugi produse)
const PRICE_TO = {
  [process.env.STRIPE_PRICE_AA_SL]: {
    key: "AA_SL",
    label: "IB Mathematics Applications & Interpretation SL",
  },
  [process.env.STRIPE_PRICE_AA_HL]: {
    key: "AA_HL",
    label: "IB Mathematics Analysis & Approaches HL",
  },
};

/* ---------------- helpers admin/auth ---------------- */
function ensureAdmin() {
  if (!admin.apps.length) {
    const projectId =
      process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.FIREBASE_PROJECT_ID;
    const clientEmail =
      process.env.FIREBASE_ADMIN_CLIENT_EMAIL || process.env.FIREBASE_CLIENT_EMAIL;
    const privateKeyRaw =
      process.env.FIREBASE_ADMIN_PRIVATE_KEY || process.env.FIREBASE_PRIVATE_KEY;
    const privateKey = privateKeyRaw?.replace(/\\n/g, "\n");
    admin.initializeApp({
      credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
    });
  }
  return { db: admin.firestore(), auth: admin.auth() };
}

async function getUidFromRequest(adminAuth) {
  const h = await headers();
  let idToken =
    h.get("authorization")?.replace(/^Bearer\s+/i, "") ||
    (await cookies()).get("firebase_id_token")?.value ||
    (await cookies()).get("__session")?.value ||
    null;

  if (!idToken) return null;
  try {
    const decoded = await adminAuth.verifyIdToken(idToken);
    return decoded?.uid || null;
  } catch {
    return null;
  }
}

/* ---------------- small utils ---------------- */
function plusOneYear(d) {
  if (!d) return null;
  const x = new Date(d);
  x.setFullYear(x.getFullYear() + 1);
  return x;
}
const uniq = (arr) => Array.from(new Set(arr.filter(Boolean)));

/* ---------------- GET ---------------- */
export async function GET() {
  // întoarcem măcar Free ca să nu fie UI-ul gol
  const baseItems = [
    {
      id: "free",
      name: "Free Membership",
      tier: "free",
      status: "active",
      startDate: null,
      currentPeriodEnd: null,
    },
  ];

  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return new Response(JSON.stringify({ items: baseItems, warning: "Missing STRIPE_SECRET_KEY" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { db, auth: adminAuth } = ensureAdmin();
    const uid = await getUidFromRequest(adminAuth);
    if (!uid) {
      return new Response(JSON.stringify({ items: baseItems, warning: "Unauthorized" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 1) surse customerId: doc user, colecția stripe_customers, căutare după e-mail în Stripe
    const userDoc = await db.collection("users").doc(uid).get();
    const userData = userDoc.exists ? userDoc.data() : {};
    const primaryCustomerId = userData?.stripe?.customerId || null;
    const userEmail =
      userData?.email ||
      (await adminAuth.getUser(uid).then((u) => u.email).catch(() => null));

    const mapSnap = await db.collection("stripe_customers").where("uid", "==", uid).get();
    const mappedIds = mapSnap.docs.map((d) => d.id);

    let emailCustomerIds = [];
    if (userEmail) {
      const found = await stripe.customers.list({ email: userEmail, limit: 100 });
      emailCustomerIds = (found.data || []).map((c) => c.id);
    }

    const customerIds = uniq([primaryCustomerId, ...mappedIds, ...emailCustomerIds]);

    // dacă nu avem customer, măcar afișăm Free
    if (customerIds.length === 0) {
      return new Response(JSON.stringify({ items: baseItems }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 2) facturi plătite → acces pe produse (cea mai recentă per produs)
    const byProduct = new Map(); // productKey -> { created: Date, label: string }

    for (const cid of customerIds) {
      const list = await stripe.invoices.list({ customer: cid, limit: 100, status: "paid" });
      for (const inv of list.data || []) {
        // expand pentru price/product
        const full = await stripe.invoices.retrieve(inv.id, {
          expand: ["lines.data.price.product"],
        });

        for (const line of full.lines?.data ?? []) {
          const priceId = line?.price?.id || null;

          let key = priceId ? (PRICE_TO[priceId]?.key || priceId) : null;
          let label =
            PRICE_TO[priceId]?.label ||
            (line?.price?.product && typeof line.price.product === "object"
              ? line.price.product.name
              : null) ||
            line?.description ||
            "Unknown Product";

          if (!key) continue;

          const created = new Date(full.created * 1000);
          const prev = byProduct.get(key);
          if (!prev || created > prev.created) {
            byProduct.set(key, { created, label });
          }
        }
      }
    }

    // 3) fallback: colecția purchases (dacă nu sunt facturi Stripe găsite)
    if (byProduct.size === 0) {
      const pSnap = await db
        .collection("users")
        .doc(uid)
        .collection("purchases")
        .where("status", "==", "paid")
        .get();

      for (const doc of pSnap.docs) {
        const data = doc.data();
        const created =
          (typeof data.created?.toDate === "function" ? data.created.toDate() : data.created) ||
          new Date();
        const priceId = data.priceId || null;
        const key = data.productKey || (priceId ? (PRICE_TO[priceId]?.key || priceId) : null);
        if (!key) continue;
        const label =
          data.productLabel ||
          (priceId && PRICE_TO[priceId]?.label) ||
          key;

        const prev = byProduct.get(key);
        if (!prev || created > prev.created) {
          byProduct.set(key, { created, label });
        }
      }
    }

    // 4) construim lista finală
    const items = [...baseItems];
    for (const [productKey, { created, label }] of byProduct.entries()) {
      const end = plusOneYear(created);
      const now = new Date();
      items.push({
        id: productKey,
        name: label,
        tier: "premium",
        status: end && now < end ? "active" : "expired",
        startDate: created.toISOString(),
        currentPeriodEnd: end ? end.toISOString() : null,
      });
    }

    // sortare: Free primul, apoi alfabetic
    items.sort((a, b) => {
      if (a.tier !== b.tier) return a.tier === "free" ? -1 : 1;
      return (a.name || "").localeCompare(b.name || "");
    });

    return new Response(JSON.stringify({ items }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[membership/summary] error:", err);
    // nu blocăm UI-ul; întoarcem măcar Free
    return new Response(JSON.stringify({ items: baseItems, warning: "partial" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
