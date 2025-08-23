import { redirect } from "next/navigation";
import { getUidFromCookies, hasAccess } from "../../../lib/entitlements.server.js";

export default async function Layout({ children }) {
  const uid = await getUidFromCookies();
  if (!uid) redirect("/membership?reason=login");

  const ok = await hasAccess(uid, "AA_HL"); // sau priceId dacă preferi
  if (!ok) redirect("/membership?pay=AA_HL");

  return <>{children}</>;
}

