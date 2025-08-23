// src/app/premium/[product]/layout.js
import { redirect } from "next/navigation";
import { getUidFromCookies, hasAccess, getActiveEntitlements } from "../../../lib/entitlements.server.js";

// mapează segmentul URL -> productKey
const SEGMENT_TO_KEY = {
  "aa-hl": "AA_HL",
  "aa-sl": "AA_SL",
  // adaugi aici alte produse când apar, ex:
  // "ai-hl": "AI_HL",
};

export default async function PremiumProductLayout({ children, params }) {
  const slug = params?.product;      // ex: "aa-hl", "aa-sl"
  const requiredKey = SEGMENT_TO_KEY[slug] || null;

  const uid = await getUidFromCookies();
  if (!uid) {
    redirect("/membership?reason=login");
  }

  let ok = false;
  if (requiredKey) {
    ok = await hasAccess(uid, requiredKey);
  } else {
    // fallback: dacă nu avem mapare, permite accesul dacă userul are ORICE entitlement activ
    const ents = await getActiveEntitlements(uid);
    ok = Array.from(ents.values()).some((e) => e.active);
  }

  if (!ok) {
    redirect(requiredKey ? `/membership?pay=${requiredKey}` : "/membership");
  }

  return <>{children}</>;
}
