// src/app/api/membership/summary/route.js
import Stripe from "stripe";
import { headers as nextHeaders, cookies as nextCookies } from "next/headers";
import { adminDb } from "../../../../lib/firebaseAdmin.js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
});

/* ------------------------- helpers ------------------------- */

function addMonths(from, months) {
  const d = new Date(from);
  const day = d.getDate();
  d.setMonth(d.getMonth() + months);
  if (d.getDate() !== day) d.setDate(0); // handle 29/30/31 overflow
  return d;
}

function parseMonthsFromLookup(lookupKey) {
  if (!lookupKey) return 0;
  const m = String(lookupKey).match(/_(\d+)m$/i);
  return m ? parseInt(m[1], 10) || 0 : 0;
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
    const decoded = await (await import("../../../../lib/firebaseAdmin.js")).admin
      .auth()
      .verifyIdToken(token);
    return decoded?.uid || null;
  } catch {
    return null;
  }
}

/* -------------------------- route -------------------------- */

export async function GET() {
  const uid = await getUid();
  if (!uid) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // 1) Găsește customer-ul Stripe pentru utilizator
    const mapSnap = await adminDb
      .collection("stripe_customers")
      .where("uid", "==", uid)
      .limit(1)
      .get();

    if (mapSnap.empty) {
      // fără plăți Stripe => doar Free
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

    const customerId = mapSnap.docs[0].id;

    // 2) Ia sesiunile de checkout plătite (include line_items + product)
    const sessions = await stripe.checkout.sessions.list({
      customer: customerId,
      payment_status: "paid",
      limit: 100,
      expand: ["data.line_items.data.price.product"],
    });

    const items = [];

    for (const s of sessions.data) {
      const purchasedAt = new Date(s.created * 1000);
      const sessionLookup = s.metadata?.lookup_key || null;

      const lines = s.line_items?.data || [];
      for (const li of lines) {
        const price = li.price;
        const product =
          price?.product && typeof price.product === "object"
            ? price.product
            : null;

        // Numele produsului (prima coloană)
        const name = product?.name || price?.nickname || "Premium Access";

        // Durata în luni: prefer price.metadata.duration_months, apoi price.lookup_key, apoi session.metadata.lookup_key
        let months =
          parseInt(price?.metadata?.duration_months || "0", 10) || 0;
        if (!months) {
          months =
            parseMonthsFromLookup(price?.lookup_key) ||
            parseMonthsFromLookup(sessionLookup);
        }

        // Expirare = data cumpărării + luni (fără stacking/extend)
        const expiresAt = months > 0 ? addMonths(purchasedAt, months) : null;

        items.push({
          id: `${s.id}:${price?.id || "price"}`,
          name,
          tier: "premium",
          status: expiresAt && Date.now() < +expiresAt ? "active" : "expired",
          currentPeriodEnd: expiresAt ? expiresAt.toISOString() : null,
        });
      }
    }

    // 3) Sortează Active (desc) apoi Expired (desc)
    const actives = items
      .filter((x) => x.status === "active")
      .sort(
        (a, b) =>
          Date.parse(b.currentPeriodEnd || 0) -
          Date.parse(a.currentPeriodEnd || 0)
      );
    const expireds = items
      .filter((x) => x.status === "expired")
      .sort(
        (a, b) =>
          Date.parse(b.currentPeriodEnd || 0) -
          Date.parse(a.currentPeriodEnd || 0)
      );

    const list = [...actives, ...expireds];

    // 4) Adaugă Free Membership (mereu activ, N/A la expirare)
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
    console.error("[api/membership/summary] error:", err);
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
