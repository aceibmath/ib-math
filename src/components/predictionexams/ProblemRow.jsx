// src/components/predictionexams/ProblemRow.jsx
export { default } from "@/components/questionbank/ProblemRow.jsx";




"use client";

import { useState } from "react";

// Notă: string-urile sunt HTML/Markdown deja randabile cu KaTeX (ai CSS KaTeX global).
function Html({ html }) {
  return (
    <div
      className="prose max-w-none prose-h4:mt-0 prose-p:my-2 prose-ol:my-2 prose-ul:my-2"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/**
 * Props:
 * - index: number | string  — indexul întrebării pentru fallback titlu
 * - problem: {
 *     code?: string,
 *     statement_md?: string,
 *     solution_md?: string,
 *     calculator?: string, // ex: "NO CALCULATOR"
 *     gdc?: string,        // ex: "NO GDC" / "GDC"
 *     hasVideo?: boolean,
 *     hasIA?: boolean,
 *   }
 * - hideCalcBadge?: boolean — dacă true, NU mai arătăm pastila calculator
 */
export default function ProblemRow({
  index,
  problem,
  hideCalcBadge = false,
}) {
  const [show, setShow] = useState(false);

  const title = `Question ${problem?.code || index}`;
  const calcLabel = problem?.calculator || problem?.gdc || null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/70 shadow-xs">
      {/* Header problemă */}
      <div className="flex items-center justify-between px-4 md:px-5 py-3 bg-emerald-50/60 rounded-t-2xl border-b border-slate-200">
        <h3 className="text-[18px] md:text-[20px] font-semibold text-teal-900">
          {title}
        </h3>

        <div className="flex items-center gap-2">
          {/* Pastile header: Calculator / Video / Tutor IA */}
          {!hideCalcBadge && calcLabel && (
            <span className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
              {String(calcLabel).toUpperCase()}
            </span>
          )}
          {problem?.hasVideo && (
            <span className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
              Video
            </span>
          )}
          {problem?.hasIA && (
            <span className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
              Tutor IA
            </span>
          )}

          <button
            onClick={() => setShow((s) => !s)}
            className="rounded-full border border-teal-600 text-teal-700 px-3 py-1 text-sm font-semibold hover:bg-teal-600 hover:text-white transition"
          >
            {show ? "Markscheme (hide)" : "Markscheme (show)"}
          </button>
        </div>
      </div>

      {/* Enunț */}
      <div className="px-4 md:px-5 py-4">
        {problem?.statement_md ? (
          <Html html={problem.statement_md} />
        ) : (
          <div className="text-slate-600">No statement provided.</div>
        )}
      </div>

      {/* Soluție (toggle) */}
      {show && (
        <div className="px-4 md:px-5 pb-5">
          <div className="mt-2 rounded-xl bg-emerald-50/50 border border-emerald-200 p-4">
            {problem?.solution_md ? (
              <Html html={problem.solution_md} />
            ) : (
              <div className="text-slate-600">No markscheme provided.</div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
