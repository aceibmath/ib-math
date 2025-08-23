"use client";

export default function CheckEmailPage() {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4 text-center" style={{ maxWidth: "400px", width: "100%" }}>
        <h5 className="mb-3">Please confirm your email</h5>
        <p className="text-muted mb-4">
          We have sent a confirmation link to your email address.  
          Click it to activate your account before logging in.
        </p>
        <a
          href="/login"
          className="btn btn-light w-100 rounded-pill border"
          style={{ fontWeight: "500" }}
        >
          Go to Login
        </a>
      </div>

      <style jsx>{`
        .btn:hover {
          background-color: #000 !important;
          color: #fff !important;
          border-color: #000 !important;
        }
      `}</style>
    </div>
  );
}
