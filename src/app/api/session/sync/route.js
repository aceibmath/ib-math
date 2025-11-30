// src/app/api/session/sync/route.js
import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ONE_YEAR = 60 * 60 * 24 * 365;
const isProd = process.env.NODE_ENV === "production" || !!process.env.VERCEL;

export async function POST(req) {
  try {
    const authz = req.headers.get("authorization") || "";
    const idToken = authz.startsWith("Bearer ") ? authz.slice(7) : null;
    if (!idToken) {
      return NextResponse.json({ ok: false, error: "no_token" }, { status: 401 });
    }

    const decoded = await adminAuth.verifyIdToken(idToken);
    const uid = decoded.uid;

    // Citește user doc
    const snap = await adminDb.collection("users").doc(uid).get();

    // 1) Noul câmp
    let enabled = snap.exists ? snap.get("mfa.email.enabled") : undefined;

    // 2) Fallback pe vechiul câmp (legacy)
    if (enabled === undefined) {
      enabled = snap.exists ? snap.get("security.mfaEmailEnabled") : undefined;
    }

    // 3) Fallback pe valoarea cookie-ului curent (să nu-l dăm la 0 din greșeală)
    if (enabled === undefined) {
      const cookieHeader = req.headers.get("cookie") || "";
      const hasRequired = /(?:^|;\s*)mfa_required=1(?:;|$)/.test(cookieHeader);
      enabled = hasRequired ? true : false;
    }

    const res = NextResponse.json({ ok: true, mfaRequired: !!enabled });

    // Politica (contul cere 2FA sau nu)
    res.cookies.set({
      name: "mfa_required",
      value: enabled ? "1" : "0",
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: isProd,
      maxAge: ONE_YEAR,
    });

    // ȘTERGE verificarea sesiunii anterioare – ceri codul la fiecare login
    res.cookies.set({
      name: "mfa",
      value: "",
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: isProd,
      maxAge: 0,
    });

    return res;
  } catch (e) {
    console.error("[session/sync]", e?.message || e);
    return NextResponse.json({ ok: false, error: "internal" }, { status: 500 });
  }
}
