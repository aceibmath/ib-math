// src/app/account/_components/MembershipPanel.jsx
"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/config";

function formatDMY(dIso) {
  if (!dIso) return "N/A";
  const t = Date.parse(dIso);
  if (!isFinite(t)) return "N/A";
  const d = new Date(t);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function MembershipPanel() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        setRows([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const token = await u.getIdToken();
        const res = await fetch("/api/entitlements", {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });
        const payload = await res.json();
        const items = Array.isArray(payload?.items) ? payload.items : [];
        setRows(
          items.length
            ? items
            : [{ id: "free", name: "Free Membership", tier: "free", status: "active", currentPeriodEnd: null }]
        );
      } catch (e) {
        console.error("[membership-from-entitlements] error:", e);
        setRows([{ id: "free", name: "Free Membership", tier: "free", status: "active", currentPeriodEnd: null }]);
      } finally {
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  // ⬇️ NU afișăm nimic cât timp se încarcă (elimină tabelul mic/gol la mount)
  if (loading) return null;

  return (
    <section className="acct-membership">
      <h2 className="mb-1">Membership</h2>

      <div className="mship-wrap">
        <table className="table align-middle mship-table">
          <thead>
            <tr>
              <th className="head text-muted col-product-h">Product</th>
              <th className="head text-muted col-status-h">Status</th>
              <th className="head text-muted col-exp-h text-end">Expiration Date</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={3} className="text-muted">No memberships found.</td>
              </tr>
            )}

            {rows.map((it) => (
              <tr key={it.id} className="row-divider">
                <td className="col-product">
                  <div className="prod">{it.name}</div>
                </td>
                <td className="col-status">
                  <span className={`pill ${it.status}`}>
                    {it.status === "active" ? "Active" : it.status === "expired" ? "Expired" : "Trial"}
                  </span>
                </td>
                <td className="text-nowrap col-exp text-end">
                  {it.tier === "free" ? "N/A" : formatDMY(it.currentPeriodEnd)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        /* Aliniere și offset identice cu Billing */
        .acct-membership {
          margin: 28px 0 0 0;
          max-width: 100%;
          display: block;
        }

        /* Tabel pe lățimea conținutului (nu 100%), aliniat la stânga */
        .mship-wrap { width: auto; }
        .mship-table { width: auto !important; border-collapse: collapse; margin-top: 0; }

        /* Header mic & non-bold (match Billing) */
        .mship-table thead th { font-weight: 400 !important; font-size: 0.88rem; }
        .head { font-weight: 400 !important; }

        .prod { color: #0a2240; font-weight: 400; }

        /* Linie discretă între rânduri (match Billing) */
        .mship-table tbody tr.row-divider { border-bottom: 1px solid #e9ecef; }
        .mship-table tbody tr:last-child { border-bottom: none; }

        /* Spațiere coloane (consistentă cu Billing) */
        .col-product-h, .col-product { padding-right: 74px; }
        .col-status-h,  .col-status  { padding-right: 66px; padding-left: 6px; }
        .col-exp-h,     .col-exp     { padding-left: 6px; }

        /* Pastilă status */
        .pill {
          display: inline-block;
          border-radius: 9999px;
          padding: 6px 12px;
          font-weight: 400;
          font-size: 0.9rem;
          line-height: 1;
          color: #fff;
          background: #198754;
        }
        .pill.expired { background: #dc3545; }
        .pill.trial   { background: #0d6efd; }
      `}</style>
    </section>
  );
}
