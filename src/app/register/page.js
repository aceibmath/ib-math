"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterPage() {
  const { registerWithEmail, loginWithGoogle } = useAuth();
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [errorType, setErrorType] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!email.includes("@") || !email.includes("."))
      newErrors.email = "Enter a valid email.";
    if (!password.trim()) newErrors.password = "Password is required.";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setErrorType(null);

    if (!validate()) return;

    const res = await registerWithEmail(email, password, firstName, lastName);

    if (res.success) {
      router.push("/check-email");
    } else if (res.error === "email-already-in-use") {
      setErrorType("email-exists");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-start"
      style={{ minHeight: "100vh", marginTop: "30px" }}
    >
      <div
        className="card shadow p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="text-center mb-4">Register</h3>

        {/* Google Sign-up */}
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
          Sign up with Google
        </button>

        {errorType !== "email-exists" && (
          <form onSubmit={handleSubmit} noValidate>
            {/* First Name */}
            <div className="mb-3">
              <input
                type="text"
                className={`form-control ${
                  submitted && errors.firstName ? "border border-danger" : ""
                }`}
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {submitted && errors.firstName && (
                <div className="text-danger small">{errors.firstName}</div>
              )}
            </div>

            {/* Last Name */}
            <div className="mb-3">
              <input
                type="text"
                className={`form-control ${
                  submitted && errors.lastName ? "border border-danger" : ""
                }`}
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {submitted && errors.lastName && (
                <div className="text-danger small">{errors.lastName}</div>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <input
                type="email"
                className={`form-control ${
                  submitted && errors.email ? "border border-danger" : ""
                }`}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {submitted && errors.email && (
                <div className="text-danger small">{errors.email}</div>
              )}
            </div>

            {/* Password */}
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

            {/* Register button */}
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
              Register
            </button>
          </form>
        )}

        {errorType === "email-exists" && (
          <div
            className="p-3 mt-3 text-center"
            style={{
              backgroundColor: "#fff3cd",
              borderRadius: "8px",
            }}
          >
            <p className="mb-3">This email is already registered.</p>

            <button
              onClick={() => router.push("/login")}
              className="btn w-100 mb-2"
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

            <button
              onClick={() => router.push("/forgot-password")}
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
              Forgot Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
