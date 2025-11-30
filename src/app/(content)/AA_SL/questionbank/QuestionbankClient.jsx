// src/app/(content)/AA_SL/questionbank/QuestionbankClient.jsx
"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import styles from "@/app/(content)/AA_SL/questionbank/page.module.css";

/**
 * Override de etichete pentru câteva subtopicuri AA SL.
 * Afișăm noile denumiri, dar păstrăm labelul original pentru slug/URL.
 */
const LABEL_OVERRIDES = {
  // Topic 1
  "Exponents & Logarithms": "Exponents & Logs",

  // Topic 2
  "Introducing Functions": "Function Properties",
  "Quadratic Equations and Functions": "Quadratics",
  "Exponential and Logarithmic Functions": "Exp & Log Functions",
  "Transformations of Functions": "Transformations",

  // Topic 3
  "Geometry and Trigonometry in 2D and 3D": "Geo & Trig in 2D & 3D",
  "Geometry & Trigonometry in 2D and 3D": "Geo & Trig in 2D & 3D",
  "Trigonometric Functions": "Trig Functions",
};

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
        {/* Headerul “Topic X — …” a fost eliminat, cum ai cerut */}
        <div className={styles.cardsGrid}>
          {active.items.map(({ label }) => {
            const slug = encodeURIComponent(label.toLowerCase().replace(/\s+/g, "-"));
            const displayLabel = LABEL_OVERRIDES[label] ?? label;

            return (
              <Link key={label} href={`/AA_SL/questionbank/${slug}`} className={styles.card}>
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

                  <div className={styles.cardTitle}>{displayLabel}</div>
                  {/* descrierea a fost eliminată */}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
