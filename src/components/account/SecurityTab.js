"use client";
import { useEffect, useState } from "react";

export default function SecurityTab() {
  const [phase, setPhase] = useState("idle");      // idle | requested | verified
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);   // sec pentru resend

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/mfa/email/status", { cache: "no-store" });
        const data = await res.json();
        setPhase(data.verified ? "verified" : "idle");
      } catch {}
    })();
  }, []);

  useEffect(() => {
    if (!countdown) return;
    const t = setInterval(() => setCountdown((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [countdown]);

  const onRequest = async () => {
    setError("");
    try {
      const res = await fetch("/api/mfa/email/request", { method: "POST" });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d?.message || "Request failed");
      }
      setPhase("requested");
      setCountdown(60);
    } catch (e) {
      setError(e.message);
    }
  };

  const onVerify = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/mfa/email/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d?.message || "Invalid code");
      }
      setPhase("verified");
    } catch (e) {
      setError(e.message);
    }
  };

  const onResend = () => countdown === 0 && onRequest();

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-2">Password &amp; Security</h5>
        <p className="text-muted mb-4">
          Verifică un cod trimis pe e-mail pentru un plus de securitate pe acest dispozitiv.
        </p>

        {phase === "verified" ? (
          <div className="alert alert-success mb-0">
            Two-factor via e-mail este activ pe acest dispozitiv.
          </div>
        ) : (
          <>
            <div className="d-flex gap-2 align-items-center mb-3">
              <button className="btn btn-primary" onClick={onRequest} disabled={phase === "requested"}>
                {phase === "requested" ? "Cod trimis" : "Trimite codul"}
              </button>

              {phase === "requested" && (
                <button className="btn btn-outline-secondary" onClick={onResend} disabled={countdown > 0}>
                  {countdown > 0 ? `Retrimite în ${countdown}s` : "Retrimite"}
                </button>
              )}
            </div>

            {phase === "requested" && (
              <form className="d-flex gap-2" onSubmit={onVerify}>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="form-control"
                  placeholder="Cod din 6 cifre"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  required
                />
                <button className="btn btn-success" type="submit" disabled={code.length !== 6}>
                  Verifică
                </button>
              </form>
            )}

            {error && <div className="alert alert-danger mt-3 mb-0">{error}</div>}
          </>
        )}

        <hr className="my-4" />
        <small className="text-muted">
          Codul expiră în 10 minute. Verifică și folderul Spam/Promotions dacă nu îl primești.
        </small>
      </div>
    </div>
  );
}
