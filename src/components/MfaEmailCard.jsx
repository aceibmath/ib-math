"use client";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

export default function MfaEmailCard() {
  const [enabled, setEnabled] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function authHeader() {
    const u = getAuth().currentUser;
    const t = u && (await u.getIdToken());
    return t ? { Authorization: `Bearer ${t}` } : {};
  }

  async function load() {
    setBusy(true);
    try {
      const h = await authHeader();
      const r = await fetch("/api/mfa/settings", { headers: h });
      const j = await r.json();
      if (r.ok && j.ok) setEnabled(!!j.enabled);
    } finally { setBusy(false); }
  }
  useEffect(() => { load(); }, []);

  async function setEnabledTo(v) {
    setBusy(true); setMsg("");
    try {
      const h = await authHeader();
      const r = await fetch("/api/mfa/settings", {
        method: "POST",
        headers: { ...h, "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !!v }),
      });
      const j = await r.json();
      if (r.ok && j.ok) {
        setEnabled(!!j.enabled);
        setMsg(j.enabled
          ? "Email 2FA activat. Data viitoare, după login, vei fi rugat să verifici codul."
          : "Email 2FA dezactivat pentru acest cont."
        );
      }
    } finally { setBusy(false); }
  }

  async function forgetDevice() {
    setBusy(true); setMsg("");
    try {
      await fetch("/api/mfa/clear", { method: "POST" });
      setMsg("Dispozitivul curent a fost uitat. Data viitoare vei verifica codul.");
    } finally { setBusy(false); }
  }

  if (enabled === null) return null;

  return (
    <div className="p-3 border rounded">
      <h5 className="mb-2">Password & Security</h5>
      <p className="text-muted mb-3">
        Verifică printr-un cod de 6 cifre trimis pe e-mail.
      </p>

      {enabled ? (
        <div className="alert alert-success">
          Two-factor via e-mail este <b>activ</b> pentru cont.
        </div>
      ) : (
        <div className="alert alert-secondary">
          Two-factor via e-mail este <b>dezactivat</b>.
        </div>
      )}

      <div className="d-flex gap-2">
        {enabled ? (
          <button className="btn btn-outline-danger" onClick={() => setEnabledTo(false)} disabled={busy}>
            Disable Email 2FA
          </button>
        ) : (
          <button className="btn btn-primary" onClick={() => setEnabledTo(true)} disabled={busy}>
            Enable Email 2FA
          </button>
        )}
        <button className="btn btn-outline-secondary" onClick={forgetDevice} disabled={busy}>
          Remove this device
        </button>
      </div>

      {msg && <div className="mt-3 text-muted">{msg}</div>}
    </div>
  );
}
