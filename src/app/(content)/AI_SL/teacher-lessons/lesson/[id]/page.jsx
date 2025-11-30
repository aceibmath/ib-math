// src/app/(content)/AI_SL/teacher-lessons/lesson/[id]/page.jsx
"use client";

import { use } from "react";
import Link from "next/link";

// Portocaliu-închis pentru AI SL (conform globals.css)
const ACCENT = "var(--ai-sl-dark)";

export default function LessonPage({ params }) {
  const { id } = use(params);              // ex: "1.1.1"
  const current = `Lesson ${id}`;

  return (
    <div className="min-h-[100vh] bg-white">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 pt-3 md:pt-4">

        {/* Breadcrumb (accent portocaliu-închis AI SL) */}
        <nav aria-label="Breadcrumb" className="mb-2 md:mb-3 text-sm text-slate-600">
          <ul className="flex items-center gap-2 list-none p-0 m-0">
            <li>
              <Link href="/" className="hover:underline !text-[var(--ai-sl-dark)]">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="!text-[var(--ai-sl-dark)]">›››</li>

            <li>
              <Link href="/AI_SL" className="hover:underline !text-[var(--ai-sl-dark)]">
                AI SL
              </Link>
            </li>
            <li aria-hidden="true" className="!text-[var(--ai-sl-dark)]">›››</li>

            <li>
              <Link
                href="/AI_SL/teacher-lessons"
                className="hover:underline !text-[var(--ai-sl-dark)]"
              >
                Teacher Lessons
              </Link>
            </li>

            {/* Pagina curentă — ne-clicabilă, gri */}
            <li aria-hidden="true" className="!text-[var(--ai-sl-dark)]">›››</li>
            <li className="text-slate-500">{current}</li>
          </ul>
        </nav>

        {/* Linie top (5px, portocaliu-închis) */}
        <div
          className="rounded-full"
          style={{ height: 5, backgroundColor: ACCENT }}
        />

        {/* Zona de lecție între cele două linii */}
        <section className="relative mt-4 md:mt-6 min-h-[70vh]">
          {/* Conținutul real al lecției */}
          <div className="prose max-w-none">
            <p className="text-slate-600">
              Full-screen lesson canvas for <strong>{current}</strong>.
              (Slides, Desmos/GeoGebra, quizzes, etc. will go here.)
            </p>
          </div>

          {/* Linie bottom (pinned, portocaliu-închis) */}
          <div
            className="absolute left-0 right-0 rounded-full"
            style={{ bottom: 0, height: 5, backgroundColor: ACCENT }}
          />
        </section>
      </div>
    </div>
  );
}
