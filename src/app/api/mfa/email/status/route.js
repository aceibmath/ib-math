// src/app/api/mfa/email/status/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
  const c = await cookies();
  const enabled = c.get("mfa_required")?.value === "1";
  const verified = !!c.get("mfa")?.value;
  return NextResponse.json({ enabled, verified });
}
