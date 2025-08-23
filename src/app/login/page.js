"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const { user, loginWithGoogle, loginWithEmail, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

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

  // ✅ după ce user-ul e logat și email-ul e verificat → mergem la /verify (sau ?next=)
  useEffect(() => {
    if (!user) return;
    if (!user.emailVerified) {
      alert("Please verify your email before logging in.");
      logout();
      return;
    }
    const next = searchParams.get("next") || "/verify";
    router.replace(next);
  }, [user, logout, router, searchParams]);

  return (
    <div
      className="container d-flex justify-content-center align-items-start"
      style={{ minHeight: "100vh", marginTop: "30px" }}
    >
      <div
        className="card shadow p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="text-center mb-4">Login</h3>

        <button
          onClick={loginWithGoogle}
          className="btn w-100 mb-3"
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
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google logo"
            style={{ width: "20px", marginRight: "8px" }}
          />
          Login with Google
        </button>

        <div className="text-center text-muted my-3">Or login with email</div>

        <form onSubmit={handleLogin} noValidate>
          <div className="mb-3">
            <input
              type="text"
              className={`form-control ${
                submitted && errors.email ? "border border-danger" : ""
              }`}
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
                className={`form-control pe-5 ${
                  submitted && errors.password ? "border border-danger" : ""
                }`}
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
            Login
          </button>
        </form>

        {serverError && (
          <div className="alert alert-warning mt-3 text-center">
            {serverError}
          </div>
        )}

        <div className="text-center mt-3">
          <a href="/forgot-password">Forgot Password?</a>
        </div>

        <div className="text-center mt-2">
          Don't have an account? <a href="/register">Sign up</a>
        </div>
      </div>
    </div>
  );
}
