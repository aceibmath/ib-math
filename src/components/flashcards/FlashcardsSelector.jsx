"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import s from "./Flashcards.module.css";

/** Culori (folosite doar pentru <svg> stroke) */
const TEAL = "#0f766e";

/** Date */
const DATA = [
  {
    topic: "Number & Algebra",
    subtopics: ["Sequences & Series", "Exponents & Logarithms", "Binomial Theorem"],
  },
  {
    topic: "Functions",
    subtopics: ["Introducing Functions", "Quadratics", "Rational Functions"],
  },
  {
    topic: "Geometry & Trigonometry",
    subtopics: ["Geometry & Shapes", "Trigonometric Functions"],
  },
  {
    topic: "Statistics & Probability",
    subtopics: ["Statistics", "Probability", "Distributions"],
  },
  {
    topic: "Calculus",
    subtopics: ["Differentiation", "Integration", "Kinematics"],
  },
];

export default function FlashcardsSelector() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);
  const router = useRouter();

  const onPickTopic = (i) => {
    setSelectedTopic(i);
    setSelectedSub(null);
  };

  const onPickSub = (i) => setSelectedSub(i);

  const onStart = () => {
    if (selectedTopic == null || selectedSub == null) return;
    const topic = DATA[selectedTopic].topic;
    const subtopic = DATA[selectedTopic].subtopics[selectedSub];
    const qs = new URLSearchParams({ topic, subtopic }).toString();
    router.push(`/AA_SL/flashcards/deck?${qs}`);
  };

  const TopicButton = ({ label, active, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className={[
        s.fcBtn,
        s.fcBtnTopic,
        active ? s.fcBtnActive : "",
      ].join(" ")}
      aria-pressed={active ? "true" : "false"}
    >
      {label}
    </button>
  );

  const SubButton = ({ label, active, onClick, index }) => (
    <button
      type="button"
      onClick={onClick}
      className={[
        s.fcBtn,
        s.fcBtnSub,
        active ? s.fcBtnActive : "",
      ].join(" ")}
      aria-pressed={active ? "true" : "false"}
      data-index={index}
    >
      {label}
    </button>
  );

  return (
    <div className={s.fcRoot}>
      {/* Rândul cu Topics */}
      <div className={s.topicBar}>
        {DATA.map((t, i) => (
          <TopicButton
            key={t.topic}
            label={t.topic}
            active={selectedTopic === i}
            onClick={() => onPickTopic(i)}
          />
        ))}
      </div>

      {/* Chevron sub topicul ales */}
      {selectedTopic !== null && (
        <div className={s.chevronBar} aria-hidden="true">
          {DATA.map((_t, i) => (
            <div key={`c-${i}`} className={s.centerCell}>
              {selectedTopic === i ? (
                <svg width="22" height="14" viewBox="0 0 24 14" className={s.chev}>
                  <path
                    d="M2 2l10 10L22 2"
                    fill="none"
                    stroke={TEAL}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <span />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Subtopicurile DOAR sub topicul ales + Start Deck */}
      {selectedTopic !== null && (
        <div className={s.subsGrid}>
          {DATA.map((t, i) => (
            <div key={`col-${i}`} className={s.subsCol}>
              {selectedTopic === i && (
                <>
                  {t.subtopics.map((slabel, si) => (
                    <SubButton
                      key={slabel}
                      index={si}
                      label={slabel}
                      active={selectedSub === si}
                      onClick={() => onPickSub(si)}
                    />
                  ))}

                  {/* Chevron între ultimul subtopic și Start Deck */}
                  {selectedSub !== null && (
                    <div className={s.chevBetween} aria-hidden="true">
                      <svg width="22" height="14" viewBox="0 0 24 14" className={s.chev}>
                        <path
                          d="M2 2l10 10L22 2"
                          fill="none"
                          stroke={TEAL}
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Start Deck apare doar după ce ai ales un subtopic */}
                  {selectedSub !== null && (
                    <button type="button" className={[s.fcBtn, s.fcBtnStart].join(" ")} onClick={onStart}>
                      Start Deck
                    </button>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
