// src/app/verify/page.js
"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const dynamic = "force-dynamic";

/** Buton tip "pill" (identic ca stil cu Login/Forgot), cu mici opțiuni pt. disabled/hover */
function PillButton({
  children,
  type = "button",
  onClick,
  disabled = false,
  variant = "solid", // "solid" (negru) | "outline" (alb cu border negru)
  className = "",
  style = {},
  dimDisabled = true, // <- NU estompa (opacity) când e disabled? (pt. Resend)
  invertOnHover = true, // <- oprește invertirea pe hover (pt. Resend roșu)
}) {
  const base = {
    borderRadius: "50px",
    transition: "background-color .15s ease, color .15s ease, border-color .15s ease",
    padding: "10px 16px",
  };
  const solid = { border: "1px solid black", backgroundColor: "black", color: "white" };
  const outline = { border: "1px solid black", backgroundColor: "white", color: "black" };

  const btnStyle = {
    ...base,
    ...(variant === "solid" ? solid : outline),
    ...(dimDisabled && disabled ? { opacity: 0.6 } : {}),
    pointerEvents: disabled ? "none" : "auto",
    ...style,
  };

  function over(e) {
    if (disabled || !invertOnHover) return;
    if (variant === "solid") {
      e.currentTarget.style.backgroundColor = "white";
      e.currentTarget.style.color = "black";
    } else {
      e.currentTarget.style.backgroundColor = "black";
      e.currentTarget.style.color = "white";
      e.currentTarget.style.borderColor = "black";
    }
  }
  function out(e) {
    if (disabled || !invertOnHover) return;
    if (variant === "solid") {
      e.currentTarget.style.backgroundColor = "black";
      e.currentTarget.style.color = "white";
    } else {
      e.currentTarget.style.backgroundColor = "white";
      e.currentTarget.style.color = "black";
      e.currentTarget.style.borderColor = "black";
    }
  }

  return (
    <button
      type={type}
      className={`btn ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={btnStyle}
      onMouseOver={over}
      onMouseOut={out}
    >
      {children}
    </button>
  );
}

/** 6 căsuțe pentru OTP (auto-focus, backspace, paste) */
function OTPInputs({ value, onChange, disabled }) {
  const len = 6;
  const digits = Array.from({ length: len }, (_, i) => value[i] || "");
  const refs = useRef(Array.from({ length: len }, () => null));

  function setAt(i, v) {
    const arr = (value + "      ").slice(0, len).split("");
    arr[i] = v;
    onChange(arr.join("").replace(/\s/g, ""));
  }
  function handleInput(e, i) {
    const raw = e.target.value.replace(/\D/g, "");
    if (!raw) {
      setAt(i, "");
      return;
    }
    if (raw.length > 1) {
      onChange(raw.slice(0, len));
      refs.current[Math.min(raw.length, len) - 1]?.focus();
      return;
    }
    setAt(i, raw);
    refs.current[Math.min(i + 1, len - 1)]?.focus();
  }
  function handleKey(e, i) {
    if (e.key === "Backspace" && !value[i]) refs.current[Math.max(i - 1, 0)]?.focus();
    if (e.key === "ArrowLeft") refs.current[Math.max(i - 1, 0)]?.focus();
    if (e.key === "ArrowRight") refs.current[Math.min(i + 1, len - 1)]?.focus();
  }
  function handlePaste(e) {
    const text = (e.clipboardData.getData("text") || "").replace(/\D/g, "");
    if (text) {
      e.preventDefault();
      onChange(text.slice(0, len));
      refs.current[Math.min(text.length, len) - 1]?.focus();
    }
  }

  return (
    <div className="d-flex gap-2" onPaste={handlePaste}>
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={d}
          disabled={disabled}
          onChange={(e) => handleInput(e, i)}
          onKeyDown={(e) => handleKey(e, i)}
          className="form-control text-center"
          style={{
            width: 56,
            height: 56,
            fontSize: 22,
            letterSpacing: 1,
            borderRadius: "14px",
          }}
        />
      ))}
    </div>
  );
}

function VerifyContent() {
  const auth = getAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams?.get("next") || "/";

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | verifying | verified
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [cooldown, setCooldown] = useState(0);

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

  const RESEND_SECONDS = 60; // ⬅️ 60s cerute

  async function requestCode() {
    setError("");
    setStatus("sending");
    try {
      const headers = await authHeader();
      const res = await fetch("/api/mfa/email/request", {
        method: "POST",
        headers,
        credentials: "include",
        cache: "no-store",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data?.error === "cooldown")
          setCooldown(Number(data.retryAfter || RESEND_SECONDS));
        throw new Error(data?.error || "send_failed");
      }
      setStatus("sent");
      setCooldown(RESEND_SECONDS);
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
        credentials: "include",
        cache: "no-store",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "invalid");
      setStatus("verified");
      window.location.href = next; // păstrat exact cum aveai pentru cookie-uri
    } catch (e) {
      setStatus("idle");
      setError(e.message || "invalid");
    }
  }

  // mapare prietenoasă a erorilor în ENG (păstrat)
  const renderError = (err) => {
    if (err === "invalid" || err === "invalid_code") return "Invalid code.";
    if (err === "expired") return "Code expired — request a new one.";
    if (err === "too_many_attempts" || err === "locked")
      return "Too many attempts — please wait and try again.";
    if (err === "too_many_resends") return "Resend limit reached.";
    return "An error occurred. Please try again.";
  };

  const verifying = status === "verifying";
  const canVerify = code.length === 6 && !verifying;

  // Stil dinamic pentru Resend:
  const resendDisabled = cooldown > 0 || status === "sending";
  const resendDanger = !resendDisabled; // când countdown-ul a expirat -> roșu

  return (
    <div
      className="container d-flex justify-content-center align-items-start"
      style={{ minHeight: "100vh", marginTop: "30px" }}
    >
      <div className="card shadow p-4" style={{ maxWidth: 520, width: "100%" }}>
        <h3 className="mb-2">Two-Step Verification</h3>
        <p className="text-muted mb-4" style={{ lineHeight: 1.5 }}>
          We sent a 6-digit code to <b>{email || "…"}</b>. Enter the code below.
        </p>

        <form onSubmit={verifyCode} className="mb-3">
          <label className="form-label">6-digit code</label>
          <OTPInputs value={code} onChange={setCode} disabled={verifying} />

          <div className="d-flex gap-2 mt-3">
            {/* Verify code — text alb, background negru */}
            <PillButton type="submit" variant="solid" disabled={!canVerify}>
              {verifying ? (
                <span className="d-inline-flex align-items-center gap-2">
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                  Verifying…
                </span>
              ) : (
                "Verify code"
              )}
            </PillButton>

            {/* Resend code — border/text negru când e disabled, ROȘU când cooldown == 0 */}
            <PillButton
              variant="outline"
              onClick={requestCode}
              disabled={resendDisabled}
              dimDisabled={false}         // nu estompa când e disabled
              invertOnHover={!resendDanger} // nu inversa pe hover când e roșu
              style={{
                borderColor: resendDanger ? "#c00" : "black",
                color: resendDanger ? "#c00" : "black",
                backgroundColor: "white",
              }}
            >
              {cooldown > 0 ? `Resend code (${cooldown}s)` : "Resend code"}
            </PillButton>
          </div>
        </form>

        {status === "sent" && !error && (
          <div className="alert alert-success mb-0">Code sent. Please check your inbox.</div>
        )}

        {!!error && <div className="text-danger mt-2">{renderError(error)}</div>}
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
