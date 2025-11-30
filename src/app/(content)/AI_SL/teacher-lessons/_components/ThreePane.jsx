// src/app/(content)/AI_SL/teacher-lessons/_components/ThreePane.jsx
"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import Link from "next/link";
import { MathJax, MathJaxContext } from "better-react-mathjax";

const BG_DEFAULT = "bg-stone-100";     // gri deschis (col. 1 & 2)
const BG_ACTIVE  = "bg-[#FFF7ED]";     // galben pastel (AI SL)
const TEAL_DARK  = "#B45309";          // galben-închis accent (AI SL)

/* ——— Topic (coloana 1) ——— */
function TopicItem({ t, active, onSelect }) {
  return (
    <button
      onClick={() => onSelect(t.key)}
      className={[
        "relative w-full text-left px-4 py-3 transition group",
        "rounded-none border border-white",
        active ? BG_ACTIVE : BG_DEFAULT,
      ].join(" ")}
    >
      <div className="text-[11px] text-slate-500">Topic {t.ordinal}</div>
      <div className="mt-0 flex items-center justify-between">
        <span
          className={`text-[15px] leading-none font-[540] ${
            active ? "text-slate-900" : "text-slate-800"
          }`}
        >
          {t.label}
        </span>

        {/* săgeata doar dacă acest topic este activ */}
        {active && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-base leading-none text-slate-500 group-hover:text-slate-700 select-none">
            ›
          </span>
        )}
      </div>
    </button>
  );
}

/* ——— Secțiune (coloana 2) ——— */
function SectionRow({ s, selected, onClick }) {
  const prefix = s.level === "HL" ? "HL" : "SL";
  return (
    <li className="list-none">
      <button
        onClick={onClick}
        className={[
          "w-full text-left px-4 h-[44px] flex items-center justify-between",
          "rounded-none border border-white",
          selected ? BG_ACTIVE : BG_DEFAULT,
        ].join(" ")}
      >
        <span className="text-[15px] font-[560] text-slate-800">
          {prefix} {s.id}
        </span>

        {/* săgeata doar dacă această secțiune este selectată */}
        {selected && (
          <span className="text-slate-500 text-base leading-none">›</span>
        )}
      </button>

      {selected && (
        <div className="p-0 bg-white border-b border-slate-200">
          <MathJaxContext>
            {(() => {
              const items = Array.isArray(s.contentItems)
                ? s.contentItems
                : (typeof s.content === "string"
                    ? s.content
                        .split(/\n+/)
                        .map((t) => t.trim())
                        .filter(Boolean)
                    : []);
              return (
                <ul className="tl-bullets tl-prose-tight text-[10px] leading-snug px-3 py-3">
                  {items.map((line, i) => (
                    <li key={i} className="my-[2px] whitespace-normal break-words">
                      <MathJax inline dynamic>{line}</MathJax>
                    </li>
                  ))}
                </ul>
              );
            })()}
          </MathJaxContext>
        </div>
      )}
    </li>
  );
}

/* ——— Lecție (coloana 3) ——— */
function LessonRow({ l, active, onSelect }) {
  return (
    <li
      onClick={() => onSelect(l.id)}
      className={[
        "list-none px-3 py-3 transition-colors cursor-pointer",
        "rounded-none border border-white",
        active ? BG_ACTIVE : BG_DEFAULT,
      ].join(" ")}
    >
      <div
        className={`text-[15px] leading-none font-[560] ${
          active ? "text-slate-900" : "text-slate-800"
        }`}
      >
        {`${l.id} Lesson ${l.id}`}
      </div>

      {/* butonul primește stilul galben-închis din .course-theme-ai-sl (globals.css) */}
      {active && (
        <div className="mt-2">
          <Link
            href={`/AI_SL/teacher-lessons/lesson/${encodeURIComponent(l.id)}`}
            onClick={(e) => e.stopPropagation()}
            className="tl-open-btn"
          >
            Open Lesson
          </Link>
        </div>
      )}
    </li>
  );
}

export default function ThreePane({ topics }) {
  const firstTopic = topics?.[0];
  const firstSection = firstTopic?.sections?.[0];
  const firstLesson = firstSection?.lessons?.[0];

  const [activeTopicKey, setActiveTopicKey] = useState(firstTopic?.key ?? "number-and-algebra");
  const topic = useMemo(() => topics.find((x) => x.key === activeTopicKey) || topics[0], [topics, activeTopicKey]);

  const [activeSectionId, setActiveSectionId] = useState(firstSection?.id ?? null);
  const activeSection = topic?.sections?.find((s) => s.id === activeSectionId) || null;

  const [activeLessonId, setActiveLessonId] = useState(firstLesson?.id ?? null);

  useEffect(() => {
    const t = topics.find((x) => x.key === activeTopicKey) || topics[0];
    const s = t?.sections?.[0] || null;
    const l = s?.lessons?.[0] || null;
    setActiveSectionId(s?.id ?? null);
    setActiveLessonId(l?.id ?? null);
  }, [activeTopicKey, topics]);

  const leftWrapRef = useRef(null);
  const [leftH, setLeftH] = useState(null);
  useEffect(() => {
    const el = leftWrapRef.current;
    if (!el) return;
    const update = () => setLeftH(Math.ceil(el.offsetHeight));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  // ✅ Aplicăm tema globală pentru AI SL
  return (
    <div className="course-theme-ai-sl mt-2 rounded-2xl bg-white border border-slate-200 p-3 md:p-4">
      <div className="grid grid-cols-1 md:grid-cols-[250px,1fr] gap-3 md:gap-4 items-stretch">
        <aside>
          <div ref={leftWrapRef}>
            <ul className="space-y-0 list-none p-0 m-0">
              {topics.map((t) => (
                <li key={t.key}>
                  <TopicItem t={t} active={t.key === activeTopicKey} onSelect={(k) => setActiveTopicKey(k)} />
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section className="bg-white rounded-none" style={leftH ? { height: `${leftH}px` } : undefined}>
          <div className="grid grid-cols-[380px,1fr] gap-0 h-full">
            <div className="border-r border-slate-200 h-full overflow-y-scroll rounded-none tl-scroll-sl" style={{ scrollbarGutter: "auto" }}>
              <ul className="list-none p-0 m-0">
                {(topic?.sections || []).map((s) => (
                  <SectionRow
                    key={s.id}
                    s={s}
                    selected={s.id === activeSectionId}
                    onClick={() => {
                      setActiveSectionId((prev) => {
                        const willOpen = prev !== s.id;
                        if (willOpen) {
                          const firstL = s.lessons?.[0]?.id ?? null;
                          setActiveLessonId(firstL);
                          return s.id;
                        } else {
                          setActiveLessonId(null);
                          return null;
                        }
                      });
                    }}
                  />
                ))}
              </ul>
            </div>

            <div className="h-full overflow-y-scroll rounded-none tl-scroll-lessons" style={{ scrollbarGutter: "auto" }}>
              {activeSection ? (
                <ul className="list-none p-0 m-0">
                  {(activeSection.lessons || []).map((l) => (
                    <LessonRow key={l.id} l={l} active={l.id === activeLessonId} onSelect={setActiveLessonId} />
                  ))}
                </ul>
              ) : (
                <div className="px-3 py-6 text-slate-500 text-sm">Select a section to view its lessons.</div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
