// src/app/api/mfa/settings/route.js
import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

const ONE_YEAR = 60 * 60 * 24 * 365;
const isProd = process.env.NODE_ENV === "production" || !!process.env.VERCEL;

export async function POST(req) {
  try {
    const { enabled } = await req.json();
    if (typeof enabled !== "boolean") {
      return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
    }

    const authz = req.headers.get("authorization") || "";
    const idToken = authz.startsWith("Bearer ") ? authz.slice(7) : null;
    if (!idToken) return NextResponse.json({ ok: false, error: "no_token" }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(idToken);
    const uid = decoded.uid;

    // Scrie în ambele structuri (nou + legacy), ca să fim compatibili cu orice cod vechi
    await adminDb.collection("users").doc(uid).set(
      {
        mfa: { email: { enabled } },
        security: { mfaEmailEnabled: enabled }, // legacy
      },
      { merge: true }
    );

    const res = NextResponse.json({ ok: true, enabled });

    res.cookies.set({
      name: "mfa_required",
      value: enabled ? "1" : "0",
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: isProd,
      maxAge: ONE_YEAR,
    });

    if (!enabled) {
      // când oprești 2FA: uită verificarea sesiunii curente
      res.cookies.set({
        name: "mfa",
        value: "",
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: isProd,
        maxAge: 0,
      });
    }

    return res;
  } catch (e) {
    console.error("[mfa/settings]", e?.message || e);
    return NextResponse.json({ ok: false, error: "internal" }, { status: 500 });
  }
}
