// src/lib/otp.js
import crypto from "crypto";

export function generateOTP() {
  const code = String(Math.floor(100000 + Math.random() * 900000)); // 6 cifre
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.createHmac("sha256", salt).update(code).digest("hex");
  return { code, salt, hash };
}

export function verifyOTP(code, salt, hash) {
  const check = crypto.createHmac("sha256", salt).update(code).digest("hex");
  const a = Buffer.from(check);
  const b = Buffer.from(hash);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
