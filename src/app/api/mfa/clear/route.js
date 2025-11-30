import { NextResponse } from "next/server";
const isProd = process.env.NODE_ENV === "production" || !!process.env.VERCEL;

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: "mfa",
    value: "",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    secure: isProd,
  });
  return res;
}
