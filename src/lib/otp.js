// src/lib/otp.js
import crypto from "crypto";

const COOKIE_NAME = "otp_session";
const MAX_ATTEMPTS = 5;

/**
 * Generează un cod OTP de 6 cifre + hash cu salt random
 * (util dacă vrei să stochezi în DB).
 */
export function generateOTP() {
  const code = String(Math.floor(100000 + Math.random() * 900000)); // 6 cifre
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.createHmac("sha256", salt).update(code).digest("hex");
  return { code, salt, hash };
}

/**
 * Verifică OTP comparând hash-ul
 */
export function verifyOTP(code, salt, hash) {
  const check = crypto.createHmac("sha256", salt).update(code).digest("hex");
  const a = Buffer.from(check);
  const b = Buffer.from(hash);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/**
 * Hash determinist pentru (email + code) cu secret global
 * → folosit pentru token/cookie (fără salt random).
 */
export function hashCode(email, code, secret) {
  return crypto.createHmac("sha256", secret).update(`${email}:${code}`).digest("hex");
}

/**
 * Encode Base64-URL
 */
function b64url(buf) {
  return Buffer.from(buf)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}
function fromB64url(str) {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  return Buffer.from(str, "base64");
}

/**
 * Semnează payload cu secretul
 */
export function signPayload(payload, secret) {
  const data = b64url(JSON.stringify(payload));
  const sig = b64url(crypto.createHmac("sha256", secret).update(data).digest());
  return `${data}.${sig}`;
}

/**
 * Verifică și decodează token-ul
 */
export function verifyToken(token, secret) {
  const [data, sig] = String(token || "").split(".");
  if (!data || !sig) return null;
  const expected = b64url(crypto.createHmac("sha256", secret).update(data).digest());
  if (sig !== expected) return null;
  try {
    return JSON.parse(fromB64url(data).toString("utf8"));
  } catch {
    return null;
  }
}

/**
 * Construiește cookie OTP
 */
export function buildCookie(name, value, maxAgeSecs) {
  const attrs = [
    `${name}=${value}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Secure",
    `Max-Age=${maxAgeSecs}`,
  ];
  return attrs.join("; ");
}

/**
 * Extrage cookie din request
 */
export function getCookie(req, name) {
  const cookie = req.headers.get("cookie") || "";
  const m = cookie.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : null;
}

/**
 * Curăță cookie
 */
export function clearCookie(name) {
  return `${name}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure`;
}

export const OTP_STORAGE = {
  name: COOKIE_NAME,
  maxAttempts: MAX_ATTEMPTS,
};
