// src/app/api/stripe/webhook/route.js
import Stripe from "stripe";
import { admin, adminDb } from "../../../../lib/firebaseAdmin.js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
});

/* =============== Helpers =============== */

function addMonths(startDate, months) {
  const d = new Date(startDate);
  const day = d.getDate();
  d.setMonth(d.getMonth() + months);
  // corecție overflow (ex: 31 → luna următoare)
  if (d.getDate() !== day) d.setDate(0);
  return d;
}

function tsOrIsoToDate(v) {
  if (!v) return null;
  // Firestore Timestamp
  if (typeof v?.toDate === "function") return v.toDate();
  // ISO string
  const d = new Date(v);
  return isNaN(+d) ? null : d;
}

async function upsertEntitlementByCourse({
  uid,
  courseKey,
  durationMonths,
  sessionId,
  teacher = false,
  displayName = null,
  priceId = null,
  lookupKey = null,
}) {
  if (!uid || !courseKey || !durationMonths) return;

  const ref = adminDb
    .collection("users")
    .doc(uid)
    .collection("entitlements")
    .doc(courseKey);

  const snap = await ref.get();

  const now = new Date();
  const existing = snap.exists
    ? tsOrIsoToDate(snap.data()?.expiresAt || snap.data()?.activeUntil)
    : null;
  const base = existing && existing > now ? existing : now; // extindere de la data mai mare
  const newExpiry = addMonths(base, durationMonths);

  const update = {
    courseKey,
    teacher: !!teacher,
    source: "stripe",
    sessionId: sessionId || null,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    // noul câmp canonic
    expiresAt: admin.firestore.Timestamp.fromDate(newExpiry),
    // compat cu vechiul cod (dacă citea ISO)
    activeUntil: newExpiry.toISOString(),
    status: "active",
  };

  // meta utile pentru UI / fallback-uri
  if (displayName) update.displayName = displayName;
  if (priceId) update.priceId = priceId;
  if (lookupKey) update.lookupKey = lookupKey;

  await ref.set(update, { merge: true });
}

/* =============== Handler =============== */

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !secret) {
    return new Response("Missing webhook signature/secret", { status: 400 });
  }

  // Stripe necesită raw body pentru verificare
  const raw = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, secret);
  } catch (err) {
    console.error("[webhook] Bad signature:", err?.message);
    return new Response("Invalid signature", { status: 400 });
  }

  // Idempotency: dacă am mai procesat acest event, ieșim
  const evRef = adminDb.collection("stripe_events").doc(event.id);
  const evSnap = await evRef.get();
  if (evSnap.exists) {
    return new Response(JSON.stringify({ received: true, dedup: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Luăm versiunea completă cu line_items + product expandat
      const full = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ["line_items.data.price.product"],
      });

      // Determinăm uid (prefer client_reference_id din sesiune)
      const uid = full.client_reference_id || full.metadata?.uid || null;

      const email = full.customer_details?.email || full.customer_email || null;
      const customerId = full.customer || null;

      // Persistăm maparea customer → uid/email (util la reconciliere)
      if (customerId) {
        await adminDb
          .collection("stripe_customers")
          .doc(customerId)
          .set(
            {
              uid: uid || null,
              email: email || null,
              lastCheckoutSessionId: full.id,
              updatedAt: new Date().toISOString(),
            },
            { merge: true }
          );
      }

      // Extragem info din primul line_item (modelul tău este one-off, 1 item)
      const li = full.line_items?.data?.[0] || null;
      const price = li?.price || null;
      const productObj =
        price?.product && typeof price.product === "object" ? price.product : null;

      const displayName =
        productObj?.name || price?.nickname || null; // numele pe care îl vrem în Membership
      const priceId = price?.id || null;
      const lookupKey =
        price?.lookup_key || full.metadata?.lookup_key || null;

      // 1) Durata (în luni): preferăm metadata din sesiune/price
      let durationMonths =
        parseInt(full.metadata?.duration_months || "0", 10) || 0;
      if (!durationMonths) {
        const priceMd = price?.metadata || {};
        durationMonths =
          parseInt(priceMd.duration_months || "0", 10) || 0;
      }

      // 2) Course keys:
      //    a) metadata din sesiune (csv)
      //    b) din product.metadata (course_keys / course_keys_array)
      let courseKeys = [];
      if (full.metadata?.course_keys_csv) {
        courseKeys = String(full.metadata.course_keys_csv)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }
      if (!courseKeys.length) {
        const pmeta = productObj?.metadata || {};
        if (pmeta.course_keys) {
          courseKeys = String(pmeta.course_keys)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        } else if (pmeta.course_keys_array) {
          try {
            const arr = JSON.parse(pmeta.course_keys_array);
            courseKeys = Array.isArray(arr)
              ? arr.map((s) => String(s).trim()).filter(Boolean)
              : [];
          } catch {}
        }
      }
      courseKeys = Array.from(new Set(courseKeys)); // unic

      // 3) teacher/bundle (doar pentru metadata entitlements)
      const teacher =
        String(full.metadata?.teacher || "").toLowerCase() === "true";
      // const bundle =
      //   String(full.metadata?.bundle || "").toLowerCase() === "true";

      if (!uid || !courseKeys.length || !durationMonths) {
        console.warn("[webhook] Missing essentials", {
          uid,
          courseKeys,
          durationMonths,
        });
      } else {
        // Acordăm/Extindem entitlement pentru fiecare courseKey
        await Promise.all(
          courseKeys.map((key) =>
            upsertEntitlementByCourse({
              uid,
              courseKey: key,
              durationMonths,
              sessionId: full.id,
              teacher,
              displayName, // <-- salvat pentru UI
              priceId,
              lookupKey,
            })
          )
        );
      }

      // Stocăm un rezumat al sesiunii (utile la audit / fallback)
      await adminDb
        .collection("stripe_sessions")
        .doc(full.id)
        .set(
          {
            uid: uid || null,
            entitlements: courseKeys,
            amount_total: full.amount_total,
            currency: full.currency,
            payment_status: full.payment_status,
            created: new Date(full.created * 1000).toISOString(),
            updatedAt: new Date().toISOString(),
            mode: full.mode,
            lookup_key: lookupKey || null,
            duration_months: durationMonths,
            product_name: displayName || null,
            price_id: priceId || null,
          },
          { merge: true }
        );
    }

    // Marcăm event-ul ca procesat (idempotency)
    await evRef.set({
      type: event.type,
      receivedAt: new Date().toISOString(),
    });

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[webhook] handler error:", err);
    return new Response("Webhook handler failed", { status: 500 });
  }
}
