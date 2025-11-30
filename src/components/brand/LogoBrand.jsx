// src/components/brand/LogoBrand.jsx
"use client";

export default function LogoBrand({
  sizeRem = 1.6,        // mărimea de bază
  underline = true,     // afișează accentul
  className = "",
  ariaLabel = "ace IB math",

  // controale spațiere/culori
  innerGap = 3,         // px: spațiu vertical între text și underline
  wordGap = 3,          // px: spațiu între "ace" | "IB" | "math"
  ibScale = 1.04,       // ușoară mărire pentru "IB"
  aceColor = "#000000",
  ibColor = "#d61919",
  mathColor = "#6e6e6e",
}) {
  const base = sizeRem;

  const commonStyle = {
    fontSize: `${base}rem`,
    lineHeight: 1,
  };

  return (
    <div
      className={`d-flex flex-column align-items-start ${className}`}
      aria-label={ariaLabel}
      style={{ gap: innerGap }}
    >
      {/* ATENȚIE: gap: wordGap (fără =0) */}
      <div className="d-flex align-items-baseline" style={{ gap: wordGap }}>
        <span
          style={{
            ...commonStyle,
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontWeight: 300,
            letterSpacing: "0.015em",
            color: aceColor,        // ← negru
          }}
        >
          ace
        </span>

        <span
          style={{
            ...commonStyle,
            fontFamily: '"Comic Sans MS","Comic Sans",cursive',
            fontWeight: 700,
            fontSize: `${base * ibScale}rem`,
            letterSpacing: "0.01em",
            color: ibColor,         // roșu
          }}
        >
          IB
        </span>

        <span
          style={{
            ...commonStyle,
            fontFamily: "Georgia, serif",
            fontWeight: 300,
            letterSpacing: "0.03em",
            color: mathColor,       // gri
          }}
        >
          math
        </span>
      </div>

      {underline && (
        <div
          aria-hidden="true"
          style={{
            width: `${base * 8}rem`,
            height: Math.max(base * 0.12, 0.18) + "rem",
            background:
              "linear-gradient(90deg, rgba(0,0,0,0) 0%, #d61919 45%, rgba(0,0,0,0) 100%)",
            borderRadius: 999,
            opacity: 0.28,
            transform: "translateY(-2px)",
          }}
        />
      )}
    </div>
  );
}
