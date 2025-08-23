// src/lib/mailer.js
import nodemailer from "nodemailer";
import { brand } from "@/config/brand";

let _transporter;

function buildTransporter() {
  const allowSelfSigned = String(process.env.SMTP_ALLOW_SELF_SIGNED || "").toLowerCase() === "true";

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || "false").toLowerCase() === "true", // 587 => STARTTLS
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
    tls: allowSelfSigned ? { rejectUnauthorized: false } : undefined, // doar în dev
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

export async function sendMail({ to, subject, html, text, from, headers }) {
  const transporter = getTransporter();
  const fromAddr = from || brand.emailFrom || "AceIBMath <noreply@aceibmath.com>";

  const info = await transporter.sendMail({
    from: fromAddr,
    to,
    subject,
    text,
    html,
    headers,
  });

  if (process.env.NODE_ENV !== "production") {
    console.log("[mailer] messageId:", info.messageId);
  }
  return info;
}

export default sendMail;
