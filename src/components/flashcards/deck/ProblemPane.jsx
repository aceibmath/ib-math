// src/components/flashcards/deck/ProblemPane.jsx
"use client";

import styles from "./deck.module.css";

/**
 * Props:
 *  - index: number (0-based)
 *  - prompt: string (HTML/MD already prepared)
 *  - solution: string (HTML/MD already prepared)
 *  - mode: 'question' | 'split' | 'solution'
 *  - onModeChange: (nextMode) => void
 */
export default function ProblemPane({
  index = 0,
  prompt = "",
  solution = "",
  mode = "question",
  onModeChange,
}) {
  const qNo = index + 1;

  const toQuestion = () => onModeChange?.("question");
  const toSplit = () => onModeChange?.("split");
  const toSolution = () => onModeChange?.("solution");

  const showingMS = mode === "split" || mode === "solution";

  return (
    <div className={styles.problemCard}>
      {/* HEADER: stânga titlul, centru controalele, dreapta gol */}
      <header className={styles.cardHeader}>
        <div className={styles.headerLeft}>Question {qNo}</div>

        <div className={styles.headerCenter}>
          {mode === "question" && (
            <button
              type="button"
              className={styles.markBtnCenter}
              onClick={toSplit}
            >
              Mark Scheme
            </button>
          )}

          {mode === "split" && (
            <div className={styles.headerCenter}>
              {/* ←: MS full */}
              <button
                type="button"
                className={styles.arrowBtn}
                onClick={toSolution}
                title="Mark Scheme – full width"
                aria-label="Open Mark Scheme full"
              >
                ←
              </button>

              {/* ×: back to question */}
              <button
                type="button"
                className={styles.closeBtn}
                onClick={toQuestion}
                title="Close Mark Scheme"
                aria-label="Close Mark Scheme"
              >
                ×
              </button>

              {/* →: back to question */}
              <button
                type="button"
                className={styles.arrowBtn}
                onClick={toQuestion}
                title={`Question ${qNo} – full width`}
                aria-label="Show question full"
              >
                →
              </button>
            </div>
          )}

          {mode === "solution" && (
            <div className={styles.headerCenter}>
              {/* ←: disabled în MS full (ca în questionbank) */}
              <button
                type="button"
                className={styles.arrowBtn}
                disabled
                aria-disabled="true"
                title="Mark Scheme – full width"
                style={{ opacity: 0.35, cursor: "default" }}
              >
                ←
              </button>

              {/* ×: back to question */}
              <button
                type="button"
                className={styles.closeBtn}
                onClick={toQuestion}
                title="Close Mark Scheme"
                aria-label="Close Mark Scheme"
              >
                ×
              </button>

              {/* →: back to split */}
              <button
                type="button"
                className={styles.arrowBtn}
                onClick={toSplit}
                title="Mark Scheme – split view"
                aria-label="Back to split view"
              >
                →
              </button>
            </div>
          )}
        </div>

        <div className={styles.headerRight} />
      </header>

      {/* BODY pe înălțime fixă + scroll intern */}
      <div className={styles.cardBody}>
        {mode === "question" && (
          <div
            className={styles.scrollArea}
            dangerouslySetInnerHTML={{ __html: asHTML(prompt) }}
          />
        )}

        {mode === "split" && (
          <div className={styles.splitWrap}>
            <div className={styles.splitCol}>
              <div
                className={styles.scrollArea}
                dangerouslySetInnerHTML={{ __html: asHTML(prompt) }}
              />
            </div>
            <div className={styles.vLine} />
            <div className={styles.splitCol}>
              <div
                className={styles.scrollArea}
                dangerouslySetInnerHTML={{
                  __html: asHTML(solution || "<i>No mark scheme.</i>"),
                }}
              />
            </div>
          </div>
        )}

        {mode === "solution" && (
          <div
            className={styles.scrollArea}
            dangerouslySetInnerHTML={{
              __html: asHTML(solution || "<i>No mark scheme.</i>"),
            }}
          />
        )}
      </div>
    </div>
  );
}

function asHTML(x) {
  if (!x) return "";
  const looksHTML =
    /<\/?[a-z][\s\S]*>/i.test(x) || x.includes("\\(") || x.includes("\\[");
  if (looksHTML) return x;
  return x.replace(/\n/g, "<br />");
}
