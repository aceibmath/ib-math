// src/app/(content)/AA_SL/teacher-lessons/lesson/[id]/page.jsx
"use client";

import { use } from "react";
import Link from "next/link";

const TEAL = "#0f766e";

export default function LessonPage({ params }) {
  // Next.js app router: params este Promise în client components
  const { id } = use(params);              // ex: "1.1.1"
  const current = `Lesson ${id}`;

  return (
    <div className="min-h-[100vh] bg-white">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 pt-3 md:pt-4">

        {/* Breadcrumb (același stil ca în flashcards) */}
        <nav aria-label="Breadcrumb" className="mb-2 md:mb-3 text-sm text-slate-600">
          <ul className="flex items-center gap-2 list-none p-0 m-0">
            <li>
              <Link href="/" className="hover:underline !text-[#0f766e]">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="!text-[#0f766e]">›››</li>

            <li>
              <Link href="/AA_SL" className="hover:underline !text-[#0f766e]">
                AA SL
              </Link>
            </li>
            <li aria-hidden="true" className="!text-[#0f766e]">›››</li>

            <li>
              <Link
                href="/AA_SL/teacher-lessons"
                className="hover:underline !text-[#0f766e]"
              >
                Teacher Lessons
              </Link>
            </li>

            {/* Pagina curentă — ne-clicabilă, gri */}
            <li aria-hidden="true" className="!text-[#0f766e]">›››</li>
            <li className="text-slate-500">{current}</li>
          </ul>
        </nav>

        {/* linia de sus (≈5px) */}
        <div
          className="rounded-full"
          style={{ height: 5, backgroundColor: TEAL }}
        />

        {/* Zona de lecție între cele două linii */}
        <section className="relative mt-4 md:mt-6 min-h-[70vh]">
          {/* Conținutul real al lecției vine aici */}
          <div className="prose max-w-none">
            <p className="text-slate-600">
              Full-screen lesson canvas for <strong>{current}</strong>.
              (Slides, Desmos/GeoGebra, quizzes, etc. will go here.)
            </p>
          </div>

          {/* linia de jos (pinned) */}
          <div
            className="absolute left-0 right-0 rounded-full"
            style={{ bottom: 0, height: 5, backgroundColor: TEAL }}
          />
        </section>
      </div>
    </div>
  );
}
