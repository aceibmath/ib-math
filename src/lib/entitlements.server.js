// src/lib/entitlements.server.js
import { cookies } from "next/headers";
import { admin, adminDb } from "../lib/firebaseAdmin.js";

// acceptă ISO string / number / Date / Firestore Timestamp
function toMillis(v) {
  if (!v) return null;
  try {
    if (v instanceof Date) return v.getTime();
    if (typeof v === "string" || typeof v === "number") {
      const d = new Date(v);
      return Number.isNaN(d.getTime()) ? null : d.getTime();
    }
    if (typeof v === "object") {
      if (typeof v.toDate === "function") return v.toDate().getTime(); // Firestore Timestamp
      if (typeof v._seconds === "number") return v._seconds * 1000;    // compat
    }
  } catch {}
  return null;
}

export async function getUidFromCookies() {
  const c = await cookies();
  const token =
    c.get("firebase_id_token")?.value ||
    c.get("__session")?.value ||
    null;
  if (!token) return null;
  try {
    const d = await admin.auth().verifyIdToken(token);
    return d?.uid || null;
  } catch {
    return null;
  }
}

/**
 * Returnează un Map cu entitlements (chei multiple per doc pentru compat):
 *  - chei posibile: courseKey (nou), productKey (legacy), priceId (legacy), doc.id (fallback)
 *  - valoare: { id, ...data, active: boolean, endsAt: millis }
 */
export async function getActiveEntitlements(uid) {
  if (!uid) return new Map();

  const snap = await adminDb
    .collection("users")
    .doc(uid)
    .collection("entitlements")
    .get();

  const map = new Map();
  const now = Date.now();

  for (const doc of snap.docs) {
    const data = doc.data() || {};

    // Preferință nouă: expiresAt; compat: activeUntil / endsAt
    const endsAt =
      toMillis(data.expiresAt) ??
      toMillis(data.activeUntil) ??
      toMillis(data.endsAt);

    const active = endsAt ? now < endsAt : false;

    // Construim setul de chei pe care să îl mapăm la același entitlement
    const keys = new Set();

    // Noul model: courseKey (ex: "AA_SL", "AI_HL", "SUITE", ...).
    if (typeof data.courseKey === "string" && data.courseKey.trim()) {
      keys.add(data.courseKey.trim());
    }

    // Legacy: productKey sau priceId
    if (typeof data.productKey === "string" && data.productKey.trim()) {
      keys.add(data.productKey.trim());
    }
    if (typeof data.priceId === "string" && data.priceId.trim()) {
      keys.add(data.priceId.trim());
    }

    // Fallback: id-ul documentului (poate fi courseKey în unele cazuri vechi)
    if (typeof doc.id === "string" && doc.id.trim()) {
      keys.add(doc.id.trim());
    }

    const value = { id: doc.id, ...data, active, endsAt };
    for (const k of keys) {
      map.set(k, value);
    }
  }

  return map;
}

/**
 * Verifică accesul pentru o cheie (acceptă courseKey / productKey / priceId).
 */
export async function hasAccess(uid, key) {
  if (!uid || !key) return false;
  const ents = await getActiveEntitlements(uid);
  const e = ents.get(String(key));
  return !!(e && e.active);
}

/**
 * Syntactic sugar pentru noul model – verifică acces pe courseKey.
 */
export async function hasCourseAccess(uid, courseKey) {
  return hasAccess(uid, courseKey);
}

/**
 * Returnează lista courseKey active (noul model).
 */
export async function listActiveCourseKeys(uid) {
  const ents = await getActiveEntitlements(uid);
  const keys = [];
  for (const [k, v] of ents.entries()) {
    // filtru: doar chei care arată ca courseKey (evităm price_…)
    if (v.active && !String(k).startsWith("price_")) {
      keys.push(k);
    }
  }
  // dedupe
  return Array.from(new Set(keys));
}
