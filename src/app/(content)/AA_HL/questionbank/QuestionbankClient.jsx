// src/app/(content)/AA_HL/questionbank/QuestionbankClient.jsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "@/app/(content)/AA_HL/questionbank/page.module.css";

/**
 * Transformă o etichetă în slug sigur (fără spații, &, /, etc.)
 * ex: "Exp/Log Functions" -> "exp-log-functions"
 */
function slugify(label) {
  return label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function QuestionbankClient({ topics }) {
  const [activeIdx, setActiveIdx] = useState(0);

  const active = useMemo(() => {
    const t = topics?.[activeIdx] ?? { title: "", items: [] };
    return {
      title: t.title,
      items: (t.items ?? []).slice(0, 6), // max 6 carduri în grilă
    };
  }, [topics, activeIdx]);

  return (
    <div className={styles.qbGrid}>
      {/* MENIU STÂNGA */}
      <aside className={styles.leftRail} aria-label="Topics">
        <ul className={styles.railList}>
          {topics.map((t, i) => {
            const isActive = i === activeIdx;
            return (
              <li key={t.title}>
                <button
                  type="button"
                  className={`${styles.railItem} ${isActive ? styles.railItemActive : ""}`}
                  onClick={() => setActiveIdx(i)}
                >
                  <span className={styles.railKicker}>{`Topic ${i + 1}`}</span>
                  <span className={styles.railTitle}>{t.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* CARDURI DREAPTA */}
      <section className={styles.cardsWrap} aria-live="polite">
        <div className={styles.cardsGrid}>
          {active.items.map(({ label }) => {
            const slug = slugify(label);
            return (
              <Link key={label} href={`/AA_HL/questionbank/${slug}`} className={styles.card}>
                <div className={styles.cardInner}>
                  <div className={styles.cardTop}>
                    <div className={styles.badge}>
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0f3d37" strokeWidth="1.8">
                        <rect x="3" y="3" width="7" height="7" rx="2"></rect>
                        <rect x="14" y="3" width="7" height="7" rx="2"></rect>
                        <rect x="3" y="14" width="7" height="7" rx="2"></rect>
                        <rect x="14" y="14" width="7" height="7" rx="2"></rect>
                      </svg>
                    </div>
                  </div>

                  <div className={styles.cardTitle}>{label}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
