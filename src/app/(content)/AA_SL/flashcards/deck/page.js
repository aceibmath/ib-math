// src/app/(content)/AA_SL/flashcards/deck/page.js
"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import ProblemPane from "@/components/flashcards/deck/ProblemPane";
import ChoicesPanel from "@/components/flashcards/deck/ChoicesPanel";
import SubmitBar from "@/components/flashcards/deck/SubmitBar";
import styles from "@/components/flashcards/deck/deck.module.css";

import { getDatasetFor } from "@/data/flashcards/aa-sl/registry";

export default function DeckPageSL() {
  const sp = useSearchParams();
  const topic = sp.get("topic") ?? "";
  const subtopic = sp.get("subtopic") ?? "";

  // ─────────────────────────────────────────────────────────────
  // AUDIENCE: încercăm în ordinea:
  //   1) query-ul curent (?aud=teacher|student) dacă există
  //   2) referer (de pe ce rută am venit)
  // Dacă nu găsim -> fără ?aud
  // ─────────────────────────────────────────────────────────────
  const [aud, setAud] = useState(() => {
    const q = (sp.get("aud") || "").toLowerCase();
    return q === "teacher" ? "teacher" : q === "student" ? "student" : undefined;
  });

  useEffect(() => {
    if (aud) return; // deja luat din URL
    const ref = typeof document !== "undefined" ? document.referrer || "" : "";
    const isTeacher =
      /\/AA_SL(?:\?|$).*aud=teacher/.test(ref) ||
      /\/AA_SL\/flashcards\?aud=teacher/.test(ref);
    const isStudent =
      /\/AA_SL(?:\?|$).*aud=student/.test(ref) ||
      /\/AA_SL\/flashcards\?aud=student/.test(ref);
    if (isTeacher) setAud("teacher");
    else if (isStudent) setAud("student");
  }, [aud]);

  const aaLink = aud ? `/AA_SL?aud=${aud}` : "/AA_SL";
  const fcLink = aud ? `/AA_SL/flashcards?aud=${aud}` : "/AA_SL/flashcards";

  // construim lista de întrebări din registry
  const questions = useMemo(() => {
    const raw = getDatasetFor(topic, subtopic) || [];
    return raw.map((q, idx) => {
      const choices = (q.choices || []).map((lbl, i) => ({
        id: String.fromCharCode(65 + i), // "A", "B", ...
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

  // stare deck
  const [idx, setIdx] = useState(0);
  const [mode, setMode] = useState("question"); // "question" | "split" | "solution"
  const [attempted, setAttempted] = useState(0);
  const [correct, setCorrect] = useState(0);

  // răspunsurile elevului pentru fiecare întrebare
  const [answers, setAnswers] = useState(() =>
    Array.from({ length: total }, () => ({
      selectedId: null,
      graded: false,
      isCorrect: false,
    }))
  );

  // am terminat toate întrebările?
  const endOfDeck = idx >= total;

  // întrebarea curentă
  const q = !endOfDeck ? questions[idx] : null;
  const ans = !endOfDeck && answers[idx]
    ? answers[idx]
    : { selectedId: null, graded: false, isCorrect: false };

  // starea butonului mare din SubmitBar
  let phase = "idle";
  if (!endOfDeck) {
    if (!ans.graded && ans.selectedId) phase = "canSubmit";
    if (ans.graded && mode === "question") phase = "graded";
    if (mode === "split" || mode === "solution") phase = "viewingSolution";
  }

  // helpers nav
  const resetForNext = (newIdx) => {
    setMode("question");
    setIdx(newIdx);
  };

  const goPrev = () => {
    if (idx > 0) resetForNext(idx - 1);
  };

  const goNext = () => {
    if (idx < total) resetForNext(idx + 1);
  };

  // acțiuni principale
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

  const handleViewSolution = () => {
    if (!endOfDeck) setMode("split");
  };

  const handleContinue = () => {
    // dacă mai avem întrebări → următoarea
    if (idx < total - 1) {
      resetForNext(idx + 1);
    } else {
      // dacă am ajuns la ultima întrebare → intrăm în ecranul "End of Deck"
      setIdx(total);       // sentinel (idx >= total => endOfDeck true)
      setMode("question"); // revenim în modul "question"
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
  };

  const topicLabel = topic || "—";
  const subtopicLabel = subtopic || "—";

  return (
    <main
      className="course-theme-aa-sl mx-auto max-w-7xl px-4 pt-3 pb-6"
      style={{ "--breadcrumbs-h": "44px" }}
    >
      {/* Breadcrumb cu păstrarea audienței (dacă există) */}
      <nav aria-label="Breadcrumb" className="mb-3 text-sm text-slate-600">
        <ul className="flex items-center gap-2 list-none p-0 m-0">
          <li>
            <Link href="/" className="hover:underline !text-[#0f766e]">
              Home
            </Link>
          </li>
          <li aria-hidden="true">›››</li>
          <li>
            <Link href={aaLink} className="hover:underline !text-[#0f766e]">
              AA SL
            </Link>
          </li>
          <li aria-hidden="true">›››</li>
          <li>
            <Link href={fcLink} className="hover:underline !text-[#0f766e]">
              Flashcards
            </Link>
          </li>
          <li aria-hidden="true">›››</li>
          <li className="text-slate-500">
            {subtopic || "…"}
          </li>
        </ul>
      </nav>

      <section className={styles.wrap}>
        {/* LEFT column (problem / End of Deck card) */}
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
                  AA SL — {topicLabel} — {subtopicLabel}
                </p>
              </div>
            )}
          </div>

          {/* bottom nav ( ← 1/10 → ) */}
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

        {/* RIGHT column (choices + submit bar) */}
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
