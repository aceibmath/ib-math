// src/app/(content)/AI_HL/flashcards/deck/page.js
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import ProblemPane from "@/components/flashcards/deck/ProblemPane";
import ChoicesPanel from "@/components/flashcards/deck/ChoicesPanel-ai-hl";
import SubmitBar from "@/components/flashcards/deck/SubmitBar";
import styles from "@/components/flashcards/deck/deck.module.css";

import { getDatasetFor } from "@/data/flashcards/ai-hl/registry";

export default function DeckPageAIHL() {
  const sp = useSearchParams();
  const topic = sp.get("topic") ?? "";
  const subtopic = sp.get("subtopic") ?? "";

  // --- infer audiența: din URL sau, dacă lipsește, din document.referrer
  const [aud, setAud] = useState(sp.get("aud")); // "teacher" | "student" | null
  useEffect(() => {
    const urlAud = sp.get("aud");
    if (urlAud === "teacher" || urlAud === "student") {
      setAud(urlAud);
      return;
    }
    if (typeof document !== "undefined") {
      const ref = document.referrer || "";
      if (/\/AI_HL(?:\?|$).*aud=teacher/.test(ref) || /\/AI_HL\/flashcards\?aud=teacher/.test(ref)) {
        setAud("teacher");
      } else if (/\/AI_HL(?:\?|$).*aud=student/.test(ref) || /\/AI_HL\/flashcards\?aud=student/.test(ref)) {
        setAud("student");
      }
    }
  }, [sp]);

  // links care păstrează aud
  const aaLink = aud ? `/AI_HL?aud=${aud}` : "/AI_HL";
  const fcLink = aud ? `/AI_HL/flashcards?aud=${aud}` : "/AI_HL/flashcards";

  const questions = useMemo(() => {
    const raw = getDatasetFor(topic, subtopic) || [];
    return raw.map((q, idx) => {
      const choices = (q.choices || []).map((lbl, i) => ({
        id: String.fromCharCode(65 + i), // A, B, C, D
        label: lbl,
      }));
      const correctId = String.fromCharCode(65 + (q.correctIndex ?? 0));
      return {
        id: q.id ?? `Q${idx + 1}`,
        prompt: q.prompt ?? q.statement_md ?? "",
        solution: q.solution ?? q.solution_md ?? "",
        choices,
        correctId,
        marks: q.marks ?? null,
      };
    });
  }, [topic, subtopic]);

  const total = questions.length;

  const [idx, setIdx] = useState(0);
  const [mode, setMode] = useState("question"); // 'question' | 'split' | 'solution'
  const [attempted, setAttempted] = useState(0);
  const [correct, setCorrect] = useState(0);

  const [answers, setAnswers] = useState(() =>
    Array.from({ length: total }, () => ({
      selectedId: null,
      graded: false,
      isCorrect: false,
    }))
  );

  const endOfDeck = idx >= total;

  const q = !endOfDeck ? questions[idx] : null;
  const ans =
    !endOfDeck && answers[idx]
      ? answers[idx]
      : { selectedId: null, graded: false, isCorrect: false };

  let phase = "idle";
  if (!endOfDeck) {
    if (!ans.graded && ans.selectedId) phase = "canSubmit";
    if (ans.graded && mode === "question") phase = "graded";
    if (mode === "split" || mode === "solution") phase = "viewingSolution";
  }

  function resetForNext(newIdx) {
    setMode("question");
    setIdx(newIdx);
  }
  const goPrev = () => {
    if (endOfDeck) {
      if (total > 0) resetForNext(total - 1);
      return;
    }
    if (idx > 0) resetForNext(idx - 1);
  };
  const goNext = () => {
    if (idx < total) resetForNext(idx + 1);
  };

  function submit() {
    if (endOfDeck || !ans.selectedId || ans.graded) return;
    setAnswers((prev) => {
      const next = [...prev];
      const isCorrect = ans.selectedId === q.correctId;
      next[idx] = { ...ans, graded: true, isCorrect };
      return next;
    });
    setAttempted((a) => a + 1);
    if (ans.selectedId === q.correctId) setCorrect((c) => c + 1);
  }

  function viewSolution() {
    if (!endOfDeck) setMode("split");
  }

  function cont() {
    if (idx < total - 1) {
      resetForNext(idx + 1);
    } else {
      setIdx(total);   // End of Deck (sentinel)
      setMode("question");
    }
  }

  function choose(id) {
    if (endOfDeck || ans.graded) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[idx] = { ...ans, selectedId: id };
      return next;
    });
  }

  function restart() {
    setIdx(0);
    setMode("question");
    setAttempted(0);
    setCorrect(0);
    setAnswers(
      Array.from({ length: total }, () => ({
        selectedId: null,
        graded: false,
        isCorrect: false,
      }))
    );
  }

  const topicLabel = topic || "";
  const subtopicLabel = subtopic || "";

  return (
    <main
      className="course-theme-ai-hl mx-auto max-w-7xl px-4 pt-3 pb-6"
      style={{ "--breadcrumbs-h": "44px" }}
    >
      {/* Breadcrumb — culoare fixată pe toate stările pentru AI HL */}
      <nav aria-label="Breadcrumb" className="mb-3 text-sm text-slate-600">
        <ul className="flex items-center gap-2 list-none p-0 m-0">
          <li>
            <Link
              href="/"
              className="hover:underline underline-offset-2
                         !text-[var(--ai-hl-dark)]
                         hover:!text-[var(--ai-hl-dark)]
                         focus:!text-[var(--ai-hl-dark)]
                         active:!text-[var(--ai-hl-dark)]
                         visited:!text-[var(--ai-hl-dark)]"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-[var(--ai-hl-dark)]">›››</li>
          <li>
            <Link
              href={aaLink}
              className="hover:underline underline-offset-2
                         !text-[var(--ai-hl-dark)]
                         hover:!text-[var(--ai-hl-dark)]
                         focus:!text-[var(--ai-hl-dark)]
                         active:!text-[var(--ai-hl-dark)]
                         visited:!text-[var(--ai-hl-dark)]"
            >
              AI HL
            </Link>
          </li>
          <li aria-hidden="true" className="text-[var(--ai-hl-dark)]">›››</li>
          <li>
            <Link
              href={fcLink}
              className="hover:underline underline-offset-2
                         !text-[var(--ai-hl-dark)]
                         hover:!text-[var(--ai-hl-dark)]
                         focus:!text-[var(--ai-hl-dark)]
                         active:!text-[var(--ai-hl-dark)]
                         visited:!text-[var(--ai-hl-dark)]"
            >
              Flashcards
            </Link>
          </li>
          {subtopic && (
            <>
              <li aria-hidden="true" className="text-[var(--ai-hl-dark)]">›››</li>
              <li className="text-slate-500">{subtopic}</li>
            </>
          )}
        </ul>
      </nav>

      <section className={styles.wrap}>
        {/* LEFT */}
        <div className={styles.leftCol}>
          {!endOfDeck ? (
            <div className={styles.problemShell}>
              <ProblemPane
                index={idx}
                prompt={q.prompt}
                solution={q.solution}
                mode={mode}
                onModeChange={setMode}
              />
            </div>
          ) : (
            <div className={styles.endCard}>
              <h2 className={styles.endTitle}>End of Deck</h2>
              <p className={styles.endSubtitle}>AI HL  {topicLabel}  {subtopicLabel}</p>
            </div>
          )}

          {/* bottom nav */}
          <div className={styles.bottomNav}>
            <button
              className={styles.navArrow}
              onClick={goPrev}
              disabled={idx === 0}
              aria-label="Previous"
            >
              ←
            </button>

            <span className={styles.navCounter}>
              {Math.min(idx + 1, total)} / {total}
            </span>

            <button
              className={styles.navArrow}
              onClick={goNext}
              disabled={endOfDeck}
              aria-label="Next"
            >
              →
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.rightCol}>
          <ChoicesPanel
            choices={!endOfDeck ? q.choices : []}
            selectedId={!endOfDeck ? ans.selectedId : null}
            setSelectedId={choose}
            graded={!endOfDeck ? ans.graded : false}
            correctId={!endOfDeck ? q.correctId : undefined}
            stats={{ attempted, correct, total }}
            nav={{ idx, total, goPrev, goNext }}
          />
          <SubmitBar
            phase={phase}
            onSubmit={submit}
            onViewSolution={viewSolution}
            onContinue={cont}
            endOfDeck={endOfDeck}
            onRestart={restart}
          />
        </div>
      </section>
    </main>
  );
}
