// src/components/account/SecurityTab.js
"use client";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

export default function SecurityTab() {
  const [loading, setLoading] = useState(true);
  const [enabled, setEnabled] = useState(false);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/mfa/email/status", { cache: "no-store" });
        const j = await r.json();
        setEnabled(!!j?.enabled);
      } catch {}
      setLoading(false);
    })();
  }, []);

  async function toggle2fa(nextValue) {
    setSaving(true);
    setErr("");
    try {
      const u = getAuth().currentUser;
      if (!u) throw new Error("Not authenticated");
      const t = await u.getIdToken();
      const r = await fetch("/api/mfa/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${t}`,
        },
        body: JSON.stringify({ enabled: nextValue }),
        credentials: "include", // IMPORTANT: apply Set-Cookie (mfa_required)
      });
      const j = await r.json();
      if (!r.ok || !j?.ok) throw new Error(j?.error || "save_failed");
      setEnabled(nextValue);
    } catch (e) {
      setErr("Couldn't save the setting. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-2">Password &amp; Security</h5>
        <p className="text-muted mb-3">
          Two-step verification using a 6-digit code sent by email.
        </p>

        {loading ? (
          <div className="text-muted">Loading…</div>
        ) : (
          <>
            {enabled ? (
              <div className="alert alert-success">Email 2FA is enabled.</div>
            ) : (
              <div className="alert alert-secondary">Email 2FA is turned off.</div>
            )}

            <button
              className={`btn ${enabled ? "btn-outline-danger" : "btn-primary"}`}
              onClick={() => toggle2fa(!enabled)}
              disabled={saving}
            >
              {enabled ? "Disable 2FA" : "Enable 2FA"}
            </button>

            {enabled && (
              <p className="text-muted mt-3 mb-0">
                Next time you sign in, you'll receive a 6-digit code by email and
                will proceed after verification.
              </p>
            )}

            {err && <div className="alert alert-danger mt-3 mb-0">{err}</div>}
          </>
        )}
      </div>
    </div>
  );
}
