// src/app/(content)/AA_HL/prediction-exams/[slug]/page.js
import React from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { REGISTRY } from "@/data/prediction-exams/aa-hl/registry.js";
import ProblemRowAAHL from "@/components/questionbank/ProblemRowAAHL.jsx";

export async function generateMetadata({ params }) {
  const title = params?.slug?.toUpperCase().replace(/-/g, " ") || "Prediction Exam";
  return { title: `AA HL — ${title}` };
}

export default async function Page({ params }) {
  const slug = params.slug; // ex: "aa-hl-2025-nov-set1-p1"
  const loader = REGISTRY[slug];

  // 🔎 inferăm audiența din Referer (teacher/student)
  const referer = (await headers()).get("referer") || "";
  const isTeacher =
    /\/AA_HL(?:\?|$).*aud=teacher/.test(referer) ||
    /\/AA_HL\/prediction-exams\?aud=teacher/.test(referer);
  const isStudent =
    /\/AA_HL(?:\?|$).*aud=student/.test(referer) ||
    /\/AA_HL\/prediction-exams\?aud=student/.test(referer);

  const aud = isTeacher ? "teacher" : isStudent ? "student" : undefined;
  const aaLink = aud ? `/AA_HL?aud=${aud}` : "/AA_HL";
  const indexLink = aud ? `/AA_HL/prediction-exams?aud=${aud}` : "/AA_HL/prediction-exams";

  if (!loader) {
    return (
      <main className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8 pt-3 md:pt-8">
        <nav className="mb-4 md:mb-5 text-sm">
          <Link href="/" className="text-[#7E22CE] hover:underline">Home</Link>
          <span className="mx-1 text-[#7E22CE]">›››</span>
          <Link href={aaLink} className="text-[#7E22CE] hover:underline">AA HL</Link>
          <span className="mx-1 text-[#7E22CE]">›››</span>
          <Link href={indexLink} className="text-[#7E22CE] hover:underline">Prediction Exams</Link>
        </nav>
        <h1 className="text-[20px] sm:text-[22px] md:text-[24px] leading-snug font-medium text-slate-800">
          AA HL — Prediction Exam
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Nu există dataset pentru: <code className="text-pink-700 font-mono text-[13px] break-all">{slug}</code>
        </p>
        <p className="mt-4 text-sm">
          <Link href={indexLink} className="underline text-slate-700 hover:text-slate-900">Înapoi la index</Link>
        </p>
      </main>
    );
  }

  const mod = await loader();
  const data = mod.default || mod;
  const { meta = {}, problems = [] } = data;

  const HL = "#7E22CE";
  const Dot = () => (
    <span
      aria-hidden
      style={{ backgroundColor: HL }}
      className="inline-block w-[6px] h-[6px] rounded-full align-[0.2em] mx-2"
    />
  );

  const hasCalc = !!meta?.calculator;

  return (
    <main className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8 pt-3 md:pt-8">
      {/* Breadcrumb în culoarea cursului, păstrând ?aud */}
      <header className="mb-6">
        <nav className="mb-4 md:mb-5 text-sm">
          <Link href="/" className="text-[#7E22CE] hover:underline">Home</Link>
          <span className="mx-1 text-[#7E22CE]">›››</span>
          <Link href={aaLink} className="text-[#7E22CE] hover:underline">AA HL</Link>
          <span className="mx-1 text-[#7E22CE]">›››</span>
          <Link href={indexLink} className="text-[#7E22CE] hover:underline">Prediction Exams</Link>
        </nav>

        {/* Titlul gri închis + puncte mov */}
        <h1 className="text-[20px] sm:text-[22px] md:text-[24px] leading-snug font-medium text-slate-800">
          <span>Mathematics {meta.course || "AA HL"}</span>
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

      {/* Întrebări */}
      <section className="mt-5 md:mt-6 space-y-6 pb-16">
        {problems.map((p, i) => (
          <ProblemRowAAHL key={p.id || i} p={p} index={i} hideCalcBadge={true} />
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
