// src/app/membership/page.js
"use client";

import { useMemo, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import "./membership.css";

export default function MembershipPage() {
  const [selected, setSelected] = useState({ aa_sl: false, aa_hl: false });
  const [isBusy, setIsBusy] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // -------- Billing-based entitlements --------
  const [invoices, setInvoices] = useState([]);
  const [invLoading, setInvLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        setInvoices([]);
        setInvLoading(false);
        return;
      }
      try {
        setInvLoading(true);
        const idToken = await u.getIdToken();
        const res = await fetch("/api/billing/history", {
          headers: { Authorization: `Bearer ${idToken}` },
        });
        const data = await res.json();
        setInvoices(data?.invoices || []);
      } catch {
        setInvoices([]);
      } finally {
        setInvLoading(false);
      }
    });
    return () => unsub();
  }, []);

  const entitlements = useMemo(() => {
    const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
    const byProduct = {};
    (invoices || [])
      .filter((i) => String(i.status).toLowerCase() === "paid")
      .forEach((inv) => {
        const key = inv.product_id || inv.product_label || inv.priceId || inv.id;
        const createdMs = inv.created ? Date.parse(inv.created) : Date.now();
        const expiresAt = createdMs + ONE_YEAR_MS;
        const productName = inv.product_label || inv.productKey || inv.priceId || "—";
        if (!byProduct[key] || byProduct[key].expiresAt < expiresAt) {
          byProduct[key] = { productName, expiresAt };
        }
      });
    return Object.values(byProduct).map((e) => ({
      ...e,
      active: Date.now() < e.expiresAt,
    }));
  }, [invoices]);

  const courses = useMemo(
    () => ({
      aa_sl: {
        title: "IB Math AA SL — Premium",
        price: 99,
        billing: "/year",
        features: [
          "Full syllabus coverage",
          "Worked solutions",
          "Past paper walkthroughs",
          "Quizzes & checklists",
        ],
      },
      aa_hl: {
        title: "IB Math AA HL — Premium",
        price: 99,
        billing: "/year",
        features: [
          "Advanced theory & proofs",
          "Challenging problems",
          "Past paper walkthroughs",
          "Quizzes & checklists",
        ],
      },
    }),
    []
  );

  const toggleCourse = (id) => {
    setSelected((prev) => {
      const next = { aa_sl: false, aa_hl: false };
      next[id] = !prev[id];
      return next;
    });
  };

  const selectedList = Object.keys(selected).filter((k) => selected[k]);
  const total = selectedList.reduce((sum, id) => sum + courses[id].price, 0);

  const PRICE_MAP = {
    aa_sl: process.env.NEXT_PUBLIC_STRIPE_SL_PRICE_ID,
    aa_hl: process.env.NEXT_PUBLIC_STRIPE_HL_PRICE_ID,
  };
  const KEY_MAP = {
    aa_sl: "AA_SL",
    aa_hl: "AA_HL",
  };

  const handleCheckout = async () => {
    if (!selectedList.length || isBusy) return;
    setIsBusy(true);
    setErrorMsg("");

    try {
      const u = auth.currentUser;
      if (!u) {
        setErrorMsg("Please sign in before checkout.");
        setIsBusy(false);
        return;
      }
      const idToken = await u.getIdToken();
      const [first] = selectedList;
      const priceId = PRICE_MAP[first];
      const productKey = KEY_MAP[first];

      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ priceId, productKey }),
      });

      const data = await res.json();

      if (res.ok && data?.url) {
        window.location.href = data.url; // Stripe Checkout
        return;
      }
      if (res.ok && (data?.id || data?.sessionId)) {
        // în caz că preferi redirectToCheckout
      } else {
        throw new Error(data?.error || "Checkout failed");
      }
    } catch (e) {
      setErrorMsg(e.message || "Checkout failed");
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <div className="membership-page">
      {/* ===== Access summary (from invoices) ===== */}
      {!invLoading && entitlements.length > 0 && (
        <div className="alert alert-success mx-3 mt-3" role="status">
          <strong>Your access:</strong>{" "}
          {entitlements.map((e, i) => (
            <span key={i} className="me-3">
              {e.productName} —{" "}
              {e.active ? "Active" : "Expired"} (expires{" "}
              {new Date(e.expiresAt).toLocaleDateString()})
            </span>
          ))}
        </div>
      )}

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-inner">
          <h1 className="hero-title center">
            Empower your IB DP Mathematics with{" "}
            <span className="ace-red">AceIBMath Premium</span>
          </h1>
        </div>
      </section>

      {/* ===== GRID ===== */}
      <div className="membership-grid">
        {/* SL */}
        <article className={`course-card ${selected.aa_sl ? "active" : ""}`}>
          <div className="course-topbar">
            <label className="fake-radio" aria-label="Select AA SL">
              <input
                type="checkbox"
                checked={selected.aa_sl}
                onChange={() => toggleCourse("aa_sl")}
              />
              <span className="dot" aria-hidden="true" />
              <span className="course-name">{courses.aa_sl.title}</span>
            </label>
          </div>

          <header className="course-header center-price">
            <div className="course-price-line">
              <span className="price">€{courses.aa_sl.price}</span>
              <span className="per">{courses.aa_sl.billing}</span>
            </div>
          </header>

          <section className="course-body">
            <ul className="feature-list">
              {courses.aa_sl.features.map((f, idx) => (
                <li key={idx} className="feature-item">
                  <span className="check" aria-hidden="true" /> {f}
                </li>
              ))}
            </ul>
          </section>
        </article>

        {/* HL */}
        <article className={`course-card ${selected.aa_hl ? "active" : ""}`}>
          <div className="course-topbar">
            <label className="fake-radio" aria-label="Select AA HL">
              <input
                type="checkbox"
                checked={selected.aa_hl}
                onChange={() => toggleCourse("aa_hl")}
              />
              <span className="dot" aria-hidden="true" />
              <span className="course-name">{courses.aa_hl.title}</span>
            </label>
          </div>

          <header className="course-header center-price">
            <div className="course-price-line">
              <span className="price">€{courses.aa_hl.price}</span>
              <span className="per">{courses.aa_hl.billing}</span>
            </div>
          </header>

          <section className="course-body">
            <ul className="feature-list">
              {courses.aa_hl.features.map((f, idx) => (
                <li key={idx} className="feature-item">
                  <span className="check" aria-hidden="true" /> {f}
                </li>
              ))}
            </ul>
          </section>
        </article>

        {/* ===== CHECKOUT ===== */}
        <aside className="checkout-card" aria-label="Selected courses summary">
          <div className="checkout-inner">
            <button
              className="summary-row"
              onClick={() => setPanelOpen((s) => !s)}
              aria-expanded={panelOpen}
              aria-controls="checkout-panel"
            >
              <span className="summary-left">
                {selectedList.length || 0}{" "}
                {selectedList.length === 1 ? "Subject" : "Subjects"} Selected
              </span>
              <span className={`chev ${panelOpen ? "up" : "down"}`} />
            </button>

            <div
              id="checkout-panel"
              className={`panel ${panelOpen ? "open" : "closed"}`}
            >
              {!selectedList.length ? (
                <p className="checkout-empty">No course selected yet.</p>
              ) : (
                <ul className="checkout-list">
                  {selectedList.map((id) => (
                    <li key={id} className="checkout-item">
                      <div className="ci-left">
                        <span className="ci-name">{courses[id].title}</span>
                        <small className="ci-billing">{courses[id].billing}</small>
                      </div>
                      <div className="ci-right">
                        <span className="ci-price">€{courses[id].price}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="checkout-total">
              <span>Total</span>
              <span className="total-amount">€{total}</span>
            </div>

            {errorMsg ? <p className="error">{errorMsg}</p> : null}

            <button
              className="checkout-btn large"
              onClick={handleCheckout}
              disabled={!selectedList.length || isBusy}
              aria-disabled={!selectedList.length || isBusy}
              title={!selectedList.length ? "Select at least one course" : "Proceed to payment"}
            >
              {isBusy ? "Preparing secure payment…" : `Checkout — €${total || 0}`}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
