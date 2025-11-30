// src/app/(content)/AI_HL/prediction-exams/PredictionClient.jsx
"use client";

import { useMemo, useState } from "react";

function makeSlug({ family, year, session, set, paper }) {
  const sess = session.toLowerCase().startsWith("may") ? "may" : "nov";
  return `${family}-${year}-${sess}-set${set}-p${paper}`;
}

export default function PredictionClient({
  index = [],
  defaultYear = 2025,
  defaultSession = "November",
  availableSets = [1, 2, 3, 4, 5],
}) {
  // AI HL family + base route
  const family = "ai-hl";
  const baseHref = "/AI_HL/prediction-exams/";

  // culori AI HL
  const AI_HL_DARK = "#0E7490"; // accent aqua închis
  const DARK_TEXT = "rgb(30 41 59)"; // gri foarte închis pentru titluri statice

  // ce set e activ
  const [activeSet, setActiveSet] = useState(availableSets[0] ?? 1);

  // luăm din index meta (questions, minutes)
  const metaLookup = useMemo(() => {
    const m = new Map();
    for (const it of index) {
      const key = `${it.year}|${it.session}|${it.set}|${it.paper}`;
      m.set(key, { q: it.questions, min: it.minutes });
    }
    return m;
  }, [index]);

  function fallbackMeta(paper) {
    if (paper === 3) return { q: 2, min: 75 };
    return { q: 12, min: 120 };
  }

  function getMeta(paper) {
    const key = `${defaultYear}|${defaultSession}|${activeSet}|${paper}`;
    return metaLookup.get(key) || fallbackMeta(paper);
  }

  const sessionShort =
    defaultSession === "May" ? "may" : "nov";

  return (
    // rama exterioară: outline subtil în culoarea cursului AI HL,
    // nu teal generic
    <div
      className="rounded-3xl mb-5"
      style={{
        boxShadow: `0 0 0 2px ${AI_HL_DARK}1A`, // aceeași tehnică: culoare curs cu ~10% alpha
      }}
    >
      <div className="rounded-[calc(1.5rem-2px)] border border-slate-200 bg-white/60 shadow-sm">
        {/* ---------- Tabs Set x ---------- */}
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
                    active
                      ? "text-white shadow-sm hover:-translate-y-px hover:shadow-md"
                      : "bg-white text-slate-800 border-slate-300 hover:-translate-y-px hover:shadow-md",
                  ].join(" ")}
                  style={
                    active
                      ? {
                          backgroundColor: AI_HL_DARK,
                          borderColor: AI_HL_DARK,
                        }
                      : {
                          borderColor: "rgb(203 213 225)", // slate-300
                        }
                  }
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.borderColor = AI_HL_DARK;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.borderColor =
                        "rgb(203 213 225)";
                    }
                  }}
                >
                  {`Set ${s}`}
                </button>
              );
            })}
          </div>
        </div>

        {/* ---------- Cards Paper 1 / 2 / 3 ---------- */}
        <div className="px-4 md:px-6 pt-3 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {[1, 2, 3].map((p) => {
              const { q, min } = getMeta(p);
              const slug = makeSlug({
                family,
                year: defaultYear,
                session: sessionShort,
                set: activeSet,
                paper: p,
              });

              return (
                <div
                  key={p}
                  className="rounded-2xl border border-slate-200 bg-white/70 shadow-xs px-4 md:px-5 py-3"
                >
                  {/* Titlul Paper X = gri foarte închis, nu teal */}
                  <h3
                    className="mb-1 text-[18px] md:text-[20px] font-semibold"
                    style={{ color: DARK_TEXT }}
                  >
                    {`Paper ${p}`}
                  </h3>

                  {/* meta-line cu bullet */}
                  <div className="mb-3 flex items-center gap-2 text-[13px] text-slate-700">
                    <span>{q} questions</span>
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full bg-slate-500/80"
                      aria-hidden
                    />
                    <span>{min} minutes</span>
                  </div>

                  {/* buton Open → hover în culoarea cursului AI HL */}
                  <div className="flex items-center justify-center">
                    <a
                      href={`${baseHref}${slug}`}
                      className={[
                        "inline-flex min-w-[140px] items-center justify-center rounded-xl border px-5 py-1.5 text-[14px] font-semibold shadow-sm transition-all duration-150",
                        "bg-slate-50 border-slate-300 text-slate-800",
                      ].join(" ")}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          AI_HL_DARK;
                        e.currentTarget.style.borderColor =
                          AI_HL_DARK;
                        e.currentTarget.style.color = "#fff";
                        e.currentTarget.style.transform =
                          "translateY(-1px)";
                        e.currentTarget.style.boxShadow =
                          "0 6px 14px rgba(0,0,0,0.12)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgb(248 250 252)"; // slate-50
                        e.currentTarget.style.borderColor =
                          "rgb(203 213 225)"; // slate-300
                        e.currentTarget.style.color =
                          "rgb(30 41 59)"; // dark text
                        e.currentTarget.style.transform =
                          "translateY(0)";
                        e.currentTarget.style.boxShadow =
                          "0 1px 2px rgba(0,0,0,0.05)";
                      }}
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
