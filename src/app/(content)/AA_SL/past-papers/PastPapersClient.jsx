"use client";

import { useMemo, useState } from "react";

function buildSlug(family, year, session, tz, paper) {
  // family: 'aa-sl' (new) sau 'math-sl' (old)
  return `${family}-${year}-${session}-${tz}-p${paper}`;
}

export default function PastPapersClient({ yearsNew = [], yearsOld = [] }) {
  const latestNew = yearsNew[0] ?? 2025;
  const latestOld = yearsOld[0] ?? 2020;

  const [curr, setCurr] = useState("new"); // 'new' | 'old'
  const [year, setYear] = useState(latestNew);

  const switchCurr = (next) => {
    setCurr(next);
    setYear(next === "new" ? latestNew : latestOld);
  };

  const years = curr === "new" ? yearsNew : yearsOld;

  // New AA SL vs Old Math SL
  const family = curr === "new" ? "aa-sl" : "math-sl";
  const baseHref =
    curr === "new" ? "/AA_SL/past-papers/" : "/MATH_SL/past-papers/";

  const sessions = useMemo(
    () => [
      { title: "May TZ1", session: "may", tz: "tz1" },
      { title: "November TZ1", session: "nov", tz: "tz1" },
      { title: "May TZ2", session: "may", tz: "tz2" },
      { title: "November TZ2", session: "nov", tz: "tz2" },
    ],
    []
  );

  // culoarea închisă oficială AA SL = teal închis (folosim clasa ta existentă: bg-teal-700 etc)
  // dar ca valoare inline avem nevoie de un cod fix:
  const DARK = "#0f766e"; // echivalent teal-700 vibe (aproape de culoarea ta AA SL)

  return (
    <div className="rounded-3xl ring-2 ring-[#0f6a75]/10 mb-5">
      <div className="rounded-[calc(1.5rem-2px)] border border-slate-200 bg-white/60 shadow-sm">
        {/* Header: ani + New/Old */}
        <div className="flex items-center justify-between gap-3 px-4 md:px-5 py-2.5 border-b border-slate-200">
          {/* Ani */}
          <div className="flex flex-wrap items-center gap-2">
            {years.map((y) => {
              const active = y === year;
              return (
                <button
                  key={y}
                  onClick={() => setYear(y)}
                  className={[
                    "px-3.5 py-[7px] rounded-lg text-sm font-semibold transition-all border",
                    "hover:-translate-y-0.5 active:scale-[0.98]",
                  ].join(" ")}
                  aria-pressed={active}
                  style={
                    active
                      ? {
                          background: DARK,
                          color: "#fff",
                          borderColor: "rgb(30 41 59)", // ca la AI: border închis, subtil serios
                          boxShadow: "0 1px 2px rgb(0 0 0 / .15)",
                        }
                      : {
                          background: "#fff",
                          color: "rgb(30 41 59)", // text neutru (nu teal!)
                          borderColor: "rgb(203 213 225)", // slate-300
                        }
                  }
                >
                  {y}
                </button>
              );
            })}
          </div>

          {/* New / Old */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => switchCurr("new")}
              className={[
                "px-3.5 py-[7px] rounded-lg text-sm font-semibold transition-all border",
                "hover:-translate-y-0.5 active:scale-[0.98]",
              ].join(" ")}
              style={
                curr === "new"
                  ? {
                      background: DARK,
                      color: "#fff",
                      borderColor: "rgb(30 41 59)",
                      boxShadow: "0 1px 2px rgb(0 0 0 / .15)",
                    }
                  : {
                      background: "#fff",
                      color: "rgb(30 41 59)",
                      borderColor: "rgb(203 213 225)",
                    }
              }
            >
              New Curriculum
            </button>

            <button
              onClick={() => switchCurr("old")}
              className={[
                "px-3.5 py-[7px] rounded-lg text-sm font-semibold transition-all border",
                "hover:-translate-y-0.5 active:scale-[0.98]",
              ].join(" ")}
              style={
                curr === "old"
                  ? {
                      background: DARK,
                      color: "#fff",
                      borderColor: "rgb(30 41 59)",
                      boxShadow: "0 1px 2px rgb(0 0 0 / .15)",
                    }
                  : {
                      background: "#fff",
                      color: "rgb(30 41 59)",
                      borderColor: "rgb(203 213 225)",
                    }
              }
            >
              Old Curriculum
            </button>
          </div>
        </div>

        {/* Grid sesiuni (carduri scunde + pastile P1/P2) */}
        <div className="px-4 md:px-6 pt-3 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {sessions.map(({ title, session, tz }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-white/70 shadow-xs px-4 md:px-5 py-3"
              >
                <h3 className="mb-2 text-[18px] md:text-[20px] font-semibold text-slate-800">
                  {title}
                </h3>

                <div className="flex items-center justify-center gap-3">
                  {[1, 2].map((p) => {
                    const slug = buildSlug(family, year, session, tz, p);
                    return (
                      <a
                        key={p}
                        href={`${baseHref}${slug}`}
                        className="
                          inline-flex min-w-[112px] items-center justify-center
                          rounded-xl border border-slate-300 bg-slate-50
                          px-4 py-1.5 text-[14px] font-semibold text-slate-800
                          transition
                          hover:bg-[rgb(15,118,110)]
                          hover:border-[rgb(15,118,110)]
                          hover:text-white
                        "
                      >
                        {`Paper ${p}`}
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
