// src/app/api/gis/callback/route.js 

// Handles the Google Identity Services (GIS) form POST.
// Validates g_csrf_token, then stores the Google ID token ("credential")
// into a short-lived non-HttpOnly cookie "g_cred" that /login will read.
// Finally, issues a 303 redirect to /login?processing=1 (no UI flicker).

export async function POST(req) {
  try {
    const form = await req.formData();
    const credential = form.get("credential");
    const csrfBody = form.get("g_csrf_token") || "";

    // Minimal CSRF: token must be present both in form and cookie
    const cookies = req.headers.get("cookie") || "";
    const m = cookies.match(/(?:^|;\s*)g_csrf_token=([^;]+)/);
    const csrfCookie = m ? decodeURIComponent(m[1]) : "";

    if (!credential || !csrfBody || !csrfCookie || csrfCookie !== csrfBody) {
      return new Response("Invalid request", { status: 400 });
    }

    // Set-Cookie pe server (fără HTML/JS) + redirect 303 → /login?processing=1
    const headers = new Headers();
    headers.set(
      "Set-Cookie",
      // non-HttpOnly pentru ca /login să poată citi; scurtă viață (60s)
      `g_cred=${encodeURIComponent(credential)}; Max-Age=60; Path=/; SameSite=Lax`
    );
    headers.set("Location", "/login?processing=1");
    return new Response(null, { status: 303, headers });
  } catch {
    return new Response("Server error", { status: 500 });
  }
}

// Simple GET so you can probe the endpoint (should return 200 OK)
export async function GET() {
  return new Response("OK", { status: 200 });
}
