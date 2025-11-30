"use client";

export default function PasswordResetSuccessPage() {
  return (
    <div
      className="container d-flex justify-content-center align-items-start"
      style={{ marginTop: "30px" }}
    >
      <div
        className="card shadow p-4 text-center"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        {/* Icon mare de succes */}
        <div
          className="d-flex justify-content-center align-items-center mb-3"
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#28a745",
            color: "white",
            fontSize: "30px",
            margin: "0 auto"
          }}
        >
          ✓
        </div>

        {/* Mesaj de confirmare */}
        <h5 className="mb-2">Password Reset Successful</h5>
        <p className="text-muted" style={{ fontSize: "0.9rem" }}>
          Your password has been updated successfully.
          You can now log in using your new password.
        </p>

        {/* Buton spre Login */}
        <a
          href="/login"
          className="btn btn-outline-dark w-100 rounded-pill mt-3"
        >
          Go to Login
        </a>
      </div>

      <style jsx>{`
        a:hover {
          background-color: #000 !important;
          color: #fff !important;
          border-color: #000 !important;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}
