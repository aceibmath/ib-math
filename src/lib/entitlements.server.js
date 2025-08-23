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
      if (typeof v.toDate === "function") return v.toDate().getTime();
      if (typeof v._seconds === "number") return v._seconds * 1000;
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
 * Returnează un Map cu entitlements active (chei: productKey sau priceId, valori: obiect entitlement)
 */
export async function getActiveEntitlements(uid) {
  if (!uid) return new Map();
  const snap = await adminDb.collection("users").doc(uid).collection("entitlements").get();

  const map = new Map();
  const now = Date.now();

  for (const doc of snap.docs) {
    const data = doc.data() || {};
    const endsAt =
      toMillis(data.activeUntil) ??
      toMillis(data.expiresAt) ??
      toMillis(data.endsAt);

    const active = endsAt ? now < endsAt : false;

    // Acceptăm atât productKey, cât și priceId/doc.id (dacă e "price_...")
    const keys = new Set();
    if (data.productKey) keys.add(data.productKey);
    if (data.priceId) keys.add(data.priceId);
    if (typeof doc.id === "string" && doc.id.startsWith("price_")) keys.add(doc.id);

    for (const k of keys) {
      map.set(k, { id: doc.id, ...data, active, endsAt });
    }
  }
  return map;
}

/**
 * hasAccess(uid, key)
 *  - key poate fi productKey ("AA_HL") sau un priceId ("price_...")
 */
export async function hasAccess(uid, key) {
  if (!uid || !key) return false;
  const ents = await getActiveEntitlements(uid);
  const e = ents.get(key);
  return !!(e && e.active);
}
