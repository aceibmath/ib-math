"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "../../firebase/config";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode");

  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!oobCode) {
      alert("Invalid or expired password reset link.");
      router.push("/forgot-password");
    }
  }, [oobCode, router]);

  const validate = () => {
    const newErrors = {};
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await confirmPasswordReset(auth, oobCode, password);
      router.push("/password-reset-success");
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Error resetting password. Please try again.");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-start"
      style={{ marginTop: "30px" }}
    >
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h5 className="text-center mb-3">Set a New Password</h5>

        <form onSubmit={handleResetPassword}>
          {/* Password input */}
          <div className="mb-3">
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control pe-5 ${errors.password ? "border border-danger" : ""}`}
                placeholder="New password"
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
                  color: "#888"
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <div className="text-danger small mt-1">{errors.password}</div>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="btn btn-outline-dark w-100 rounded-pill reset-btn"
          >
            Reset Password
          </button>
        </form>
      </div>

      <style jsx>{`
        .reset-btn:hover {
          background-color: #000 !important;
          color: #fff !important;
          border-color: #000 !important;
        }
      `}</style>
    </div>
  );
}
