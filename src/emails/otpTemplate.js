// src/emails/otpTemplate.js
import { brand } from "@/config/brand";

function absUrl(pathOrUrl) {
  if (!pathOrUrl) return null;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const base = (brand.urls?.site || "http://localhost:3000").replace(/\/$/, "");
  return `${base}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

export function otpTemplate({ code, ttlMinutes }) {
  const ttl = Number(ttlMinutes || brand.mfa?.ttlMinutes || 10);
  const name = brand.name || "AceIBMath";
  const logo = absUrl(brand.assets?.logoUrl);

  const subject = `Your ${name} code (expires in ${ttl} min)`;
  const text = `Your ${name} verification code is ${code}. It expires in ${ttl} minutes. If you didn't request this code, you can ignore this email.`;

  const html = `
  <table role="presentation" width="100%" style="font-family:Arial,sans-serif;background:#f7f7f8;padding:24px 0">
    <tr>
      <td align="center">
        <table width="520" style="background:#ffffff;border:1px solid #eee;border-radius:8px;padding:24px">
          <tr>
            <td align="center" style="padding-bottom:12px">
              ${logo ? `<img src="${logo}" alt="${name}" width="64" height="64" style="display:block;border:0;outline:0;text-decoration:none" />`
                    : `<div style="font-size:22px;font-weight:700">${name}</div>`}
            </td>
          </tr>
          <tr><td align="center" style="color:#555;font-size:14px">Email 2FA verification</td></tr>
          <tr><td align="center" style="padding:20px 0 8px;color:#333;font-size:16px">Your code:</td></tr>
          <tr><td align="center" style="font-size:34px;letter-spacing:6px;font-weight:700;padding-bottom:8px">${code}</td></tr>
          <tr><td align="center" style="color:#666;font-size:13px;padding:0 12px 8px">This code expires in ${ttl} minutes and can be used once.</td></tr>
          <tr><td align="center" style="color:#999;font-size:12px;padding-top:6px">If you didn’t request this, you can safely ignore this email.</td></tr>
        </table>
        <div style="color:#999;font-size:12px;margin-top:12px">© ${new Date().getFullYear()} ${name}</div>
      </td>
    </tr>
  </table>`.trim();

  return { subject, text, html };
}
