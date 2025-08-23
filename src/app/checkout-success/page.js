"use client";

import { Container, Card, Button } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function CheckoutSuccess() {
  const router = useRouter();

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card className="p-5 shadow-sm text-center" style={{ borderRadius: "12px", maxWidth: "600px" }}>
        {/* Iconă succes */}
        <FaCheckCircle size={60} style={{ color: "green", marginBottom: "20px" }} />

        {/* Titlu */}
        <h2 style={{ color: "#D32F2F", fontWeight: "bold" }}>Payment Successful!</h2>

        {/* Mesaj */}
        <p className="mt-3" style={{ fontSize: "1.1rem" }}>
          Thank you for subscribing to <strong>AceIBMath Premium</strong>.  
          Your payment has been processed successfully, and your premium access is now active.
        </p>

        {/* Buton acces dashboard */}
        <Button
          variant="warning"
          size="lg"
          className="mt-4 fw-bold"
          style={{ color: "#000", border: "none" }}
          onClick={() => router.push("/dashboard")}
        >
          Go to Dashboard
        </Button>

        {/* Buton pentru a vedea cursurile */}
        <Button
          variant="outline-dark"
          size="lg"
          className="mt-3 fw-bold"
          onClick={() => router.push("/lessons")}
        >
          View Lessons
        </Button>
      </Card>
    </Container>
  );
}
