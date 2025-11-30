// src/app/mfa-test/page.js
"use client";
import { useState } from "react";

export default function MFATest() {
  const [token, setToken] = useState("");
  const [reqRes, setReqRes] = useState(null);
  const [verRes, setVerRes] = useState(null);
  const [code, setCode] = useState("");
  const [busyReq, setBusyReq] = useState(false);
  const [busyVer, setBusyVer] = useState(false);
  const [busyTok, setBusyTok] = useState(false);
  const [tokErr, setTokErr] = useState("");

  async function ensureFirebase() {
    // Init fără "@/lib/firebaseClient": folosim config-ul tău din src/firebase/config.js
    const { initializeApp, getApps } = await import("firebase/app");
    if (!getApps().length) {
      // suportă fie export default, fie named export { firebaseConfig }
      const cfgMod = await import("@/firebase/config");
      const firebaseConfig = cfgMod.default || cfgMod.firebaseConfig;
      if (!firebaseConfig) throw new Error("Nu găsesc configurația Firebase (src/firebase/config.js).");
      initializeApp(firebaseConfig);
    }
  }

  async function autofillToken() {
    setBusyTok(true);
    setTokErr("");
    try {
      await ensureFirebase();
      const { getAuth } = await import("firebase/auth");
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("Nu ești logat în aplicație. Fă login și revino aici.");
      const t = await user.getIdToken(true);
      setToken(t);
    } catch (e) {
      setTokErr(String(e.message || e));
    } finally {
      setBusyTok(false);
    }
  }

  async function requestOtp() {
    setBusyReq(true); setReqRes(null);
    try {
      const r = await fetch("/api/mfa/email/request", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({}),
      });
      const j = await r.json();
      setReqRes({ status: r.status, body: j });
    } catch (e) {
      setReqRes({ error: String(e) });
    } finally {
      setBusyReq(false);
    }
  }

  async function verifyOtp() {
    setBusyVer(true); setVerRes(null);
    try {
      const r = await fetch("/api/mfa/email/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ code }),
      });
      const j = await r.json();
      setVerRes({ status: r.status, body: j });
    } catch (e) {
      setVerRes({ error: String(e) });
    } finally {
      setBusyVer(false);
    }
  }

  return (
    <div style={{ maxWidth: 640, margin: "40px auto", fontFamily: "system-ui, Arial" }}>
      <h1>MFA Email – Test end-to-end</h1>

      <label style={{ display: "block", marginTop: 12, fontWeight: 600 }}>Firebase ID Token</label>
      <textarea
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Lipește aici ID token-ul (Bearer)"
        rows={5}
        style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 8 }}
      />
      <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
        <button onClick={autofillToken} disabled={busyTok}
          style={{ padding: "8px 12px", borderRadius: 8, border: 0, background: "#e5e7eb", cursor: "pointer" }}>
          {busyTok ? "Citesc token..." : "Completează token automat"}
        </button>
        <button onClick={requestOtp} disabled={!token || busyReq}
          style={{ padding: "10px 14px", border: 0, borderRadius: 8, background: "#0ea5e9", color: "#fff", cursor: "pointer" }}>
          {busyReq ? "Trimit cod..." : "1) Cere OTP pe email"}
        </button>
      </div>
      {tokErr && <div style={{ color: "#b91c1c", marginTop: 8 }}>{tokErr}</div>}

      {reqRes && (
        <pre style={{ marginTop: 12, background: "#f7f7f7", padding: 12, borderRadius: 8 }}>
{JSON.stringify(reqRes, null, 2)}
        </pre>
      )}

      <hr style={{ margin: "24px 0" }} />

      <label style={{ display: "block", fontWeight: 600 }}>Cod OTP (6 cifre)</label>
      <input
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
        placeholder="000000"
        style={{ width: 180, padding: 10, border: "1px solid #ddd", borderRadius: 8 }}
      />
      <div style={{ marginTop: 12 }}>
        <button onClick={verifyOtp} disabled={!token || code.length !== 6 || busyVer}
          style={{ padding: "10px 14px", border: 0, borderRadius: 8, background: "#0ea5e9", color: "#fff", cursor: "pointer" }}>
          {busyVer ? "Verific..." : "2) Verifică OTP"}
        </button>
      </div>

      {verRes && (
        <pre style={{ marginTop: 12, background: "#f7f7f7", padding: 12, borderRadius: 8 }}>
{JSON.stringify(verRes, null, 2)}
        </pre>
      )}
      <p style={{ color: "#6b7280", marginTop: 12 }}>
        La succes, endpointul setează cookie-ul <code>mfa</code> (HttpOnly).
      </p>
    </div>
  );
}
