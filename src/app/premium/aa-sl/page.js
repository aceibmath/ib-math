// NU pune "use client"
import { redirect } from "next/navigation";
import { getUidFromCookies, hasAccess } from "../../../lib/entitlements.server.js";

export default async function Page() {
  const uid = await getUidFromCookies();
  if (!uid) redirect("/membership?reason=login");

  const ok = await hasAccess(uid, "AA_SL"); // sau hasAccess(uid, process.env.STRIPE_PRICE_AA_SL)
  if (!ok) redirect("/membership?pay=AA_SL");

  return (
    <main className="container py-4">
      <h1>AA SL — Premium Content</h1>
      {/* TODO: conținutul tău SL aici */}
    </main>
  );
}
