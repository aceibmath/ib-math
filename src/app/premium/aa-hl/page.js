// NU pune "use client"
import { redirect } from "next/navigation";
import { getUidFromCookies, hasAccess } from "../../../lib/entitlements.server.js";

export default async function Page() {
  const uid = await getUidFromCookies();
  if (!uid) redirect("/membership?reason=login");

  const ok = await hasAccess(uid, "AA_HL"); // sau un priceId, vezi nota de mai jos
  if (!ok) redirect("/membership?pay=AA_HL");

  return (
    <main className="container py-4">
      <h1>AA HL — Premium Content</h1>
      {/* conținutul tău */}
    </main>
  );
}
