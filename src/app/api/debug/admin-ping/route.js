export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

export async function GET() {
  try {
    // două apeluri simple ca să forceze credențialele:
    await adminAuth.listUsers(1);
    await adminDb.listCollections();
    return NextResponse.json({ ok: true });
  } catch (e) {
    // vedem exact mesajul
    return NextResponse.json(
      {
        ok: false,
        name: e?.name,
        code: e?.code,
        message: String(e?.message || e),
      },
      { status: 500 }
    );
  }
}
