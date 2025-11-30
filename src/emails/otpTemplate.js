// src/emails/otpTemplate.js

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "https://aceibmath.com";

// Preferă o adresă de logo explicită din .env; dacă nu există, cade pe /logo-email.png de pe site.
const LOGO_URL =
  process.env.NEXT_PUBLIC_EMAIL_LOGO_URL ||
  `${SITE_URL}/logo-email.png`;

export function otpTemplate({ code, ttlMinutes = 10 }) {
  const subject = "Your verification code – AceIBMath";
  const preheader = `Your code ${code} expires in ${ttlMinutes} minutes.`;

  const text = [
    "Hello!",
    "",
    `Your verification code is: ${code}`,
    `This code expires in ${ttlMinutes} minutes.`,
    "",
    "If you didn’t request this code, you can safely ignore this email.",
    "",
    "— AceIBMath Team",
  ].join("\n");

  const html = `<!doctype html>
<html>
  <head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0; padding:0; background:#f6f7f9;">
    <!-- preheader (hidden) -->
    <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent; visibility:hidden;">
      ${escapeHtml(preheader)}
    </div>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td align="center" style="padding:24px">
          <table role="presentation" width="100%" style="max-width:600px; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.04);" cellspacing="0" cellpadding="0" border="0">

            <tr>
              <td style="padding:20px 24px; border-bottom:1px solid #eee;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="padding-right:12px">
                      <a href="${SITE_URL}" target="_blank" rel="noopener">
                        <img src="${LOGO_URL}" width="60" alt="AceIBMath" style="display:block; border:0; outline:none; text-decoration:none;">
                      </a>
                    </td>
                    <td style="font-family:Arial,Helvetica,sans-serif; font-size:16px; color:#111827; font-weight:700;">
                      AceIBMath
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:24px; font-family:Arial,Helvetica,sans-serif; color:#111827;">
                <h1 style="margin:0 0 12px; font-size:20px; line-height:1.3;">Verify your email</h1>
                <p style="margin:0 0 10px; font-size:14px; line-height:1.6; color:#1f2937;">
                  Your verification code is:
                </p>
                <div style="font-size:24px; font-weight:700; letter-spacing:4px; padding:12px 16px; border:1px solid #e5e7eb; border-radius:8px; display:inline-block;">
                  ${escapeHtml(code)}
                </div>
                <p style="margin:12px 0 0; font-size:12px; color:#6b7280;">
                  This code expires in ${ttlMinutes} minutes. If you didn’t request this code, please ignore this message.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:16px 24px; border-top:1px solid #eee; font-family:Arial,Helvetica,sans-serif; font-size:12px; color:#6b7280;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td>
                      <div style="font-weight:700; color:#111827;">AceIBMath Team</div>
                      <a href="mailto:noreply@aceibmath.com" style="color:#0ea5e9; text-decoration:none;">noreply@aceibmath.com</a> ·
                      <a href="${SITE_URL}" style="color:#0ea5e9; text-decoration:none;">aceibmath.com</a>
                    </td>
                    <td align="right" style="white-space:nowrap;">
                      <span style="color:#9ca3af;">© AceIBMath</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, text, html };
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
