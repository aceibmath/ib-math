// src/app/account/billing/page.js
"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/config";

/* ----------------------------- utils ----------------------------- */
function fmtAmount(cents, currency = "usd") {
  if (typeof cents !== "number") return "-";
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(cents / 100);
  } catch {
    return cents;
  }
}

function Badge({ status }) {
  const s = (status || "").toLowerCase();
  const cls =
    s === "paid"
      ? "badge bg-success"
      : s === "open"
      ? "badge bg-warning text-dark"
      : "badge bg-secondary";
  return <span className={cls} style={{ textTransform: "uppercase" }}>{status || "-"}</span>;
}

/* ----------------------------- page ----------------------------- */
export default function BillingPage() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [data, setData] = useState({ invoices: [] });

  // ✅ alertă după redirecționarea din Checkout (?success=1)
  const [showSuccess, setShowSuccess] = useState(false);
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("success") === "1") setShowSuccess(true);
  }, []);

  async function getInvoices(u) {
    setLoading(true);
    setErr("");
    try {
      const idToken = await u.getIdToken();
      const res = await fetch("/api/billing/history", {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const payload = res.ok
        ? await res.json()
        : { error: `Unexpected response (${res.status})` };

      if (!res.ok) throw new Error(payload?.error || "Request failed");
      setData(payload);
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
    <div className="p-3">
      <h5 className="mb-3">Billing</h5>

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
        <div className="table-responsive">
          <table className="table align-middle table-hover">
            <thead className="table-light">
              <tr className="text-muted small">
                <th scope="col">Date</th>
                <th scope="col">Invoice #</th>
                <th scope="col">Product</th>
                <th scope="col">Status</th>
                <th scope="col" className="text-end">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.invoices.map((inv) => {
                const created = inv.created
                  ? new Date(inv.created).toLocaleDateString()
                  : "-";

                const product =
                  inv.product_label || inv.productKey || inv.priceId || "—";

                const isPaid = String(inv.status).toLowerCase() === "paid";
                const amount = isPaid ? inv.amount_paid : (inv.amount_due ?? inv.amount_total ?? 0);

                const openView = () => {
                  const url = inv.hosted_invoice_url || inv.receipt_url || inv.view_url;
                  if (url) window.open(url, "_blank");
                };

                return (
                  <tr key={inv.id} role="button" onClick={openView} title="Open invoice">
                    <td className="text-nowrap">{created}</td>
                    <td className="text-nowrap">{inv.number || inv.id}</td>
                    <td>{product}</td>
                    <td><Badge status={inv.status} /></td>
                    <td className="text-end">{fmtAmount(amount, inv.currency)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
