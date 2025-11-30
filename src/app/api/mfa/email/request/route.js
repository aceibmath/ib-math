// src/app/api/mfa/email/request/route.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import path from "path"; // (rămas aici dacă vei dori CID în viitor)
import { adminAuth, adminDb, FieldValue } from "@/lib/firebaseAdmin";
import { generateOTP } from "@/lib/otp";
import { otpTemplate } from "@/emails/otpTemplate";
import { sendMail } from "@/lib/mailer";

// Config din ENV
const TTL_MIN = Number(process.env.MFA_OTP_TTL_MINUTES || 10);
const COOLDOWN_SEC = Number(process.env.MFA_RESEND_COOLDOWN_SECONDS || 60);
const MAX_RESENDS = Number(process.env.MFA_MAX_RESENDS || 5);

// 🔒 Rate-limit simplu: max <limit> cereri în <windowMinutes> minute, per bucket (uid/ip)
async function checkRateLimit(bucketId, { limit = 5, windowMinutes = 15 } = {}) {
  const ref = adminDb.collection("rate_limits").doc(`mfa_email:${bucketId}`);
  const now = Date.now();
  const windowMs = windowMinutes * 60 * 1000;

  await adminDb.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    let hits = [];
    if (snap.exists) {
      const data = snap.data();
      hits = Array.isArray(data.hits) ? data.hits.filter((t) => now - t < windowMs) : [];
    }
    if (hits.length >= limit) throw new Error("RATE_LIMIT");
    hits.push(now);
    tx.set(ref, { hits, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
  });
}

export async function POST(req) {
  try {
    // 1) Firebase ID token
    const authHeader = req.headers.get("authorization") || "";
    const altHeader = req.headers.get("x-firebase-id-token") || "";
    const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : (altHeader || null);
    if (!idToken) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(idToken);
    const uid = decoded.uid;
    const email = decoded.email;
    if (!email) return NextResponse.json({ error: "no_email" }, { status: 400 });

    // 2) Cooldown + cap de retransmiteri
    const docRef = adminDb.collection("mfa_codes").doc(uid);
    const snap = await docRef.get();
    const now = Date.now();

    if (snap.exists) {
      const d = snap.data();
      if (d.lastSentAt && now - Number(d.lastSentAt) < COOLDOWN_SEC * 1000) {
        const retryAfter = Math.max(1, COOLDOWN_SEC - Math.floor((now - Number(d.lastSentAt)) / 1000));
        return NextResponse.json({ error: "cooldown", retryAfter }, { status: 429 });
      }
      if ((d.resendCount || 0) >= MAX_RESENDS) {
        return NextResponse.json({ error: "too_many_resends" }, { status: 429 });
      }
    }

    // 3) Rate-limit suplimentar: per-uid + per-ip
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    await Promise.all([
      checkRateLimit(uid, { limit: 5, windowMinutes: 15 }),
      checkRateLimit(ip, { limit: 10, windowMinutes: 15 }),
    ]);

    // 4) Generează OTP și salvează
    const { code, salt, hash } = generateOTP();
    const expiresAt = now + TTL_MIN * 60 * 1000;

    await docRef.set(
      {
        uid,
        email,
        hash,
        salt,
        expiresAt,
        attemptCount: 0,
        resendCount: FieldValue.increment(1),
        lastSentAt: now,
        createdAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    // 5) Template + trimitere email prin helperul comun
    const { subject, text, html } = otpTemplate({ code, ttlMinutes: TTL_MIN });
    const from = process.env.MFA_EMAIL_FROM || `AceIBMath <${process.env.SMTP_USER || "noreply@aceibmath.com"}>`;

    await sendMail({
      from,
      to: email,
      subject,
      text,
      html, // logo folosit din CDN/site public → nu avem nevoie de CID
    });

    return NextResponse.json({ ok: true, expiresAt });
  } catch (err) {
    if (err?.message === "RATE_LIMIT") {
      return NextResponse.json(
        { error: "rate_limit", message: "Prea multe cereri. Încearcă mai târziu." },
        { status: 429 }
      );
    }
    console.error("[MFA][REQUEST] error:", err);
    return NextResponse.json({ error: "send_failed" }, { status: 500 });
  }
}
