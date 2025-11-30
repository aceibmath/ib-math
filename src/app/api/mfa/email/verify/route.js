// src/app/api/mfa/email/verify/route.js
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { adminAuth, adminDb, FieldValue } from "@/lib/firebaseAdmin";
import { verifyOTP } from "@/lib/otp";

const MAX_ATTEMPTS = Number(process.env.MFA_MAX_ATTEMPTS || 5);

export async function POST(req) {
  try {
    // 1) Firebase ID token
    const authHeader = req.headers.get("authorization") || "";
    const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!idToken) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(idToken);
    const uid = decoded.uid;
    if (!uid) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    // 2) Body: { code }
    const body = await req.json().catch(() => ({}));
    const code = String(body?.code || "").trim();
    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json({ error: "invalid_code_format" }, { status: 400 });
    }

    // 3) OTP din Firestore
    const docRef = adminDb.collection("mfa_codes").doc(uid);
    const snap = await docRef.get();
    if (!snap.exists) {
      return NextResponse.json({ error: "code_not_found" }, { status: 400 });
    }

    const data = snap.data();
    const now = Date.now();

    // 4) Expirare
    if (!data.expiresAt || now > Number(data.expiresAt)) {
      await docRef.delete(); // curățăm OTP expirat
      return NextResponse.json({ error: "expired" }, { status: 400 });
    }

    // 5) Prea multe încercări
    const attempts = Number(data.attemptCount || 0);
    if (attempts >= MAX_ATTEMPTS) {
      await docRef.delete(); // invalidăm OTP, cere altul
      return NextResponse.json({ error: "too_many_attempts" }, { status: 429 });
    }

    // 6) Verificare cod
    const ok = verifyOTP(code, data.salt, data.hash);
    if (!ok) {
      // increment atomic
      await docRef.set(
        { attemptCount: FieldValue.increment(1), updatedAt: FieldValue.serverTimestamp() },
        { merge: true }
      );
      const attemptsLeft = Math.max(0, MAX_ATTEMPTS - (attempts + 1));
      return NextResponse.json({ error: "invalid_code", attemptsLeft }, { status: 401 });
    }

    // 7) Succes → ștergem OTP (one-time) și setăm cookie MFA (DOAR pe sesiunea curentă)
    await docRef.delete();

    const res = NextResponse.json({ ok: true });

    const isProd = process.env.NODE_ENV === "production" || !!process.env.VERCEL;
    // Cookie de SESSIUNE: fără maxAge / fără expires ⇒ cere codul la fiecare login
    res.cookies.set({
      name: "mfa",
      value: "1", // valoarea nu contează; middleware verifică doar existența
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: isProd, // pe localhost rămâne false
    });

    return res;
  } catch (err) {
    console.error("[MFA][VERIFY] error:", err);
    return NextResponse.json({ error: "verify_failed" }, { status: 500 });
  }
}
