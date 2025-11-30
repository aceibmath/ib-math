// src/app/cancel/page.js
import Link from "next/link";

export default function CancelPage() {
  return (
    <main style={{ maxWidth: 680, margin: "40px auto", padding: 16 }}>
      <h1>Payment Canceled ❌</h1>
      <p>Your payment was canceled. No charges were made.</p>
      <div style={{ marginTop: 24 }}>
        <Link href="/membership">⬅️ Back to Membership</Link>
      </div>
    </main>
  );
}
