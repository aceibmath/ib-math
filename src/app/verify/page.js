// src/app/verify/page.js
"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const dynamic = "force-dynamic";

function VerifyContent() {
  const auth = getAuth();
  const router = useRouter();
  const search = useSearchParams();

  const nextPath = search.get("next") || "/account";

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | verifying | verified
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [cooldown, setCooldown] = useState(0);

  // așteaptă sesiunea Firebase, apoi cere codul
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        router.replace("/login?next=/verify");
        return;
      }
      setEmail(u.email || "");
      await requestCode();
    });
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, router]);

  // cronometru cooldown
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  async function authHeader() {
    const u = auth.currentUser;
    if (!u) return {};
    const idToken = await u.getIdToken();
    return { Authorization: `Bearer ${idToken}` };
  }

  async function requestCode() {
    setError("");
    setStatus("sending");
    try {
      const headers = await authHeader();
      const res = await fetch("/api/mfa/email/request", { method: "POST", headers });
      const data = await res.json();
      if (!res.ok) {
        if (data?.error === "cooldown") setCooldown(Number(data.retryAfter || 30));
        throw new Error(data?.error || "send_failed");
      }
      setStatus("sent");
      setCooldown(30);
    } catch (e) {
      setStatus("idle");
      setError(e.message || "send_failed");
    }
  }

  async function verifyCode(e) {
    e.preventDefault();
    setError("");
    setStatus("verifying");
    try {
      const headers = await authHeader();
      const res = await fetch("/api/mfa/email/verify", {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "invalid");
      setStatus("verified");
      router.replace(nextPath);
    } catch (e) {
      setStatus("idle");
      setError(e.message || "invalid");
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: "40px auto", padding: 16 }}>
      <h3 style={{ marginBottom: 12 }}>Verificare în 2 pași</h3>
      <p style={{ color: "#666", marginBottom: 16 }}>
        Am trimis un cod la <b>{email || "…"}</b>. Introdu codul de 6 cifre.
      </p>

      <form onSubmit={verifyCode} style={{ marginBottom: 12 }}>
        <label style={{ display: "block", marginBottom: 8 }}>Cod de 6 cifre</label>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]{6}"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          required
          style={{
            width: "100%",
            padding: 10,
            fontSize: 18,
            letterSpacing: 2,
            marginBottom: 12,
          }}
        />
        <button
          type="submit"
          disabled={status === "verifying" || code.length !== 6}
          style={{ padding: "10px 14px" }}
        >
          {status === "verifying" ? "Verific…" : "Verifică codul"}
        </button>
      </form>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button
          onClick={requestCode}
          disabled={cooldown > 0 || status === "sending"}
          style={{ padding: "8px 12px" }}
        >
          {cooldown > 0 ? `Trimite din nou (${cooldown}s)` : "Trimite din nou"}
        </button>
        {!!error && (
          <span style={{ color: "#c00" }}>
            {error === "invalid" && "Cod invalid"}
            {error === "expired" && "Cod expirat – trimite din nou"}
            {error === "locked" && "Prea multe încercări – așteaptă"}
            {error === "too_many_resends" && "Limită de resend atinsă"}
            {["send_failed", "cooldown", "missing_code", "code_not_found", "internal"].includes(error) &&
              "A apărut o eroare"}
          </span>
        )}
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div />}>
      <VerifyContent />
    </Suspense>
  );
}
