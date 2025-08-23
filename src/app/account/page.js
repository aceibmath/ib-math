// src/app/account/page.js 
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/config";
import { Container, Row, Col, Form, Button, Nav, Alert } from "react-bootstrap";

// 👉 Afișăm pagina ta existentă de billing în panoul din dreapta (fără să-i schimbăm codul)
import BillingPage from "./billing/page";

// 👉 NEW: panoul din dreapta pentru tab-ul "Membership"
import MembershipPanel from "./_components/MembershipPanel";

// 👉 NEW: 2FA UI (client-only)
const SecurityTab = dynamic(() => import("@/components/account/SecurityTab"), { ssr: false });

export default function AccountPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("personal");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const parts = user.displayName ? user.displayName.split(" ") : ["", ""];
      setFirstName(parts[0] || "");
      setLastName(parts.slice(1).join(" ") || "");
      setEmail(user.email || "");
    }
    setLoading(false);
  }, []);

  const handleSavePersonalInfo = async () => {
    if (!auth.currentUser) return;
    try {
      await updateProfile(auth.currentUser, { displayName: `${firstName} ${lastName}`.trim() });
      setSuccessMessage("Personal information updated successfully!");
    } catch {
      setSuccessMessage("Failed to update profile.");
    } finally {
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return (
          <div className="personal-wrap">
            <h3 className="mb-4">Personal Info</h3>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <Form>
              <Row className="g-3">
                <Col xs={12} md={6}>
                  <Form.Label>First Name <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </Col>
                <Col xs={12} md={6}>
                  <Form.Label>Last Name <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </Col>
                <Col xs={12}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={email} readOnly className="no-dim" />
                </Col>
                <Col xs={12} className="d-flex mt-2">
                  <Button type="button" className="btn-invert btn-212 ms-auto" onClick={handleSavePersonalInfo}>
                    Save
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        );

      case "security":
        return (
          <div className="security-wrap">
            <h3 className="section-head mb-2">Reset password</h3>
            <p className="mb-3">To reset your password, click the button below and follow the instructions.</p>
            <div className="mb-5">
              <Button className="btn-invert btn-212" onClick={() => router.push("/forgot-password")}>
                Reset Password
              </Button>
            </div>

            {/* ✅ 2FA prin e-mail — componenta nouă */}
            <SecurityTab />
          </div>
        );

      case "membership":
        // 👉 NEW: folosim componenta dedicată MembershipPanel
        return <MembershipPanel />;

      case "billing":
        // ✅ Afișăm pagina existentă de billing în panoul din dreapta
        return (
          <div className="billing-host">
            <BillingPage />
          </div>
        );

      default:
        return <p>Select a tab from the left.</p>;
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container fluid className="mt-4">
      <Row>
        {/* COL STÂNGA — meniu păstrat, FĂRĂ navigare */}
        <Col sm={3} className="left-rail p-4">
          <h2 className="sidebar-title mb-4">Account Settings</h2>
          <Nav className="flex-column gap-4">
            <Nav.Link
              href="#"
              className={`pill-outline ${activeTab === "personal" ? "is-active" : ""}`}
              onClick={(e) => { e.preventDefault(); setActiveTab("personal"); }}
            >
              Personal Info
            </Nav.Link>

            <Nav.Link
              href="#"
              className={`pill-outline ${activeTab === "security" ? "is-active" : ""}`}
              onClick={(e) => { e.preventDefault(); setActiveTab("security"); }}
            >
              Password & Security
            </Nav.Link>

            <Nav.Link
              href="#"
              className={`pill-outline ${activeTab === "membership" ? "is-active" : ""}`}
              onClick={(e) => { e.preventDefault(); setActiveTab("membership"); }}
            >
              Membership
            </Nav.Link>

            {/* ⛔️ NU navigăm către /account/billing */}
            <Nav.Link
              href="#"
              className={`pill-outline ${activeTab === "billing" ? "is-active" : ""}`}
              onClick={(e) => { e.preventDefault(); setActiveTab("billing"); }}
            >
              Billing
            </Nav.Link>
          </Nav>
        </Col>

        {/* CONȚINUT DREAPTA */}
        <Col sm={9}>{renderTabContent()}</Col>
      </Row>

      {/* STILURI GLOBALE – păstrăm look-ul tău */}
      <style jsx global>{`
        :root{
          --voronet:#dbeafe;
          --text-dark:#111111;
          --left-rail-w:260px;
          --mt4: 1.5rem;
        }

        .left-rail{
          background:var(--voronet);
          min-height:100vh;
          margin-top: calc(var(--mt4) * -1);
          padding-top: calc(var(--mt4) + 1.5rem) !important;
        }
        @media (min-width:576px){
          .left-rail{
            flex:0 0 var(--left-rail-w) !important;
            width:var(--left-rail-w) !important;
            max-width:var(--left-rail-w) !important;
          }
        }
        .sidebar-title{
          font-weight:400;
          font-size:26px;
          line-height:1.2;
          margin:0 0 1rem 0;
          white-space:nowrap;
          color:#111;
          text-align:center;
        }
        .pill-outline{
          display:inline-block !important;
          padding:12px 18px !important;
          border-radius:9999px;
          border:3px solid #111 !important;
          background:#fff !important;
          color:#111 !important;
          font-weight:600;
          text-decoration:none !important;
          transition:background .15s ease,color .15s ease,border-color .15s ease;
        }
        .pill-outline:hover,
        .pill-outline.is-active{
          background:#000 !important;
          color:#fff !important;
          border-color:#000 !important;
        }

        .personal-wrap{ max-width: 900px; }
        .personal-wrap .form-control{ border-radius: 12px; }
        .no-dim[readonly]{ background:#fff !important; color:#111 !important; opacity:1 !important; }

        .security-wrap .section-head{ font-size: 26px; font-weight: 400; line-height: 1.2; }

        .btn-invert{
          border-radius:9999px;
          padding:12px 18px;
          font-weight:600;
          border:3px solid #000;
          background:#fff;
          color:#000;
          transition:background .15s ease,color .15s ease,border-color .15s ease;
          display:inline-block;
          text-align:center;
        }
        .btn-invert:hover,
        .btn-invert:active,
        .btn-invert:focus{
          background:#000 !important;
          color:#fff !important;
          border-color:#000 !important;
        }
        .btn-212{ width:212px; max-width:100%; }

        /* Container neutru pentru billing, ca să nu-i afectăm stilul */
        .billing-host { width: 100%; }
      `}</style>
    </Container>
  );
}
