"use client";

import { Container, Card, Button } from "react-bootstrap";
import { FaTimesCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function CheckoutCancel() {
  const router = useRouter();

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card
        className="p-5 shadow-sm text-center"
        style={{ borderRadius: "12px", maxWidth: "600px" }}
      >
        {/* Iconă eșec */}
        <FaTimesCircle size={60} style={{ color: "red", marginBottom: "20px" }} />

        {/* Titlu */}
        <h2 style={{ color: "#D32F2F", fontWeight: "bold" }}>Payment Cancelled</h2>

        {/* Mesaj */}
        <p className="mt-3" style={{ fontSize: "1.1rem" }}>
          Your payment has been cancelled. No charges have been made to your account.
        </p>

        {/* Buton pentru a reîncerca */}
        <Button
          variant="warning"
          size="lg"
          className="mt-4 fw-bold"
          style={{ color: "#000", border: "none" }}
          onClick={() => router.push("/membership")}
        >
          Try Again
        </Button>

        {/* Buton pentru a reveni la pagina principală */}
        <Button
          variant="outline-dark"
          size="lg"
          className="mt-3 fw-bold"
          onClick={() => router.push("/")}
        >
          Go to Homepage
        </Button>
      </Card>
    </Container>
  );
}
