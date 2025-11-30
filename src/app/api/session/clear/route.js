// src/app/api/session/clear/route.js
import { NextResponse } from "next/server";

const isProd = process.env.NODE_ENV === "production" || !!process.env.VERCEL;

export async function POST() {
  const res = NextResponse.json({ ok: true });

  // Șterge verificarea sesiunii curente
  res.cookies.set({
    name: "mfa",
    value: "",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: isProd,
    maxAge: 0,
  });

  // Șterge și politica (ca să nu te trimită middleware-ul spre /verify după logout)
  res.cookies.set({
    name: "mfa_required",
    value: "",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: isProd,
    maxAge: 0,
  });

  return res;
}
