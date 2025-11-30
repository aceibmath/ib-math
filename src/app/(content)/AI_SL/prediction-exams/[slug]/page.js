// src/app/(content)/AI_SL/prediction-exams/[slug]/page.js
import React from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { REGISTRY } from "@/data/prediction-exams/ai-sl/registry.js";
import ProblemRowAISL from "@/components/questionbank/ProblemRowAISL.jsx";

export async function generateMetadata({ params }) {
  const title = params?.slug?.toUpperCase().replace(/-/g, " ") || "Prediction Exam";
  return { title: `AI SL — ${title}` };
}

export default async function Page({ params }) {
  const slug = params.slug;
  const loader = REGISTRY[slug];

  // 🔎 inferăm audiența din Referer (teacher/student) și o păstrăm în breadcrumb
  const referer = (await headers()).get("referer") || "";
  const isTeacher =
    /\/AI_SL(?:\?|$).*aud=teacher/.test(referer) ||
    /\/AI_SL\/prediction-exams\?aud=teacher/.test(referer);
  const isStudent =
    /\/AI_SL(?:\?|$).*aud=student/.test(referer) ||
    /\/AI_SL\/prediction-exams\?aud=student/.test(referer);

  const aud = isTeacher ? "teacher" : isStudent ? "student" : undefined;
  const aiLink = aud ? `/AI_SL?aud=${aud}` : "/AI_SL";
  const indexLink = aud ? `/AI_SL/prediction-exams?aud=${aud}` : "/AI_SL/prediction-exams";

  if (!loader) {
    return (
      <main className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8 pt-3 md:pt-8">
        <nav className="mb-4 md:mb-5 text-sm">
          <Link href="/" className="text-[#B45309] hover:underline">Home</Link>
          <span className="mx-1 text-[#B45309]">›››</span>
          <Link href={aiLink} className="text-[#B45309] hover:underline">AI SL</Link>
          <span className="mx-1 text-[#B45309]">›››</span>
          <Link href={indexLink} className="text-[#B45309] hover:underline">Prediction Exams</Link>
        </nav>
        <h1 className="text-[20px] sm:text-[22px] md:text-[24px] leading-snug font-medium text-slate-800">
          AI SL — Prediction Exam
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Nu există dataset pentru: <code className="text-pink-700 font-mono text-[13px] break-all">{slug}</code>
        </p>
      </main>
    );
  }

  const mod = await loader();
  const { meta = {}, problems = [] } = mod.default || mod;

  const AISL = "#B45309";
  const Dot = () => (
    <span
      aria-hidden
      className="inline-block w-[6px] h-[6px] rounded-full align-[0.2em] mx-2"
      style={{ backgroundColor: AISL }}
    />
  );
  const hasCalc = !!meta?.calculator;

  return (
    <main className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8 pt-3 md:pt-8">
      <header className="mb-6">
        <nav className="mb-4 md:mb-5 text-sm">
          <Link href="/" className="text-[#B45309] hover:underline">Home</Link>
          <span className="mx-1 text-[#B45309]">›››</span>
          <Link href={aiLink} className="text-[#B45309] hover:underline">AI SL</Link>
          <span className="mx-1 text-[#B45309]">›››</span>
          <Link href={indexLink} className="text-[#B45309] hover:underline">Prediction Exams</Link>
        </nav>

        <h1 className="text-[20px] sm:text-[22px] md:text-[24px] leading-snug font-medium text-slate-800">
          <span>Mathematics {meta.course || "AI SL"}</span>
          <Dot />
          <span>{meta.year} {meta.session} Prediction</span>
          <Dot />
          <span>Set {meta.set}</span>
          <Dot />
          <span>Paper {meta.paper}</span>
          {hasCalc && (
            <>
              <Dot />
              <span>{String(meta.calculator).toUpperCase()}</span>
            </>
          )}
        </h1>
      </header>

      <section className="mt-5 md:mt-6 space-y-6 pb-16">
        {problems.map((p, i) => (
          <ProblemRowAISL key={p.id || i} p={p} index={i} hideCalcBadge={true} />
        ))}
        {problems.length === 0 && (
          <div className="text-sm text-gray-500">
            Nu sunt încă probleme populate pentru acest prediction exam.
          </div>
        )}
      </section>
    </main>
  );
}
