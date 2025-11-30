// src/app/join/page.js
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { auth } from "../../firebase/config";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const CTA_BG = "#0f3d37"; // verde închis-albăstrui

function planDisplayName(productBase) {
  if (!productBase) return "";
  let isTeacher = false;
  let base = productBase.trim();

  if (base.startsWith("teacher_")) {
    isTeacher = true;
    base = base.replace(/^teacher_/, "");
  }

  if (base === "suite") {
    return `Complete Learning Suite – ${isTeacher ? "Teacher PRO" : "Student"}`;
  }

  const [track, level] = base.split("_");
  const trackName =
    track === "aa" ? "Analysis & Approaches" : "Applications & Interpretation";
  const levelName = level === "sl" ? "Standard Level" : "Higher Level";
  const audience = isTeacher ? "Teacher PRO" : "Student";
  return `${trackName} ${levelName} – ${audience}`;
}

export default function JoinPage() {
  const router = useRouter();
  const sp = useSearchParams();

  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [user, setUser] = useState(null);

  // params
  const product = sp.get("product") || "";
  const months = useMemo(() => {
    const n = Number(sp.get("months"));
    return Number.isFinite(n) ? Math.min(24, Math.max(1, n)) : null;
  }, [sp]);

  // pricing JSON
  const [pricing, setPricing] = useState(null);
  const currency = pricing?.meta?.currency || "eur";

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/pricing-table.json", { cache: "no-store" });
        if (!res.ok) throw new Error("pricing-table.json not found");
        setPricing(await res.json());
      } catch (e) {
        setErr(e.message || "Failed to load pricing.");
      }
    })();
  }, []);

  const price = useMemo(() => {
    const rec = pricing?.prices?.[product]?.[String(months)];
    return rec || null;
  }, [pricing, product, months]);

  const fmtPrice = (cents, currency, integerOnly = false) =>
    new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: (currency || "eur").toUpperCase(),
      minimumFractionDigits: integerOnly ? 0 : 0,
      maximumFractionDigits: integerOnly ? 0 : 2,
    }).format((cents || 0) / 100);

  const syncSession = async () => {
    try {
      const idToken = await auth.currentUser?.getIdToken?.(true);
      if (!idToken) return;
      await fetch("/api/session/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ idToken }),
      });
    } catch {}
  };

  const handleGoogle = async () => {
    if (busy) return;
    setBusy(true);
    setErr("");
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      await syncSession();
    } catch (e) {
      setErr(e.message || "Google sign-in failed.");
    } finally {
      setBusy(false);
    }
  };

  // Email/password form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [email, setEmail]         = useState("");
  const [pw, setPw]               = useState("");
  const [showPw, setShowPw]       = useState(false);
  const [mode, setMode]           = useState("register"); // "register" | "login"

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setErr("");
    try {
      if (mode === "register") {
        const cred = await createUserWithEmailAndPassword(auth, email.trim(), pw);
        const displayName = `${firstName.trim()} ${lastName.trim()}`.trim();
        if (displayName) await updateProfile(cred.user, { displayName });
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), pw);
      }
      await syncSession();
    } catch (e) {
      setErr(e.message || "Authentication failed.");
    } finally {
      setBusy(false);
    }
  };

  const handleContinueToPayment = async () => {
    if (busy) return;
    setBusy(true);
    setErr("");
    try {
      if (!product || !months) throw new Error("Invalid selection. Please go back and choose a plan.");
      if (!auth.currentUser) throw new Error("Please sign in first.");

      const lookupKey = `${product}_${months}m`; // acceptăm 1–24

      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lookupKey, uid: auth.currentUser.uid }),
      });
      const data = await res.json();
      if (res.ok && data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data?.error || "Could not start checkout.");
      }
    } catch (e) {
      setErr(e.message || "Could not start checkout.");
    } finally {
      setBusy(false);
    }
  };

  const backToMembership = () => router.push("/membership");
  const planName = planDisplayName(product);
  const integerTotals = [1, 12, 24].includes(months);

  return (
    <div style={{ maxWidth: 980, margin: "15px auto 28px", padding: "0 16px" }}>
      <h1
        style={{
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          fontSize: 22,
          fontWeight: 600,
          lineHeight: 1.3,
          color: CTA_BG,
          marginBottom: 10,
        }}
      >
        Checkout
      </h1>

      {!product || !months ? (
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: 18,
            background: "#fff",
          }}
        >
          <p style={{ margin: 0 }}>Invalid selection. Please choose a plan again.</p>
          <button className="btn btn-change mt-2" onClick={backToMembership}>
            ← Back to membership
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
          }}
        >
          {/* Order Summary */}
          <section
            className="order-summary-card"
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: 16,
              background: "#fff",
            }}
          >
            <h2
              style={{
                fontSize: 18,
                marginBottom: 10,
                fontWeight: 600,
                color: CTA_BG,
              }}
            >
              Order Summary
            </h2>
            <div style={{ display: "grid", gap: 6 }}>
              <div style={{ fontWeight: 600 }}>
                Plan: {planName || product.replace(/_/g, " ")}
              </div>
              <div style={{ fontWeight: 600 }}>
                Duration: {months} {months === 1 ? "month" : "months"}
              </div>
              <div style={{ fontWeight: 600 }}>
                Total payment:{" "}
                {price ? fmtPrice(price.total_cents, currency, integerTotals) : "—"}
              </div>
              <div style={{ color: "#6b7280" }}>
                {price ? `≈ ${fmtPrice(price.per_month_cents, currency, false)}/month` : ""}
              </div>
            </div>

            <hr />

            <button className="btn btn-change" onClick={backToMembership}>
              ← Change plan
            </button>
          </section>

          {/* User Info + Continue */}
          <section
            className="user-info-card"
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: 16,
              background: "#fff",
               marginTop: -45, // ▲ ridică blocul ~18px (egalează gap-ul grilei)
            }}
          >
            <h2
              style={{
                fontSize: 18,
                marginBottom: 10,
                fontWeight: 600,
                color: CTA_BG,
              }}
            >
              User Info
            </h2>

            {!user ? (
              <>
                <button
                  className="btn w-100 mb-3 d-flex align-items-center justify-content-center gap-2"
                  onClick={handleGoogle}
                  style={{
                    border: "1px solid black",
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "50px",
                    transition:
                      "background-color .15s ease, color .15s ease, border-color .15s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "black";
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.borderColor = "black";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.color = "black";
                    e.currentTarget.style.borderColor = "black";
                  }}
                >
                  {/* pictograma Google */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20" aria-hidden="true">


                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>

                    
                    
                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,16.108,18.961,13,24,13c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.976,13.409-5.197l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.957l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.793,2.237-2.231,4.166-4.084,5.565l6.19,5.238 C36.964,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                  </svg>
                  <span>Login with Google</span>
                </button>

                <div style={{ fontSize: 13, color: "#6b7280", margin: "6px 0 10px" }}>
                  — or use email —
                </div>

                <form onSubmit={handleEmailAuth}>
                  {mode === "register" && (
                    <>
                      <div className="mb-2">
                        <input
                          type="text"
                          className="form-control"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="First Name"
                          required
                        />
                      </div>

                      <div className="mb-2">
                        <input
                          type="text"
                          className="form-control"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Last Name"
                          required
                        />
                      </div>
                    </>
                  )}

                  <div className="mb-2">
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      required
                    />
                  </div>

                  <div className="mb-3 position-relative">
                    <input
                      type={showPw ? "text" : "password"}
                      className="form-control pe-5"
                      value={pw}
                      onChange={(e) => setPw(e.target.value)}
                      placeholder="Password"
                      required
                      minLength={6}
                    />
                    <span
                      onClick={() => setShowPw(!showPw)}
                      className="position-absolute"
                      style={{
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        color: "#888",
                      }}
                      title={showPw ? "Hide password" : "Show password"}
                      aria-label={showPw ? "Hide password" : "Show password"}
                    >
                      {showPw ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>

                  <div className="d-flex align-items-center justify-content-between">
                    <button type="submit" className="btn btn-create" disabled={busy}>
                      {mode === "register" ? "Create account" : "Sign in"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-link account-link"
                      onClick={() => setMode(mode === "register" ? "login" : "register")}
                    >
                      {mode === "register" ? "I already have an account" : "Create a new account"}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div
                style={{
                  padding: 12,
                  background: "#f3f4f6",
                  borderRadius: 8,
                  marginBottom: 12,
                }}
              >
                Signed in as <strong>{user.displayName || user.email}</strong>
              </div>
            )}

            {err ? (
              <p className="text-danger mt-2" role="alert" aria-live="polite">
                {err}
              </p>
            ) : null}

            <hr />

            <button
              className="btn btn-continue w-100"
              onClick={handleContinueToPayment}
              disabled={busy || !product || !months || !user}
            >
              Continue to payment
            </button>
            {!user && (
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 6 }}>
                (Sign in first to enable the payment button)
              </div>
            )}
          </section>
        </div>
      )}

      <style jsx>{`
        .btn-change, .btn-create, .btn-continue {
          background: ${CTA_BG};
          color: #fff;
          border-color: transparent;
        }
        .btn-change:hover, .btn-create:hover, .btn-continue:hover {
          background: #000;
          color: #fff;
        }
        .account-link { color: ${CTA_BG} !important; }
        @media (max-width: 860px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
