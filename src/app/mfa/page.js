"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function MfaPage() {
  const router = useRouter();
  const search = useSearchParams();
  const nextUrl = search.get("next") || "/account";

  const [statusMsg, setStatusMsg] = useState("");
  const [otp, setOtp] = useState("");
  const [loadingReq, setLoadingReq] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef(null);

  useEffect(() => {
    if (cooldown <= 0) return;
    cooldownRef.current = setInterval(() => {
      setCooldown((c) => {
        if (c <= 1) {
          clearInterval(cooldownRef.current);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(cooldownRef.current);
  }, [cooldown]);

  async function requestOtp() {
    try {
      setLoadingReq(true);
      setStatusMsg("Trimit cererea...");
      const res = await fetch("/api/mfa/request", { method: "POST" });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || body?.ok !== true) {
        throw new Error(body?.error || "Cererea OTP a eșuat");
      }
      setStatusMsg("OTP trimis pe email. Verifică inbox (și Spam).");
      // pornește cooldown (din env ai MFA_RESEND_COOLDOWN_SECONDS; hardcode 60 ca fallback)
      setCooldown(60);
    } catch (e) {
      setStatusMsg(`Eroare: ${e.message}`);
    } finally {
      setLoadingReq(false);
    }
  }

  async function verifyOtp(e) {
    e.preventDefault();
    try {
      if (!/^\d{6}$/.test(otp)) {
        setStatusMsg("Codul trebuie să aibă exact 6 cifre.");
        return;
      }
      setLoadingVerify(true);
      setStatusMsg("Verific codul...");
      const res = await fetch("/api/mfa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || body?.ok !== true) {
        throw new Error(body?.error || "Cod greșit sau expirat.");
      }
      setStatusMsg("Verificat! Te redirecționez...");
      // Cookie-ul HttpOnly 'mfa' e setat de server => navigăm mai departe
      router.replace(nextUrl);
    } catch (e) {
      setStatusMsg(`Eroare: ${e.message}`);
    } finally {
      setLoadingVerify(false);
    }
  }

  return (
    <div className="container py-5" style={{ maxWidth: 520 }}>
      <h1 className="mb-4">Autentificare în 2 pași</h1>
      <p className="text-muted">
        Ți-am trimis un cod de 6 cifre pe email. Introdu-l mai jos pentru a continua.
      </p>

      <div className="d-flex gap-2 mb-3">
        <button
          className="btn btn-primary"
          onClick={requestOtp}
          disabled={loadingReq || cooldown > 0}
        >
          {loadingReq ? "Trimit…" : cooldown > 0 ? `Trimite din nou (${cooldown}s)` : "Trimite codul pe email"}
        </button>
      </div>

      <form onSubmit={verifyOtp} className="mb-3">
        <label className="form-label">Cod OTP (6 cifre)</label>
        <input
          className="form-control"
          inputMode="numeric"
          pattern="\d{6}"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder="000000"
        />
        <button className="btn btn-success mt-3" disabled={loadingVerify || otp.length !== 6}>
          {loadingVerify ? "Verific…" : "Verifică OTP"}
        </button>
      </form>

      {statusMsg && <div className="alert alert-info mt-3 mb-0">{statusMsg}</div>}
    </div>
  );
}
