// src/lib/firebaseAdmin.js
// Server-only: do NOT import this from client components.
import admin from "firebase-admin";

function normalizePrivateKey(raw) {
  if (!raw) return "";
  // 1) înlocuiește \n escapate cu newline real
  let key = raw.replace(/\\n/g, "\n");
  // 2) taie ghilimelele rămase de la .env (dacă există)
  key = key.replace(/^"+|"+$/g, "").replace(/^'+|'+$/g, "");
  // 3) elimină spatiile CR/LF inutile la capete
  key = key.trim();
  return key;
}

const projectId =
  process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.GOOGLE_CLOUD_PROJECT;
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const privateKey = normalizePrivateKey(process.env.FIREBASE_ADMIN_PRIVATE_KEY || "");

if (!admin.apps.length) {
  if (!projectId || !clientEmail || !privateKey) {
    // Nu aruncăm eroare ca să vedem ce lipsește, dar logăm clar.
    console.error(
      "[firebaseAdmin] Missing Admin env vars.",
      { hasProjectId: !!projectId, hasClientEmail: !!clientEmail, hasPrivateKey: !!privateKey }
    );
  }
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  } catch (e) {
    // Ajută mult la debug când formatul e greșit
    console.error("[firebaseAdmin] initializeApp failed:", e?.message);
    throw e;
  }
}

const adminDb = admin.firestore();
const adminAuth = admin.auth();
const FieldValue = admin.firestore.FieldValue;

// O singură setare globală
if (!globalThis.__FIRESTORE_SETTINGS_DONE__) {
  try {
    adminDb.settings?.({ ignoreUndefinedProperties: true });
  } catch {}
  globalThis.__FIRESTORE_SETTINGS_DONE__ = true;
}

export { admin, adminDb, adminAuth, FieldValue };
