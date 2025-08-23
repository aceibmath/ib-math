// src/config/brand.js
export const brand = {
  name: "AceIBMath",
  domain: "aceibmath.com",
  emailFrom: process.env.MFA_EMAIL_FROM || "AceIBMath <noreply@aceibmath.com>",
  colors: {
    primary: "#000000",
    accent: "#111111",
    background: "#f7f7f8",
  },
  urls: {
    site: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    support: "mailto:support@aceibmath.com",
  },
  assets: {
    // ✅ pentru e-mail (PNG mic, ~128x128)
    logoUrl: "/logo-email.png",
    // ✅ pentru header pe site (SVG)
    logoHeaderUrl: "/logo.svg",
  },
  mfa: {
    ttlMinutes: Number(process.env.MFA_OTP_TTL_MINUTES || 10),
  },
};

export default brand;
