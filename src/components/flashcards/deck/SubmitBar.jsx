// src/components/flashcards/deck/SubmitBar.jsx
"use client";

import styles from "./deck.module.css";

/**
 * Props:
 *  - phase: 'idle' | 'canSubmit' | 'graded' | 'viewingSolution'
 *  - onSubmit: () => void
 *  - onViewSolution: () => void
 *  - onContinue: () => void
 *  - endOfDeck?: boolean
 *  - onRestart?: () => void
 */
export default function SubmitBar({
  phase,
  onSubmit,
  onViewSolution,
  onContinue,
  endOfDeck = false,
  onRestart,
}) {
  let label = "Submit";
  let disabled = true;
  let handler = onSubmit;

  if (endOfDeck) {
    label = "Restart Deck";
    disabled = false;
    handler = onRestart;
  } else if (phase === "canSubmit") {
    label = "Submit";
    disabled = false;
    handler = onSubmit;
  } else if (phase === "graded") {
    label = "View Solution";
    disabled = false;
    handler = onViewSolution;
  } else if (phase === "viewingSolution") {
    label = "Continue";
    disabled = false;
    handler = onContinue;
  }

  return (
    <div className={styles.submitBar}>
      <button className={styles.submitBtn} onClick={handler} disabled={disabled}>
        {label}
      </button>
    </div>
  );
}
