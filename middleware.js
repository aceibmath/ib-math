// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname, search } = req.nextUrl;

  const mfa = req.cookies.get("mfa")?.value;
  const mfaRequired = req.cookies.get("mfa_required")?.value === "1";

  // Skip assets/Next internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // Allowlist strict
  const allowed =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password" ||
    pathname === "/verify" ||
    pathname.startsWith("/api/mfa/") ||
    pathname.startsWith("/api/session/");

  // Dacă ești pe /verify dar ai deja mfa => du-te la next sau la /
  if (pathname === "/verify" && mfa) {
    const url = req.nextUrl.clone();
    const params = new URLSearchParams(search);
    const next = params.get("next") || "/";
    url.pathname = next;
    url.search = "";
    return NextResponse.redirect(url);
  }

  // Când 2FA e ON și sesiunea NU e verificată -> trimite la /verify de oriunde
  if (mfaRequired && !mfa && !allowed) {
    const url = req.nextUrl.clone();
    url.pathname = "/verify";
    url.search = `?next=${encodeURIComponent(pathname + search)}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = { matcher: ["/:path*"] };
