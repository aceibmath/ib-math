// src/components/flashcards/deck/ChoicesPanel.jsx
"use client";

import Link from "next/link";
import styles from "./deck.module.css";

/**
 * Props:
 *  - choices, selectedId, setSelectedId, graded, correctId
 *  - stats: { attempted, correct, total }
 *  - nav: { idx, total, goPrev, goNext }
 *  - flashcardsHref?: string   // ✅ NEW (defaults to SL)
 */
export default function ChoicesPanel({
  choices = [],
  selectedId = null,
  setSelectedId,
  graded = false,
  correctId,
  stats,
  nav,
  flashcardsHref = "/AA_SL/flashcards", // ✅ default for SL
}) {
  const isEnd = nav && nav.idx >= nav.total;

  if (isEnd) {
    return (
      <aside className={styles.rightPane}>
        <div className={styles.endCard}>
          <div className={styles.endStats}>
            <span className={styles.endAtt}>
              Attempted <b>{stats.attempted} / {stats.total}</b>
            </span>
            <span className={styles.endCor}>
              Correct <b>{stats.correct} / {stats.total}</b>
            </span>
          </div>

          <div className={styles.endNav}>
            <button
              className={styles.endArrow}
              onClick={nav.goPrev}
              aria-label="Previous question"
            >
              ←
            </button>
            <span className={styles.endLabel}>End of Deck</span>
            <span className={styles.endArrowDisabled} aria-hidden>→</span>
          </div>

          {/* ✅ configurable now */}
          <Link href={flashcardsHref} className={styles.endReturn}>
            Return to Flashcards
          </Link>
        </div>
      </aside>
    );
  }

  // normal (during deck)
  return (
    <aside className={styles.rightPane}>
      <div className={styles.statsTop}>
        <span className={styles.endAtt}>
          Attempted <b>{stats.attempted} / {stats.total}</b>
        </span>
        <span className={styles.endCor}>
          Correct <b>{stats.correct} / {stats.total}</b>
        </span>
      </div>

      <div className={styles.choiceList}>
        {choices.map((ch) => {
          let cls = styles.choiceBtn;
          if (!graded && selectedId === ch.id) cls += ` ${styles.choiceSelected}`;
          if (graded) {
            if (ch.id === correctId) cls += ` ${styles.choiceCorrect}`;
            else if (ch.id === selectedId) cls += ` ${styles.choiceWrong}`;
            else cls += ` ${styles.choiceDisabled}`;
          }
          return (
            <button
              key={ch.id}
              className={cls}
              onClick={() => !graded && setSelectedId?.(ch.id)}
              disabled={graded}
              aria-pressed={selectedId === ch.id}
            >
              <span className={styles.choiceLetter}>{ch.id}.</span>
              <span className={styles.choiceLabel}>{ch.label}</span>
            </button>
          );
        })}
      </div>

      {nav && nav.idx < nav.total && (
        <div className={styles.navRowRight}>
          <button
            className={styles.navArrow}
            onClick={nav.goPrev}
            disabled={nav.idx === 0}
            aria-label="Previous"
          >
            ←
          </button>

          <span className={styles.navCounterRight}>
            {nav.idx + 1} / {nav.total}
          </span>

          <button
            className={styles.navArrow}
            onClick={nav.goNext}
            disabled={false}
            aria-label="Next"
          >
            →
          </button>
        </div>
      )}
    </aside>
  );
}
