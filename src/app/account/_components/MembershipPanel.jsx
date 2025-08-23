// src/app/account/_components/MembershipPanel.jsx
"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/config";

//* ---------- helpers ---------- */
function formatDate(dIso) {
  if (!dIso) return "N/A";
  const t = Date.parse(dIso);
  if (!isFinite(t)) return "N/A";
  const d = new Date(t);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
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
            : [
                {
                  id: "free",
                  name: "Free Membership",
                  tier: "free",
                  status: "active",
                  currentPeriodEnd: null,
                },
              ]
        );
      } catch (e) {
        console.error("[membership-from-entitlements] error:", e);
        setRows([
          {
            id: "free",
            name: "Free Membership",
            tier: "free",
            status: "active",
            currentPeriodEnd: null,
          },
        ]);
      } finally {
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  return (
    <section className="acct-membership">
      <h2 className="mb-1">Membership</h2>
      <p className="text-muted mb-4">Your memberships and access levels.</p>

      <div className="table-responsive">
        <table className="table align-middle mship-table">
          <thead>
            <tr>
              <th className="text-muted fw-semibold">Product</th>
              <th className="text-muted fw-semibold">Status</th>
              <th className="text-muted fw-semibold">Expiration Date</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={3} className="text-muted">
                  Loading…
                </td>
              </tr>
            )}

            {!loading && rows.length === 0 && (
              <tr>
                <td colSpan={3} className="text-muted">
                  No memberships found.
                </td>
              </tr>
            )}

            {!loading &&
              rows.map((it) => (
                <tr key={it.id}>
                  <td>
                    <div className="prod">{it.name}</div>
                    <div className={it.tier === "premium" ? "tier red" : "tier gray"}>
                      {it.tier === "premium" ? "Premium" : "Free"}
                    </div>
                  </td>
                  <td>
                    <span className={`pill ${it.status}`}>
                      {it.status === "active"
                        ? "Active"
                        : it.status === "expired"
                        ? "Expired"
                        : "Trial"}
                    </span>
                  </td>
                  <td className="text-nowrap">
                    {it.tier === "free" ? "N/A" : formatDate(it.currentPeriodEnd)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .mship-table { border-collapse: separate; border-spacing: 0 12px; }
        .mship-table thead th { font-size: 0.95rem; }
        .prod { font-weight: 700; color: #0a2240; }
        .tier { font-weight: 600; font-size: 0.92rem; }
        .tier.red { color: #c1121f; }
        .tier.gray { color: #6b7280; }

        .pill {
          display: inline-block;
          border-radius: 9999px;
          padding: 6px 12px;
          font-weight: 700;
          font-size: 0.9rem;
          line-height: 1;
        }
        .pill.active  { background: #2ecc71; color: #fff; }
        .pill.expired { background: #e74c3c; color: #fff; }
        .pill.trial   { background: #f1c40f; color: #0a2240; }
      `}</style>
    </section>
  );
}
