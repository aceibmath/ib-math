// src/app/(content)/AI_HL/teacher-lessons/lesson/[id]/page.jsx
"use client";

import { use } from "react";
import Link from "next/link";

// Albastru-teal închis pentru AI HL (conform globals.css)
const ACCENT = "var(--ai-hl-dark)";

export default function LessonPage({ params }) {
  const { id } = use(params);   // ex: "1.1.1"
  const current = `Lesson ${id}`;

  return (
    <div className="min-h-[100vh] bg-white">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 pt-3 md:pt-4">

        {/* Breadcrumb (accent albastru-teal închis AI HL) */}
        <nav aria-label="Breadcrumb" className="mb-2 md:mb-3 text-sm text-slate-600">
          <ul className="flex items-center gap-2 list-none p-0 m-0">
            <li><Link href="/" className="hover:underline !text-[var(--ai-hl-dark)]">Home</Link></li>
            <li aria-hidden="true" className="!text-[var(--ai-hl-dark)]">›››</li>

            <li><Link href="/AI_HL" className="hover:underline !text-[var(--ai-hl-dark)]">AI HL</Link></li>
            <li aria-hidden="true" className="!text-[var(--ai-hl-dark)]">›››</li>

            <li><Link href="/AI_HL/teacher-lessons" className="hover:underline !text-[var(--ai-hl-dark)]">Teacher Lessons</Link></li>
            <li aria-hidden="true" className="!text-[var(--ai-hl-dark)]">›››</li>

            <li className="text-slate-500">{current}</li>
          </ul>
        </nav>

        {/* Linie top (5px, albastru-teal închis) */}
        <div className="rounded-full" style={{ height: 5, backgroundColor: ACCENT }} />

        {/* Canvas lecție */}
        <section className="relative mt-4 md:mt-6 min-h-[70vh]">
          <div className="prose max-w-none">
            <p className="text-slate-600">
              Full-screen lesson canvas for <strong>{current}</strong>. (Slides, Desmos/GeoGebra, quizzes, etc. will go here.)
            </p>
          </div>

          {/* Linie bottom (pinned, albastru-teal închis) */}
          <div
            className="absolute left-0 right-0 rounded-full"
            style={{ bottom: 0, height: 5, backgroundColor: ACCENT }}
          />
        </section>
      </div>
    </div>
  );
}
