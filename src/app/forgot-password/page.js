// src/app/forgot-password/page.js
"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // ✅ success message
  const [error, setError] = useState("");     // ✅ inline error
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    const res = await resetPassword(email);
    setLoading(false);

    if (res.success) {
      setMessage("✅ Password reset email sent! Please check your inbox.");
    } else {
      if (res.error === "auth/user-not-found") {
        setError("No account found with this email address.");
      } else if (res.error === "auth/invalid-email") {
        setError("Invalid email format.");
      } else {
        setError("Error sending reset email. Please try again.");
      }
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-start"
      style={{ minHeight: "100vh", marginTop: "30px" }}
    >
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">Reset Your Password</h3>
        <p className="text-center text-muted mb-4">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className={`form-control ${error ? "border border-danger" : ""}`}
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            {error && <div className="text-danger small mt-1">{error}</div>}
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{
              border: "1px solid black",
              backgroundColor: "black",
              color: "white",
              borderRadius: "50px",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.color = "black";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "black";
              e.currentTarget.style.color = "white";
            }}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && <div className="alert alert-success mt-3 text-center">{message}</div>}

        <div className="text-center mt-3">
          {/* Forțează rămânerea pe /login chiar dacă user e logat */}
          <Link href="/login?force=1" className="text-primary text-decoration-none">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
