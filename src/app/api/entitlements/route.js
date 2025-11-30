// src/app/api/entitlements/route.js
import { headers as nextHeaders, cookies as nextCookies } from "next/headers";
import { admin, adminDb } from "../../../lib/firebaseAdmin.js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ----------------------- helpers ----------------------- */
function parseISO(v) {
  if (!v) return null;
  try {
    if (typeof v === "string" || typeof v === "number") {
      const d = new Date(v);
      return isNaN(+d) ? null : d;
    }
    if (v instanceof Date) return isNaN(+v) ? null : v;
    if (typeof v === "object") {
      if (typeof v.toDate === "function") return v.toDate(); // Firestore Timestamp
      if (typeof v._seconds === "number") return new Date(v._seconds * 1000);
    }
  } catch {}
  return null;
}

function addMonths(date, months) {
  const d = new Date(date);
  const day = d.getDate();
  d.setMonth(d.getMonth() + months);
  if (d.getDate() !== day) d.setDate(0); // handle 30/31 overflow
  return d;
}

function toISO(d) {
  const dd = parseISO(d);
  return dd ? dd.toISOString() : null;
}

function isActive(iso) {
  if (!iso) return false;
  const t = Date.parse(iso);
  return Number.isFinite(t) && Date.now() < t;
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
    const d = await admin.auth().verifyIdToken(token);
    return d?.uid || null;
  } catch {
    return null;
  }
}

// Titluri umane pentru cursuri
const COURSE_TITLES = {
  AA_SL: "SL Analysis & Approaches",
  AA_HL: "HL Analysis & Approaches",
  AI_SL: "SL Applications & Interpretations",
  AI_HL: "HL Applications & Interpretations",
};

function titleFor(courseKey, isTeacher) {
  const base = COURSE_TITLES[courseKey] || courseKey || "Premium Access";
  return isTeacher ? `${base} Teacher PRO` : base;
}

function monthsFromLookup(lookupKey) {
  if (!lookupKey) return 0;
  const m = String(lookupKey).match(/_(\d+)m$/i);
  return m ? parseInt(m[1], 10) || 0 : 0;
}

function isTeacherFromLookup(lookupKey) {
  return String(lookupKey || "").toLowerCase().startsWith("teacher_");
}

/* ---------------- speed-up: server query helper ---------------- */
async function loadPaidSessionsFast(uid) {
  // Construim un query îngust: doar câmpurile necesare, ordonat desc după `created`, limit 200.
  // Dacă lipsește indexul compozit, cădem elegant pe fallback fără orderBy/select.
  const base = adminDb.collection("stripe_sessions").where("uid", "==", uid);

  try {
    const q = base
      .select(
        "uid",
        "created",
        "duration_months",
        "lookup_key",
        "entitlements",
        "payment_status"
      )
      .orderBy("created", "desc")
      .limit(200);

    const snap = await q.get();
    return snap.docs;
  } catch (e) {
    // ex. "FAILED_PRECONDITION: The query requires an index"
    console.warn("[entitlements] fast query fell back:", e?.code || e?.message);

    // fallback: citim până la 200 sesiuni ale userului și sortăm local
    const snap = await base.limit(200).get();
    const docs = [...snap.docs].sort((a, b) => {
      const ca = parseISO(a.data()?.created)?.getTime() || 0;
      const cb = parseISO(b.data()?.created)?.getTime() || 0;
      return cb - ca;
    });
    return docs;
  }
}

/* ------------------------- GET ------------------------- */
export async function GET() {
  try {
    const uid = await getUid();
    if (!uid) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 1) Sesiuni Stripe pentru user, ordonate desc și câmpuri strict necesare
    const sessDocs = await loadPaidSessionsFast(uid);

    // 2) Construim rânduri DOAR pentru sesiunile plătite
    const items = [];
    for (const d of sessDocs) {
      const s = d.data() || {};
      const pay = String(s.payment_status || "").toLowerCase();
      if (pay !== "paid") continue; // filtrare directă

      const createdAt = parseISO(s.created);
      if (!createdAt) continue;

      const months =
        parseInt(s.duration_months || "0", 10) || monthsFromLookup(s.lookup_key);
      if (!months) continue;

      const isTeacher = isTeacherFromLookup(s.lookup_key);
      const keys = Array.isArray(s.entitlements) ? s.entitlements : [];
      for (const courseKey of keys) {
        const endIso = addMonths(createdAt, months).toISOString();
        items.push({
          id: `${d.id}:${courseKey}`, // unic per achiziție+curs
          name: titleFor(courseKey, isTeacher),
          tier: "premium",
          status: isActive(endIso) ? "active" : "expired",
          currentPeriodEnd: endIso,
          createdAt: createdAt.toISOString(),
        });
      }
    }

    // 3) Fallback: entitlements legacy dacă nu avem sesiuni
    if (items.length === 0) {
      const entSnap = await adminDb
        .collection("users")
        .doc(uid)
        .collection("entitlements")
        .get();

      for (const doc of entSnap.docs) {
        const it = doc.data() || {};
        const endIso =
          toISO(it.activeUntil) || toISO(it.expiresAt) || toISO(it.endsAt) || null;
        items.push({
          id: `legacy:${doc.id}`,
          name: titleFor(it.productKey || doc.id, !!it.teacher),
          tier: "premium",
          status: isActive(endIso) ? "active" : "expired",
          currentPeriodEnd: endIso,
          createdAt: null,
        });
      }
    }

    // 4) Sortare finală desc după data achiziției (siguranță)
    items.sort((a, b) => {
      const ta = Date.parse(a.createdAt || 0) || 0;
      const tb = Date.parse(b.createdAt || 0) || 0;
      return tb - ta;
    });

    // 5) Adăugăm Free Membership la final
    items.push({
      id: "free",
      name: "Free Membership",
      tier: "free",
      status: "active",
      currentPeriodEnd: null,
    });

    return new Response(JSON.stringify({ items }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[api/entitlements] error:", err);
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
