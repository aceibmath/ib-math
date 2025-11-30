// src/app/success/page.js
import Link from "next/link";

export default async function SuccessPage({ searchParams }) {
  // Next 15 compatibility: searchParams can be an async iterable in RSC
  const sp =
    typeof searchParams?.then === "function" ? await searchParams : searchParams;

  const ref = sp?.ref ?? null;
  const sessionId = sp?.session_id ?? null;

  return (
    <main
      style={{
        maxWidth: 680,
        margin: "40px auto",
        padding: 16,
        textAlign: "center",
      }}
    >
      <h1>Payment Successful ✅</h1>
      <p>Thank you! Your payment has been processed successfully.</p>

      {ref ? <p style={{ fontSize: 14, opacity: 0.8 }}>Reference: {ref}</p> : null}
      {sessionId ? (
        <p style={{ fontSize: 14, opacity: 0.8 }}>Session: {sessionId}</p>
      ) : null}

      <p>
        You can view or download your receipt anytime in{" "}
        <Link href="/account?tab=billing" style={{ textDecoration: "none" }}>
          Billing
        </Link>
        .
      </p>

      <div style={{ marginTop: 24 }}>
        <Link href="/">Home</Link>
      </div>
    </main>
  );
}
