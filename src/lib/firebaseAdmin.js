// src/lib/firebaseAdmin.js
import "server-only";
import admin from "firebase-admin";
import fs from "fs";

const isEdge =
  process.env.NEXT_RUNTIME === "edge" ||
  process.env.NEXT_RUNTIME === "experimental-edge";

function normalizePrivateKey(raw) {
  if (!raw) return "";
  // taie ghilimele rămase și normalizează newline-urile
  return raw
    .trim()
    .replace(/^"+|"+$/g, "")
    .replace(/^'+|'+$/g, "")
    .replace(/\\n/g, "\n");
}

// 1) Prioritar: ENV-urile tale actuale (compatibilitate înapoi)
const legacyProjectId =
  process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.GOOGLE_CLOUD_PROJECT;
const legacyClientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const legacyPrivateKey = normalizePrivateKey(
  process.env.FIREBASE_ADMIN_PRIVATE_KEY || ""
);

// Loader universal pentru service account din diverse surse
function loadServiceAccount() {
  // a) Dacă avem setul tău deja folosit în proiect → îl folosim
  if (legacyProjectId && legacyClientEmail && legacyPrivateKey) {
    return {
      projectId: legacyProjectId,
      clientEmail: legacyClientEmail,
      privateKey: legacyPrivateKey,
      origin: "legacy",
    };
  }

  // b) JSON brut în env (Vercel Secret text)
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    try {
      const obj = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
      return {
        projectId: obj.project_id || obj.projectId,
        clientEmail: obj.client_email || obj.clientEmail,
        privateKey: normalizePrivateKey(obj.private_key || obj.privateKey),
        origin: "json",
      };
    } catch (e) {
      console.error(
        "[firebaseAdmin] FIREBASE_SERVICE_ACCOUNT_JSON parse error:",
        e?.message
      );
    }
  }

  // c) JSON Base64 (Vercel/Pages)
  if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
    try {
      const decoded = Buffer.from(
        process.env.FIREBASE_SERVICE_ACCOUNT_BASE64,
        "base64"
      ).toString("utf8");
      const obj = JSON.parse(decoded);
      return {
        projectId: obj.project_id || obj.projectId,
        clientEmail: obj.client_email || obj.clientEmail,
        privateKey: normalizePrivateKey(obj.private_key || obj.privateKey),
        origin: "base64",
      };
    } catch (e) {
      console.error(
        "[firebaseAdmin] FIREBASE_SERVICE_ACCOUNT_BASE64 decode/parse error:",
        e?.message
      );
    }
  }

  // d) Cale locală spre fișier (Windows dev) — NU folosi în edge/Workers
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    if (isEdge) {
      console.error(
        "[firebaseAdmin] Skipping file credentials in edge/Workers runtime."
      );
    } else {
      try {
        const raw = fs.readFileSync(
          process.env.GOOGLE_APPLICATION_CREDENTIALS,
          "utf8"
        );
        const obj = JSON.parse(raw);
        return {
          projectId: obj.project_id || obj.projectId,
          clientEmail: obj.client_email || obj.clientEmail,
          privateKey: normalizePrivateKey(obj.private_key || obj.privateKey),
          origin: "file",
        };
      } catch (e) {
        console.error(
          "[firebaseAdmin] Failed to read GOOGLE_APPLICATION_CREDENTIALS file:",
          e?.message
        );
      }
    }
  }

  // e) Trio generic separat
  if (
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  ) {
    return {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY),
      origin: "split",
    };
  }

  return null;
}

let initialized = false;
if (!admin.apps.length) {
  const svc = loadServiceAccount();

  if (!svc || !svc.projectId || !svc.clientEmail || !svc.privateKey) {
    console.error("[firebaseAdmin] Missing Admin credentials.", {
      hasProjectId: !!(svc && svc.projectId),
      hasClientEmail: !!(svc && svc.clientEmail),
      hasPrivateKey: !!(svc && svc.privateKey),
    });
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: svc?.projectId,
        clientEmail: svc?.clientEmail,
        privateKey: svc?.privateKey,
      }),
    });
    initialized = true;
  } catch (e) {
    console.error("[firebaseAdmin] initializeApp failed:", e?.message);
    throw e;
  }
}

// Exports compatibile cu proiectul tău
const adminDb = admin.firestore();
const adminAuth = admin.auth();
const FieldValue = admin.firestore.FieldValue;

// Setare globală unică (ca în codul tău)
if (!globalThis.__FIRESTORE_SETTINGS_DONE__) {
  try {
    adminDb.settings?.({ ignoreUndefinedProperties: true });
  } catch {}
  globalThis.__FIRESTORE_SETTINGS_DONE__ = true;
}

export { admin, adminDb, adminAuth, FieldValue };
