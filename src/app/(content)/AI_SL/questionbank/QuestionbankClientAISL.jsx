"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function QuestionbankClientAISL() {
  const topics = [
    {
      title: "Number & Algebra",
      items: [
        { label: "Number Skills", slug: "number-skills" },
        { label: "Sequences & Series", slug: "sequences-series" },
        { label: "Financial Mathematics", slug: "financial-mathematics" },
        { label: "Systems of Linear Equations", slug: "systems-of-linear-equations" },
      ],
    },
    {
      title: "Functions",
      items: [
        { label: "Linear Equations & Graphs", slug: "linear-graphs" },
        { label: "Applications of Functions", slug: "applications-functions" },
        { label: "Properties of Functions", slug: "properties-functions" },
      ],
    },
    {
      title: "Geometry & Trigonometry",
      items: [
        { label: "Shape and Space", slug: "shape-space" },
        { label: "Trigonometric Functions", slug: "trig-functions" },
      ],
    },
    {
      title: "Statistics & Probability",
      items: [
        { label: "Descriptive Statistics", slug: "descriptive-statistics" },
        { label: "Probability", slug: "probability" },
      ],
    },
    {
      title: "Calculus",
      items: [
        { label: "Differentiation", slug: "differentiation" },
        { label: "Integration", slug: "integration" },
      ],
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const active = topics[activeIndex];

  return (
    <div className={styles.qbGrid}>
      {/* Coloana stânga — Topics */}
      <aside className={styles.leftRail} aria-label="Topics">
        <ul className={styles.railList}>
          {topics.map((t, i) => (
            <li key={t.title}>
              <button
                type="button"
                className={`${styles.railItem} ${i === activeIndex ? styles.railItemActive : ""}`}
                onClick={() => setActiveIndex(i)}
              >
                <span className={styles.railKicker}>Topic {i + 1}</span>
                <span className={styles.railTitle}>{t.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Coloana dreapta — Carduri */}
      <section className={styles.cardsWrap}>
        <div className={styles.cardsGrid}>
          {active.items.map(({ label, slug }) => (
            <Link
              key={slug}
              href={`/AI_SL/questionbank/${slug}`}
              className={styles.card}
            >
              <div className={styles.cardInner}>
                <div className={styles.cardTop}>
                  <div className={styles.badge}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="#78350f"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="6" height="6" rx="1" />
                      <rect x="3" y="13" width="6" height="6" rx="1" />
                      <rect x="13" y="3" width="6" height="6" rx="1" />
                      <rect x="13" y="13" width="6" height="6" rx="1" />
                    </svg>
                  </div>
                </div>
                <div className={styles.cardTitle}>{label}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
