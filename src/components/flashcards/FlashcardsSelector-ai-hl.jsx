// src/components/flashcards/FlashcardsSelector-ai-hl.jsx
"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import s from "./Flashcards.module.css";

/** AI HL — TOPICS & SUBTOPICS */
const DATA = [
  { topic: "Number & Algebra",           subtopics: ["Number Skills", "Sequences & Series", "Complex Numbers"] },
  { topic: "Functions",                  subtopics: ["Linear Equations", "Properties of Functions", "Transformations"] },
  { topic: "Geometry & Trigonometry",    subtopics: ["Trigonometry", "Voronoi Diagrams", "Trigonometric Functions", "Vectors"] },
  { topic: "Statistics & Probability",   subtopics: ["Univariate Statistics", "Bivariate Statistics", "Probability", "Distributions"] },
  { topic: "Calculus",                   subtopics: ["Differentiation", "Integration"] },
];

export default function FlashcardsSelectorAIHL() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);
  const router = useRouter();

  const canStart = selectedTopic !== null && selectedSub !== null;

  const startHref = useMemo(() => {
    if (!canStart) return "#";
    const topic = DATA[selectedTopic].topic;
    const subtopic = DATA[selectedTopic].subtopics[selectedSub];
    const qs = new URLSearchParams({ topic, subtopic }).toString();
    return `/AI_HL/flashcards/deck?${qs}`;
  }, [canStart, selectedTopic, selectedSub]);

  const onPickTopic = (i) => { setSelectedTopic(i); setSelectedSub(null); };
  const onPickSub   = (ti, si) => {
    if (selectedTopic !== ti) setSelectedTopic(ti);
    setSelectedSub(si);
  };

  return (
    // injectăm tema AI HL ca variabile CSS pentru stylesheet-ul generic
    <div
      className={`${s.fcRoot} pt-2 pb-4 px-4 md:pt-3 md:pb-5 md:px-5`}
      style={{
        "--sel-light": "var(--ai-hl-light, #D7F2FF)",
        "--sel-dark":  "var(--ai-hl-dark,  #0E7490)",
      }}
    >
      {/* TOPICS */}
      <div className={s.topicBar}>
        {DATA.map((t, i) => {
          const active = selectedTopic === i;
          return (
            <button
              key={t.topic}
              type="button"
              onClick={() => onPickTopic(i)}
              aria-pressed={active ? "true" : "false"}
              className={[
                s.fcBtn,
                s.fcBtnTopic,
                active ? s.fcBtnTopicActive : s.fcBtnTopicOutline,
              ].join(" ")}
            >
              {t.topic}
            </button>
          );
        })}
      </div>

      {/* chevron sub FIECARE topic (permanent) */}
      <div className={s.chevronBar} aria-hidden="true">
        {DATA.map((_t, i) => (
          <div key={`c-${i}`} className={s.centerCell}>
            <svg width="22" height="14" viewBox="0 0 24 14" className={`${s.chev} ${s.chevActive}`}>
              <path
                d="M2 2l10 10L22 2"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* SUBTOPICS — vizibile în toate coloanele */}
      <div className={s.subsGrid}>
        {DATA.map((t, ti) => {
          const colActive = selectedTopic === ti;
          return (
            <div key={`col-${ti}`} className={s.subsCol}>
              {t.subtopics.map((lbl, si) => {
                const isSel = colActive && selectedSub === si;
                return (
                  <button
                    key={lbl}
                    type="button"
                    onClick={() => onPickSub(ti, si)}
                    aria-pressed={isSel ? "true" : "false"}
                    className={[
                      s.fcBtn,
                      s.fcBtnSub,
                      isSel ? s.fcBtnSubSelected : s.fcBtnSubIdle,
                    ].join(" ")}
                  >
                    {lbl}
                  </button>
                );
              })}

              {/* chevron + Start Deck doar în coloana activă */}
              <div className={s.chevBetween} aria-hidden="true">
                {colActive && selectedSub !== null ? (
                  <svg width="22" height="14" viewBox="0 0 24 14" className={`${s.chev} ${s.chevActive}`}>
                    <path
                      d="M2 2l10 10L22 2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <span />
                )}
              </div>

              {colActive && (
                canStart ? (
                  <a href={startHref} className={[s.fcBtn, s.fcBtnStart].join(" ")}>
                    Start Deck
                  </a>
                ) : (
                  <button type="button" disabled className={[s.fcBtn, s.fcBtnStartDisabled].join(" ")}>
                    Start Deck
                  </button>
                )
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
