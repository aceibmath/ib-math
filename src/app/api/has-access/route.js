// src/app/api/has-access/route.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getUidFromCookies, hasAccess } from "../../../lib/entitlements.server.js";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key"); // AA_HL sau price_...
  const uid = await getUidFromCookies();
  const ok = uid ? await hasAccess(uid, key) : false;
  return NextResponse.json({ uid, key, ok });
}
