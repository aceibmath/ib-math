// src/lib/mailer.js
import nodemailer from "nodemailer";
import { brand } from "@/config/brand";

let _transporter;
let _verified = false;

/**
 * Reguli:
 * - secure = true automat dacă portul e 465 (SSL). Pentru 587 → STARTTLS (secure=false).
 * - TLS v1.2+.
 * - In producție verificăm certificatele (rejectUnauthorized=true).
 * - În local poți permite self-signed setând SMTP_ALLOW_SELF_SIGNED=true.
 */
function buildTransporter() {
  const host = process.env.SMTP_HOST || "smtp.zoho.eu";
  const port = Number(process.env.SMTP_PORT || 465);

  // Dacă e setat explicit SMTP_SECURE, îl respectăm; altfel deducem din port.
  const secure =
    typeof process.env.SMTP_SECURE === "string"
      ? String(process.env.SMTP_SECURE).toLowerCase() === "true"
      : port === 465;

  const allowSelfSigned =
    String(process.env.SMTP_ALLOW_SELF_SIGNED || "").toLowerCase() === "true";

  const inProd = process.env.NODE_ENV === "production";

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure, // 465=SSL, 587=STARTTLS
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
    tls: {
      minVersion: "TLSv1.2",
      // În producție verificăm certificatele; în dev poți permite self-signed prin env.
      rejectUnauthorized: inProd ? true : !allowSelfSigned ? true : false,
    },
    connectionTimeout: 15_000,
    greetingTimeout: 15_000,
    socketTimeout: 30_000,
  });

  return transporter;
}

export function getTransporter() {
  if (!_transporter) _transporter = buildTransporter();
  return _transporter;
}

/**
 * Trimite un email.
 * În dev face verify() o singură dată pentru debug mai clar.
 */
export async function sendMail({ to, subject, html, text, from, headers }) {
  const transporter = getTransporter();

  if (process.env.NODE_ENV !== "production" && !_verified) {
    await transporter.verify().catch(() => {}); // nu blocăm trimiterea, doar încercăm
    _verified = true;
  }

  // Zoho cere ca From să fie exact utilizatorul autentificat.
  const fallbackFrom = brand?.emailFrom || process.env.SMTP_USER || "noreply@aceibmath.com";
  const fromAddr =
    from && from.includes("<")
      ? from
      : `AceIBMath <${from || fallbackFrom}>`;

  const info = await transporter.sendMail({
    from: fromAddr,
    to,
    subject,
    text,
    html,
    headers,
  });

  if (process.env.NODE_ENV !== "production") {
    console.log("[mailer] messageId:", info.messageId, "accepted:", info.accepted);
  }
  return info;
}

export default sendMail;



