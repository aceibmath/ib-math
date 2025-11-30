// src/app/login/page.js
"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { auth } from "../../firebase/config";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

export const dynamic = "force-dynamic";

function LoginContent() {
  const { user, loginWithEmail, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const force = searchParams?.get("force") === "1"; // ⬅️ NU redirecționa când e setat

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const initialProcessing =
    typeof window === "undefined"
      ? true
      : new URLSearchParams(window.location.search).get("processing") === "1";
  const [processing, setProcessing] = useState(initialProcessing);

  // ===== Google Identity Services (GIS) – redirect flow =====
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const initedRef = useRef(false);
  const hiddenBtnWrapRef = useRef(null);
  const hiddenBtnElRef = useRef(null);

  const siteOrigin =
    typeof window !== "undefined"
      ? window.location.origin
      : (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
  const loginUri = `${siteOrigin}/api/gis/callback`;

  useEffect(() => {
    if (!clientId) return;
    function onLoaded() {
      /* global google */
      if (!window.google?.accounts?.id) return;
      if (initedRef.current) return;

      window.google.accounts.id.initialize({
        client_id: clientId,
        ux_mode: "redirect",
        login_uri: loginUri,
        context: "signin",
        auto_select: false,
        itp_support: true,
      });

      if (hiddenBtnWrapRef.current) {
        window.google.accounts.id.renderButton(hiddenBtnWrapRef.current, {
          type: "standard",
          theme: "outline",
          size: "large",
          text: "continue_with",
          shape: "pill",
          width: 360,
          logo_alignment: "left",
        });
        hiddenBtnElRef.current =
          hiddenBtnWrapRef.current.querySelector('div[role="button"]');
      }
      initedRef.current = true;
    }

    if (!document.getElementById("gis-script")) {
      const s = document.createElement("script");
      s.src = "https://accounts.google.com/gsi/client";
      s.async = true;
      s.defer = true;
      s.id = "gis-script";
      s.onload = onLoaded;
      document.head.appendChild(s);
    } else {
      onLoaded();
    }
  }, [clientId, loginUri]);

  useEffect(() => {
    const sp =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search)
        : null;
    const fromGis = sp?.get("processing") === "1";

    let tries = 0;
    let cancelled = false;

    const tryFinish = async () => {
      if (cancelled) return;

      const match =
        typeof document !== "undefined"
          ? document.cookie.split("; ").find((x) => x.startsWith("g_cred="))
          : null;

      if (!match) {
        if (fromGis && tries < 40) {
          tries++;
          setTimeout(tryFinish, 50);
        } else {
          if (!fromGis) setProcessing(false);
        }
        return;
      }

      const idToken = decodeURIComponent(match.split("=")[1] || "");
      document.cookie = "g_cred=; Max-Age=0; path=/; SameSite=Lax";

      try {
        setProcessing(true);
        const cred = GoogleAuthProvider.credential(idToken);
        await signInWithCredential(auth, cred);
      } catch (e) {
        setServerError(e?.message || "Google sign-in failed.");
        setProcessing(false);
      }
    };

    tryFinish();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleGoogleClick = () => {
    setServerError("");
    if (hiddenBtnElRef.current) {
      hiddenBtnElRef.current.click();
      return;
    }
    setServerError("Please try again in a moment…");
  };

  // ===== Email / Password =====
  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!email.includes("@") || !email.includes("."))
      newErrors.email = "Enter a valid email.";
    if (!password.trim()) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setServerError("");
    if (!validate()) return;

    const result = await loginWithEmail(email, password);
    if (!result?.success) {
      setServerError(result.error || "Login failed");
    }
  };

  // ===== După autentificare: sync + redirect/MFA — Sări peste dacă force=1 =====
  useEffect(() => {
    if (!user || force) return;

    if (!user.emailVerified) {
      alert("Please verify your email before logging in.");
      logout();
      setProcessing(false);
      return;
    }
    (async () => {
      try {
        const idToken = await user.getIdToken();
        const r = await fetch("/api/session/sync", {
          method: "POST",
          headers: { Authorization: `Bearer ${idToken}` },
          credentials: "include",
          cache: "no-store",
        });
        let mustMfa = false;
        try {
          const j = await r.json();
          mustMfa = !!j?.mfaRequired;
        } catch {
          mustMfa = false;
        }
        if (mustMfa) {
          window.location.href = "/verify";
          return;
        }
      } catch {}
      window.location.href = "/";
    })();
  }, [user, force, logout]);

  if (processing) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "60vh" }}>
        <div className="text-center">
          <div className="spinner-border mb-3" role="status" aria-hidden="true"></div>
          <div className="fw-semibold">Signing you in…</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container d-flex justify-content-center align-items-start"
      style={{ minHeight: "100vh", marginTop: "30px" }}
    >
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-2">Login</h3>

        <p className="text-center text-muted mb-4">
          Welcome back! Select method to login:
        </p>

        <button
          className="btn w-100 mb-3 d-flex align-items-center justify-content-center gap-2"
          onClick={handleGoogleClick}
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
          onMouseDown={(e) => {
            e.currentTarget.style.backgroundColor = "black";
            e.currentTarget.style.color = "white";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.backgroundColor = "black";
            e.currentTarget.style.color = "white";
          }}
        >
          {/* Google icon SVG… */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12   s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24   s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,16.108,18.961,13,24,13c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657   C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.976,13.409-5.197l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.957   l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.793,2.237-2.231,4.166-4.084,5.565c0.001-0.001,0.002-0.001,0.003-0.002   l6.19,5.238C36.964,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
          </svg>
          <span>Login with Google</span>
        </button>

        {/* hidden GIS button */}
        <div
          ref={hiddenBtnWrapRef}
          aria-hidden="true"
          style={{ position: "absolute", left: "-10000px", top: "-10000px", opacity: 0, height: 0, width: 0, overflow: "hidden" }}
        />

        <div className="d-flex align-items-center my-3">
          <hr className="flex-grow-1 m-0" />
          <span className="px-3 text-muted">Or login with email</span>
          <hr className="flex-grow-1 m-0" />
        </div>

        <form onSubmit={handleLogin} noValidate>
          <div className="mb-3">
            <input
              type="text"
              className={`form-control ${submitted && errors.email ? "border border-danger" : ""}`}
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
            {submitted && errors.email && (
              <div className="text-danger small">{errors.email}</div>
            )}
          </div>

          <div className="mb-3">
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control pe-5 ${submitted && errors.password ? "border border-danger" : ""}`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="position-absolute"
                style={{
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#888",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {submitted && errors.password && (
              <div className="text-danger small">{errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{
              border: "1px solid black",
              backgroundColor: "white",
              color: "black",
              borderRadius: "50px",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "black";
              e.currentTarget.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.color = "black";
            }}
          >
            Submit
          </button>
        </form>

        {serverError && (
          <div className="alert alert-warning mt-3 text-center">{serverError}</div>
        )}

        <div className="text-center mt-3">
          <a href="/forgot-password">Forgot Password?</a>
        </div>
        <div className="text-center mt-2">
          Don&apos;t have an account? <a href="/register">Sign up</a>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div />}>
      <LoginContent />
    </Suspense>
  );
}
