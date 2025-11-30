// src/app/account/billing/page.js
"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/config";

/* ----------------------------- utils ----------------------------- */
function formatDMYZero(iso) {
  if (!iso) return "-";
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return "-";
  const d = new Date(t);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function StatusPill({ status }) {
  const s = String(status || "").toLowerCase();
  const bg =
    s === "paid" ? "#198754" : s === "open" ? "#0d6efd" : s === "void" ? "#6c757d" : "#6c757d";
  const label = s ? s.charAt(0).toUpperCase() + s.slice(1) : "-";
  return (
    <span className="pill" style={{ background: bg }}>
      {label}
      <style jsx>{`
        .pill {
          display: inline-block;
          border-radius: 9999px;
          padding: 6px 12px;
          font-weight: 400;
          font-size: 0.9rem;
          line-height: 1;
          color: #fff;
        }
      `}</style>
    </span>
  );
}

/* ----------------------------- page ----------------------------- */
export default function BillingPage() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [data, setData] = useState({ invoices: [] });
  const [showSuccess, setShowSuccess] = useState(false);

  // Afișează instant ultima listă din sesiune (dacă există), apoi reîmprospătează
  useEffect(() => {
    try {
      const cached = sessionStorage.getItem("billing_last");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && Array.isArray(parsed.invoices)) {
          setData(parsed);
          setLoading(false); // percepție instantanee
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const successFlag = p.get("success") === "1" || !!p.get("session_id");
    if (successFlag) {
      setShowSuccess(true);
      const url = new URL(window.location.href);
      url.searchParams.delete("success");
      url.searchParams.delete("session_id");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  async function getInvoices(u) {
    setErr("");
    try {
      const idToken = await u.getIdToken();
      const res = await fetch("/api/billing/history", {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const payload = res.ok ? await res.json() : { error: `Unexpected response (${res.status})` };
      if (!res.ok) throw new Error(payload?.error || "Request failed");
      setData(payload);
      try { sessionStorage.setItem("billing_last", JSON.stringify(payload)); } catch {}
    } catch (e) {
      setErr(e.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        setData({ invoices: [] });
        setLoading(false);
        return;
      }
      getInvoices(u);
    });
    return () => unsub();
  }, []);

  return (
    <section className="bill-panel">
      <h2 className="mb-1">Billing</h2>

      {showSuccess && (
        <div className="alert alert-success" role="status">
          Payment successful. Your invoice list has been updated.
        </div>
      )}
      {err && <div className="alert alert-danger">{err}</div>}
      {loading && <div className="text-secondary">Loading invoices…</div>}
      {!loading && data && data.invoices?.length === 0 && (
        <div className="text-secondary">No invoices yet.</div>
      )}

      {!loading && data?.invoices?.length > 0 && (
        <div className="bill-wrap">
          <table className="table align-middle bill-table">
            <thead>
              <tr>
                <th className="head text-muted col-date-h">Date</th>
                <th className="head text-muted col-number-h">Invoice #</th>
                <th className="head text-muted col-product-h">Product</th>
                <th className="head text-muted col-status-h text-end">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.invoices.map((inv) => {
                const created = inv.created ? formatDMYZero(inv.created) : "-";
                const product = inv.product_label || inv.productKey || inv.priceId || "—";
                const status = String(inv.status || "").toLowerCase();
                const openView = () => {
                  const url = inv.hosted_invoice_url || inv.receipt_url || inv.view_url;
                  if (url) window.open(url, "_blank");
                };
                return (
                  <tr key={inv.id} role="button" onClick={openView} title="Open invoice" className="row-divider">
                    <td className="text-nowrap col-date">{created}</td>
                    <td className="text-nowrap col-number">{inv.number || inv.id}</td>
                    <td className="col-product">{product}</td>
                    <td className="text-end col-status">
                      <StatusPill status={status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <style jsx>{`
        /* Aliniat la stânga (nu centrat) */
        .bill-panel {
          margin: 28px 0 0 0;
          max-width: 100%;
          display: block;
        }

        .bill-wrap { width: auto; }

        /* tabela puțin mai jos pentru aliniere cu Membership */
        .bill-table {
          width: auto !important;
          border-collapse: collapse;
          margin-top: 15px;
        }

        /* Header mic & non-bold */
        .bill-table thead th { font-weight: 400 !important; font-size: 0.88rem; }

        /* Linie discretă între rânduri */
        .bill-table tbody tr.row-divider { border-bottom: 1px solid #e9ecef; }
        .bill-table tbody tr:last-child { border-bottom: none; }

        /* Spațiere între coloane (similar Membership) */
        .col-date-h, .col-date { padding-right: 54px; }      /* Date → Invoice # */
        .col-number-h, .col-number { padding-right: 74px; }  /* Invoice # → Product */
        .col-product-h, .col-product { padding-right: 66px; }/* Product → Status */
        .col-status-h, .col-status { padding-left: 6px; }
      `}</style>
    </section>
  );
}
