// src/app/account/page.js 
"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { updateProfile, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import { Container, Row, Col, Form, Button, Nav, Alert } from "react-bootstrap";

// Panouri existente
import BillingPage from "./billing/page";
// ⬇️ import static pentru MembershipPanel (elimină așteptarea chunk-ului)
import MembershipPanel from "./_components/MembershipPanel";
const SecurityTab = dynamic(() => import("@/components/account/SecurityTab"), {
  ssr: false,
});

export default function AccountPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState("personal");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  // —— helper: separă displayName în first/last
  const splitName = (displayName) => {
    if (!displayName) return ["", ""];
    const parts = displayName.trim().split(/\s+/);
    if (parts.length === 1) return [parts[0], ""];
    return [parts[0], parts.slice(1).join(" ")];
  };

  // ——— Setează tab-ul inițial din ?tab=
  useEffect(() => {
    const t = (searchParams?.get("tab") || "").toLowerCase();
    const allowed = ["personal", "security", "membership", "billing"];
    if (allowed.includes(t)) setActiveTab(t);
  }, [searchParams]);

  // ——— Helper pentru a schimba tab-ul și a sincroniza URL-ul
  const setTab = (t) => {
    setActiveTab(t);
    router.replace(`?tab=${t}`, { scroll: false });
  };

  // ——— La încărcare/refresh: așteptăm user-ul prin onAuthStateChanged
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const [fn, ln] = splitName(user.displayName || "");
        setFirstName(fn || "");
        setLastName(ln || "");
        setEmail(user.email || "");
      } else {
        setFirstName("");
        setLastName("");
        setEmail("");
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleSavePersonalInfo = async () => {
    if (!auth.currentUser) return;
    try {
      const newDisplayName = `${firstName} ${lastName}`.trim();
      await updateProfile(auth.currentUser, { displayName: newDisplayName });
      setSuccessMessage("Personal information updated successfully!");
    } catch {
      setSuccessMessage("Failed to update profile.");
    } finally {
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  // ——— Inițiale pentru badge (ex: "LC")
  const initials = useMemo(() => {
    const nameForInitials = `${firstName} ${lastName}`.trim() || email || "";
    const words = nameForInitials
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    if (words.length === 0) return "";
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  }, [firstName, lastName, email]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return (
          <div className="personal-wrap">
            <h3 className="section-title mb-3">Personal Info</h3>

            {/* Chip cu badge + nume */}
            <div className="user-chip mb-4">
              <div className="avatar-badge" aria-hidden="true">
                {initials}
              </div>
              <div className="fullname">
                {firstName || lastName
                  ? `${firstName} ${lastName}`.trim()
                  : email || ""}
              </div>
            </div>

            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <Form>
              <Row className="g-3">
                <Col xs={12} md={6}>
                  <Form.Label>
                    First Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
                <Col xs={12} md={6}>
                  <Form.Label>
                    Last Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Col>
                <Col xs={12}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    readOnly
                    className="no-dim"
                  />
                </Col>
                <Col xs={12} className="d-flex mt-2">
                  <Button
                    type="button"
                    className="btn-cta btn-212 ms-auto"
                    onClick={handleSavePersonalInfo}
                  >
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
            <h3 className="section-title mb-2">Reset password</h3>
            <p className="mb-3">
              To reset your password, click the button below and follow the
              instructions.
            </p>
            <div className="mb-5">
              <Button
                className="btn-cta btn-212"
                onClick={() => router.push("/forgot-password")}
              >
                Reset Password
              </Button>
            </div>
            <SecurityTab />
          </div>
        );

      case "membership":
        return (
          <div className="membership-wrap">
            <MembershipPanel />
          </div>
        );

      case "billing":
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
    <Container fluid>
      <Row className="account-row">
        {/* COL STÂNGA — meniu păstrat */}
        <Col sm={3} className="left-rail p-4">
          <h2 className="sidebar-title mb-4">Account Settings</h2>
          <Nav className="flex-column gap-4">
            <Nav.Link
              href="#"
              className={`pill-outline ${activeTab === "personal" ? "is-active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setTab("personal");
              }}
            >
              Personal Info
            </Nav.Link>

            <Nav.Link
              href="#"
              className={`pill-outline ${activeTab === "security" ? "is-active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setTab("security");
              }}
            >
              Password & Security
            </Nav.Link>

            <Nav.Link
              href="#"
              className={`pill-outline ${activeTab === "membership" ? "is-active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setTab("membership");
              }}
            >
              Membership
            </Nav.Link>

            <Nav.Link
              href="#"
              className={`pill-outline ${activeTab === "billing" ? "is-active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setTab("billing");
              }}
            >
              Billing
            </Nav.Link>
          </Nav>
        </Col>

        {/* CONȚINUT DREAPTA — toate tab-urile la +24px sub header */}
        <Col sm={9} className="right-pane">{renderTabContent()}</Col>
      </Row>

      {/* STILURI GLOBALE */}
      <style jsx global>{`
        :root {
          /* verde deschis-albăstrui pentru coloana din stânga */
          --voronet: #e9f6f3;
          --cta-bg: #0f3d37; /* verde închis-albăstrui pentru butoane */
          --text-dark: #111111;
          --left-rail-w: 260px;
          --ace-red: #dc3545; /* păstrat pentru alte componente, nu folosit la badge */
        }

        .account-row {
          position: relative;
        }
        @media (min-width: 576px) {
          .account-row::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            width: var(--left-rail-w);
            background: var(--voronet);
            z-index: 0;
          }
        }

        .left-rail {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          background: var(--voronet);
        }
        @media (min-width: 576px) {
          .left-rail {
            background: transparent;
            flex: 0 0 var(--left-rail-w) !important;
            width: var(--left-rail-w) !important;
            max-width: var(--left-rail-w) !important;
          }
        }

        /* ✅ Spațiere unitară sub header pentru toate tab-urile din dreapta */
        .right-pane { padding-top: 24px; }
        /* ✅ Neutralizează orice padding/margine de început care ar dubla spațiul */
        .right-pane > :first-child,
        .personal-wrap,
        .security-wrap,
        .membership-wrap,
        .billing-host { margin-top: 0 !important; padding-top: 0 !important; }
        .personal-wrap > :first-child,
        .security-wrap > :first-child,
        .membership-wrap > :first-child,
        .billing-host > :first-child { margin-top: 0 !important; }

        .sidebar-title {
          font-weight: 400;
          font-size: 26px;
          line-height: 1.2;
          margin: 0 0 1rem 0;
          white-space: nowrap;
          color: #111;
          text-align: center;
        }

        /* titluri în panoul din dreapta cu același look ca "Account Settings" */
        .section-title {
          font-weight: 400;
          font-size: 26px;
          line-height: 1.2;
          color: #111;
          margin: 0 0 1rem 0;
        }

        /* === Butoanele pilă din stânga (mai subțiri + culori noi) === */
        .pill-outline {
          display: inline-block !important;
          padding: 8px 18px !important; /* mai subțire */
          border-radius: 9999px;
          border: 2px solid transparent !important;
          background: var(--cta-bg) !important; /* verde închis-albăstrui */
          color: #fff !important;
          font-weight: 600;
          text-decoration: none !important;
          transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
        }
        .pill-outline:hover,
        .pill-outline.is-active {
          background: #000 !important;  /* activ/hover: negru */
          color: #fff !important;
          border-color: #000 !important;
        }

        .personal-wrap { max-width: 900px; }
        .personal-wrap .form-control { border-radius: 12px; }

        /* Chip: badge rotund + nume (micșorat + culoare cta) */
        .user-chip {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .avatar-badge {
          width: 64px;   /* micșorat */
          height: 64px;  /* micșorat */
          min-width: 64px;
          border-radius: 9999px;
          background: var(--cta-bg);  /* verde închis-albăstrui */
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 400;
          font-size: 24px; /* proporțional cu dimensiunea mai mică */
          letter-spacing: 0.5px;
          text-transform: uppercase;
          line-height: 1;
        }
        .fullname {
          font-size: 26px;
          line-height: 1.2;
          font-weight: 400;
          color: #111;
        }

        /* email read-only: gri deschis, clar */
        .no-dim[readonly] {
          background: #f3f4f6 !important;
          color: #111 !important;
          opacity: 1 !important;
          cursor: not-allowed !important;
          border-color: #e5e7eb !important;
        }

        /* Titluri uniforme în sub-componente */
        .security-wrap h1,
        .security-wrap h2,
        .security-wrap h3,
        .security-wrap h4,
        .security-wrap h5,
        .security-wrap h6 {
          font-weight: 400 !important;
          font-size: 26px !important;
          line-height: 1.2 !important;
          color: #111 !important;
          margin-top: 0;
        }

        .billing-host h1,
        .billing-host h2,
        .billing-host h3,
        .billing-host h4,
        .billing-host h5,
        .billing-host h6 {
          font-weight: 400 !important;
          font-size: 26px !important;
          line-height: 1.2 !important;
          color: #111 !important;
          margin: 0 0 1rem 0;
        }

        .membership-wrap h1,
        .membership-wrap h2,
        .membership-wrap h3,
        .membership-wrap h4,
        .membership-wrap h5,
        .membership-wrap h6 {
          font-weight: 400 !important;
          font-size: 26px !important;
          line-height: 1.2 !important;
          color: #111 !important;
          margin: 0 0 1rem 0 !important;
        }

        /* === NOUL stil pentru butoanele CTA (Save / Reset Password) === */
        .btn-cta {
          border-radius: 9999px;
          padding: 8px 18px;              /* mai subțire */
          font-weight: 600;
          border: 2px solid transparent;
          background: var(--cta-bg);
          color: #fff;
          transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
          display: inline-block;
          text-align: center;
        }
        .btn-cta:hover,
        .btn-cta:active,
        .btn-cta:focus {
          background: #000 !important;
          color: #fff !important;
          border-color: #000 !important;
        }
        .btn-212 {
          width: 212px;
          max-width: 100%;
        }

        /* Păstrăm stilul .btn-invert pentru alte locuri care îl folosesc deja */
        .btn-invert {
          border-radius: 9999px;
          padding: 12px 18px;
          font-weight: 600;
          border: 3px solid #000;
          background: #fff;
          color: #000;
          transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
          display: inline-block;
          text-align: center;
        }
        .btn-invert:hover,
        .btn-invert:active,
        .btn-invert:focus {
          background: #000 !important;
          color: #fff !important;
          border-color: #000 !important;
        }

        .billing-host { width: 100%; }
      `}</style>
    </Container>
  );
}
