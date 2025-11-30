// src/app/(content)/AI_SL/questionbank/QuestionbankClient.jsx
"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import styles from "@/app/(content)/AI_SL/questionbank/page.module.css";

// aceeași regulă de slug ca în [subtopic]/page.js
function slugify(label) {
  return label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// (opțional) mic polish la etichete afișate în UI
const LABEL_OVERRIDES = {
  "Number skills": "Number Skills",
  "Linear Equations & Graphs": "Linear Equations & Graphs",
  "Applications of Functions": "Applications of Functions",
  "Properties of Functions": "Properties of Functions",
};

export default function QuestionbankClient({ topics }) {
  const [activeIdx, setActiveIdx] = useState(0);

  const active = useMemo(() => {
    const t = topics?.[activeIdx] ?? { title: "", items: [] };
    return {
      title: t.title,
      items: (t.items ?? []).slice(0, 6),
    };
  }, [topics, activeIdx]);

  return (
    <div className={styles.qbGrid}>
      {/* stânga: Topic 1... Topic 5 */}
      <aside className={styles.leftRail} aria-label="Topics">
        <ul className={styles.railList}>
          {topics.map((t, i) => (
            <li key={t.title}>
              <button
                type="button"
                className={`${styles.railItem} ${i === activeIdx ? styles.railItemActive : ""}`}
                onClick={() => setActiveIdx(i)}
              >
                <span className={styles.railKicker}>{`Topic ${i + 1}`}</span>
                <span className={styles.railTitle}>{t.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* dreapta: cardurile subtopicurilor din topic-ul activ */}
      <section className={styles.cardsWrap} aria-live="polite">
        <div className={styles.cardsGrid}>
          {active.items.map(({ label }) => {
            const displayLabel = LABEL_OVERRIDES[label] ?? label;
            const slug = slugify(displayLabel); // <- AICI e schimbarea importantă

            return (
              <Link
                key={label}
                href={`/AI_SL/questionbank/${slug}`}
                className={styles.card}
              >
                <div className={styles.cardInner}>
                  <div className={styles.cardTop}>
                    <div className={styles.badge}>
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#0f3d37"
                        strokeWidth="1.8"
                      >
                        <rect x="3" y="3" width="7" height="7" rx="2"></rect>
                        <rect x="14" y="3" width="7" height="7" rx="2"></rect>
                        <rect x="3" y="14" width="7" height="7" rx="2"></rect>
                        <rect x="14" y="14" width="7" height="7" rx="2"></rect>
                      </svg>
                    </div>
                  </div>

                  <div className={styles.cardTitle}>{displayLabel}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
