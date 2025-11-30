// src/app/(content)/AI_SL/past-papers/[slug]/page.js
import React from "react";
import { headers } from "next/headers";
import { REGISTRY } from "@/data/past-papers/ai-sl/registry.js";
import ProblemRow from "@/components/questionbank/ProblemRowAISL.jsx";
import PaperHeader from "@/components/pastpapers/PaperHeader.jsx";

export async function generateMetadata({ params }) {
  const title = params?.slug?.toUpperCase().replace(/-/g, " ") || "Paper";
  return { title: `AI SL — ${title}` };
}

export default async function Page({ params }) {
  const slug = params.slug; // ex: "ai-sl-2024-may-tz1-p1"
  const loader = REGISTRY[slug];

  // 🔎 inferăm audiența din Referer
  const referer = (await headers()).get("referer") || "";
  const isTeacher =
    /\/AI_SL(?:\?|$).*aud=teacher/.test(referer) ||
    /\/AI_SL\/past-papers\?aud=teacher/.test(referer);
  const isStudent =
    /\/AI_SL(?:\?|$).*aud=student/.test(referer) ||
    /\/AI_SL\/past-papers\?aud=student/.test(referer);

  const aud = isTeacher ? "teacher" : isStudent ? "student" : undefined;
  const coursePath = aud ? `/AI_SL/past-papers?aud=${aud}` : "/AI_SL/past-papers";

  // fallback dacă nu există dataset pentru slug-ul cerut
  if (!loader) {
    return (
      <main className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8 pt-3 md:pt-8">
        <h1 className="text-xl font-semibold">AI SL — Past Paper</h1>
        <p className="mt-2">
          Nu există dataset pentru: <code>{slug}</code>
        </p>
        <p className="mt-2">
          <a className="underline" href={coursePath}>
            Înapoi la index
          </a>
        </p>
      </main>
    );
  }

  // încărcăm datasetul
  const mod = await loader();
  const data = mod.default || mod;
  const { meta, problems = [] } = data;

  return (
    <main className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8 pt-3 md:pt-8">
      {/* Header cu breadcrumb + titlu mare stilizat */}
      <PaperHeader
        meta={meta}
        coursePath={coursePath}   // ← păstrează audiența
        courseLabel="AI SL"
        themeColor="#78350f"      // culoarea AI SL
      />

      {/* Lista de întrebări ale examenului */}
      <section className="mt-5 md:mt-6 space-y-6 pb-16">
        {problems.map((p, i) => (
          <ProblemRow
            key={p.id || i}
            p={p}
            index={i}
            hideCalcBadge={false}
          />
        ))}

        {problems.length === 0 && (
          <div className="text-sm text-gray-500">
            Nu sunt încă probleme populate pentru acest paper.
          </div>
        )}
      </section>
    </main>
  );
}
