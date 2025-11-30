// src/app/(content)/AA_HL/flashcards/deck/page.js
"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import ProblemPane from "@/components/flashcards/deck/ProblemPane-aa-hl";
import ChoicesPanel from "@/components/flashcards/deck/ChoicesPanel-aa-hl";
import SubmitBar from "@/components/flashcards/deck/SubmitBar-aa-hl";
import styles from "@/components/flashcards/deck/deck.module.css";

import { getDatasetFor } from "@/data/flashcards/aa-hl/registry";

export default function DeckPageHL() {
  const sp = useSearchParams();
  const topic = sp.get("topic") ?? "";
  const subtopic = sp.get("subtopic") ?? "";

  // ── AUDIENCE: 1) din query, 2) fallback din referer; altfel fără ?aud
  const [aud, setAud] = useState(() => {
    const q = (sp.get("aud") || "").toLowerCase();
    return q === "teacher" ? "teacher" : q === "student" ? "student" : undefined;
  });

  useEffect(() => {
    if (aud) return; // deja setat din URL
    const ref = typeof document !== "undefined" ? document.referrer || "" : "";
    const isTeacher =
      /\/AA_HL(?:\?|$).*aud=teacher/.test(ref) ||
      /\/AA_HL\/flashcards\?aud=teacher/.test(ref);
    const isStudent =
      /\/AA_HL(?:\?|$).*aud=student/.test(ref) ||
      /\/AA_HL\/flashcards\?aud=student/.test(ref);
    if (isTeacher) setAud("teacher");
    else if (isStudent) setAud("student");
  }, [aud]);

  const aaLink = aud ? `/AA_HL?aud=${aud}` : "/AA_HL";
  const fcLink = aud ? `/AA_HL/flashcards?aud=${aud}` : "/AA_HL/flashcards";

  const questions = useMemo(() => {
    const raw = getDatasetFor(topic, subtopic) || [];
    return raw.map((q, idx) => {
      const choices = (q.choices || []).map((lbl, i) => ({
        id: String.fromCharCode(65 + i),
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
  const [mode, setMode] = useState("question"); // "question" | "split" | "solution"
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

  const resetForNext = (newIdx) => {
    setMode("question");
    setIdx(newIdx);
  };
  const goPrev = () => { if (idx > 0) resetForNext(idx - 1); };
  const goNext = () => { if (idx < total) resetForNext(idx + 1); };

  const q = !endOfDeck ? questions[idx] : null;
  const ans = !endOfDeck && answers[idx]
    ? answers[idx]
    : { selectedId: null, graded: false, isCorrect: false };

  let phase = "idle";
  if (!endOfDeck) {
    if (!ans.graded && ans.selectedId) phase = "canSubmit";
    if (ans.graded && mode === "question") phase = "graded";
    if (mode === "split" || mode === "solution") phase = "viewingSolution";
  }

  const handleSubmit = () => {
    if (endOfDeck || !ans.selectedId || ans.graded) return;
    setAnswers((prev) => {
      const next = [...prev];
      const isCorrect = ans.selectedId === q.correctId;
      next[idx] = { ...ans, graded: true, isCorrect };
      return next;
    });
    setAttempted((a) => a + 1);
    if (ans.selectedId === q.correctId) setCorrect((c) => c + 1);
  };
  const handleViewSolution = () => { if (!endOfDeck) setMode("split"); };
  const handleContinue = () => {
    if (idx < total - 1) resetForNext(idx + 1);
    else {
      setIdx(total);
      setMode("question");
    }
  };
  const choose = (id) => {
    if (endOfDeck || ans.graded) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[idx] = { ...ans, selectedId: id };
      return next;
    });
  };
  const handleRestart = () => {
    setIdx(0); setMode("question"); setAttempted(0); setCorrect(0);
    setAnswers(Array.from({ length: total }, () => ({
      selectedId: null, graded: false, isCorrect: false,
    })));
  };

  const topicLabel = topic || "—";
  const subtopicLabel = subtopic || "—";

  return (
    <main
      className="course-theme-aa-hl mx-auto max-ww-7xl px-4 pt-3 pb-6"
      style={{ "--breadcrumbs-h": "44px" }}
    >
      {/* Breadcrumb cu păstrarea audienței (dacă există) */}
      <nav aria-label="Breadcrumb" className="mb-3 text-sm text-slate-600">
  <ul className="flex items-center gap-2 list-none p-0 m-0">
    <li>
      <Link
        href="/"
        className="hover:underline underline-offset-2
                   !text-[var(--aa-hl-dark)]
                   hover:!text-[var(--aa-hl-dark)]
                   focus:!text-[var(--aa-hl-dark)]
                   active:!text-[var(--aa-hl-dark)]
                   visited:!text-[var(--aa-hl-dark)]"
      >
        Home
      </Link>
    </li>

    <li aria-hidden="true" className="text-[var(--aa-hl-dark)]">›››</li>

    <li>
      <Link
        href={aaLink}
        className="hover:underline underline-offset-2
                   !text-[var(--aa-hl-dark)]
                   hover:!text-[var(--aa-hl-dark)]
                   focus:!text-[var(--aa-hl-dark)]
                   active:!text-[var(--aa-hl-dark)]
                   visited:!text-[var(--aa-hl-dark)]"
      >
        AA HL
      </Link>
    </li>

    <li aria-hidden="true" className="text-[var(--aa-hl-dark)]">›››</li>

    <li>
      <Link
        href={fcLink}
        className="hover:underline underline-offset-2
                   !text-[var(--aa-hl-dark)]
                   hover:!text-[var(--aa-hl-dark)]
                   focus:!text-[var(--aa-hl-dark)]
                   active:!text-[var(--aa-hl-dark)]
                   visited:!text-[var(--aa-hl-dark)]"
      >
        Flashcards
      </Link>
    </li>

    {subtopic && (
      <>
        <li aria-hidden="true" className="text-[var(--aa-hl-dark)]">›››</li>
        <li className="text-slate-500">{subtopic}</li>
      </>
    )}
  </ul>
</nav>


      <section className={styles.wrap}>
        {/* LEFT */}
        <div className={styles.leftCol}>
          <div className={styles.problemShell}>
            {!endOfDeck ? (
              <ProblemPane
                index={idx}
                prompt={q.prompt}
                solution={q.solution}
                mode={mode}
                onModeChange={setMode}
              />
            ) : (
              <div className={styles.endCard}>
                <h2 className={styles.endTitle}>End of Deck</h2>
                <p className={styles.endSubtitle}>
                  AA HL — {topicLabel} — {subtopicLabel}
                </p>
              </div>
            )}
          </div>

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
            onSubmit={handleSubmit}
            onViewSolution={handleViewSolution}
            onContinue={handleContinue}
            endOfDeck={endOfDeck}
            onRestart={handleRestart}
          />
        </div>
      </section>
    </main>
  );
}
