export const runtime = "nodejs";

import { NextResponse } from "next/server";
import crypto from "crypto";

// from: src/app/api/mfa/email/verify/route.js  →  src/lib/...
import { adminAuth, adminDb } from "../../../../../lib/firebaseAdmin";
import { verifyOTP } from "../../../../../lib/otp";


function signCookie(uid, days = 30) {
  const secret = process.env.MFA_COOKIE_SECRET || "dev_secret_change_me";
  const exp = Math.floor(Date.now() / 1000) + days * 24 * 60 * 60;
  const payload = `${uid}.${exp}`;
  const sig = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  // format: v1.<uid>.<exp>.<sig>
  return `v1.${uid}.${exp}.${sig}`;
}

export async function POST(req) {
  try {
    // 1) token Firebase
    const authHeader = req.headers.get("authorization") || "";
    const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!idToken) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(idToken);
    const uid = decoded.uid;

    // 2) body: { code }
    const body = await req.json().catch(() => ({}));
    const code = String(body.code || "").trim();
    if (!code) return NextResponse.json({ error: "missing_code" }, { status: 400 });

    // 3) citim OTP din Firestore
    const docRef = adminDb.collection("mfa_codes").doc(uid);
    const snap = await docRef.get();
    if (!snap.exists) return NextResponse.json({ error: "code_not_found" }, { status: 400 });

    const data = snap.data();
    const now = Date.now();

    if (now > Number(data.expiresAt || 0)) {
      await docRef.delete();
      return NextResponse.json({ error: "expired" }, { status: 400 });
    }

    if ((data.attemptCount || 0) >= 5) {
      return NextResponse.json({ error: "locked" }, { status: 429 });
    }

    const ok = verifyOTP(code, data.salt, data.hash);
    if (!ok) {
      await docRef.update({ attemptCount: (data.attemptCount || 0) + 1 });
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }

    // 4) succes -> ștergem OTP și setăm cookie MFA
    await docRef.delete();

    const token = signCookie(uid, 30);
    const res = NextResponse.json({ ok: true });

    const isProd = process.env.NODE_ENV === "production";
    res.cookies.set("mfa", token, {
      httpOnly: true,
      secure: isProd,          // 🔧 local (http://localhost) => false; PROD (https) => true
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 zile
    });

    return res;
  } catch (err) {
    console.error("/api/mfa/email/verify error", err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
