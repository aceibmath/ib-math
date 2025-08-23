import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const c = cookies();
  const has = Boolean(c.get("mfa")?.value);
  return NextResponse.json({ verified: has });
}
