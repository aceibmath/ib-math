// src/app/(content)/AA_SL/prediction-exams/PredictionClient.jsx
"use client";

import { useState } from "react";

/**
 * Generează slug-ul pentru Prediction Exam AA SL.
 * ex: aa-sl-2025-nov-set3-p2
 */
function slugAA_SL({ year, session, set, paper }) {
  // normalizăm sesiunea -> "may" sau "nov"
  const sess = session?.toLowerCase().startsWith("may") ? "may" : "nov";
  return `aa-sl-${year}-${sess}-set${set}-p${paper}`;
}

export default function PredictionClient({
  defaultYear = 2025,
  defaultSession = "November",
  availableSets = [1, 2, 3, 4, 5],
}) {
  const [activeSet, setActiveSet] = useState(availableSets[0] ?? 1);

  // baza pentru linkul către pagina slug
  const familyBase = "/AA_SL/prediction-exams/";

  return (
    <div className="rounded-3xl ring-2 ring-[#0f6a75]/10 mb-5">
      <div className="rounded-[calc(1.5rem-2px)] border border-slate-200 bg-white/60 shadow-sm">
        {/* ---------- Bara de seturi ---------- */}
        <div className="flex gap-5 px-4 md:px-5 py-3 border-b border-slate-200">
          <div className="flex items-center flex-wrap gap-2">
            {availableSets.map((s) => {
              const active = s === activeSet;
              return (
                <button
                  key={s}
                  onClick={() => setActiveSet(s)}
                  className={[
                    "px-3.5 py-[7px] rounded-lg text-sm font-semibold border transition-all duration-150",
                    // buton activ = fundal teal închis, text alb
                    active
                      ? "bg-teal-700 text-white border-teal-700 shadow-sm hover:-translate-y-px hover:shadow-md"
                      : [
                          // buton inactiv = fundal alb, border gri deschis,
                          // text gri foarte închis (rgb(30 41 59) ~ slate-800)
                          "bg-white text-slate-800 border-slate-300",
                          // la hover vrem să 'tremure' puțin și să sugereze accent teal
                          "hover:-translate-y-px hover:shadow-md hover:border-teal-700",
                        ].join(" "),
                  ].join(" ")}
                >
                  {`Set ${s}`}
                </button>
              );
            })}
          </div>
        </div>

        {/* ---------- Grid cu Paper 1 / Paper 2 ---------- */}
        <div className="px-4 md:px-6 pt-3 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {[1, 2].map((p) => {
              const slug = slugAA_SL({
                year: defaultYear,
                session: defaultSession,
                set: activeSet,
                paper: p,
              });

              return (
                <div
                  key={p}
                  className="rounded-2xl border border-slate-200 bg-white/70 shadow-xs px-4 md:px-5 py-3"
                >
                  {/* titlu Paper */}
                  <h3 className="mb-1 text-[18px] md:text-[20px] font-semibold text-teal-900">
                    {`Paper ${p}`}
                  </h3>

                  {/* 9 questions • 90 minutes */}
                  <div className="mb-3 flex items-center gap-2 text-[13px] text-slate-700">
                    <span>9 questions</span>
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full bg-slate-500/80"
                      aria-hidden
                    />
                    <span>90 minutes</span>
                  </div>

                  {/* buton OPEN */}
                  <div className="flex items-center justify-center">
                    <a
                      href={`${familyBase}${slug}`}
                      className={[
                        "inline-flex min-w-[140px] items-center justify-center rounded-xl border px-5 py-1.5 text-[14px] font-semibold",
                        // stare normală:
                        // bg foarte deschis, border gri deschis,
                        // text gri foarte închis (slate-800 = rgb(30 41 59))
                        "bg-slate-50 border-slate-300 text-slate-800 shadow-sm",
                        // hover:
                        // fundal devine teal-700 (#0F766E vibe AA SL),
                        // border teal-700, text alb,
                        // plus un mic bounce (tremur)
                        "transition-all duration-150 hover:bg-teal-700 hover:border-teal-700 hover:text-white hover:-translate-y-px hover:shadow-md",
                      ].join(" ")}
                    >
                      Open
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
