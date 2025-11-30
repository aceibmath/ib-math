// src/firebase/config.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Folosește STRICT valoarea din .env (fără fallback pe domene custom)
const AUTH_DOMAIN = (process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "").trim();
if (!AUTH_DOMAIN) {
  throw new Error(
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN is required (ex: ib-math-platform.firebaseapp.com)"
  );
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "ib-math-platform",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Evită dublă inițializare (dev/hot-reload în Next.js)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export { app, auth, googleProvider };
