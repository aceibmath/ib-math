// src/app/(content)/AI_HL/past-papers/[slug]/page.js
import React from "react";
import { headers } from "next/headers";
import { REGISTRY } from "@/data/past-papers/ai-hl/registry.js";
import ProblemRow from "@/components/questionbank/ProblemRowAIHL.jsx";
import PaperHeader from "@/components/pastpapers/PaperHeader.jsx";

export async function generateMetadata({ params }) {
  const title = params?.slug?.toUpperCase().replace(/-/g, " ") || "Paper";
  return { title: `AI HL — ${title}` };
}

export default async function Page({ params }) {
  const slug = params.slug; // ex: "ai-hl-2024-may-tz1-p1"
  const loader = REGISTRY[slug];

  // 🔎 inferăm audiența din Referer (teacher/student)
  const referer = (await headers()).get("referer") || "";
  const isTeacher =
    /\/AI_HL(?:\?|$).*aud=teacher/.test(referer) ||
    /\/AI_HL\/past-papers\?aud=teacher/.test(referer);
  const isStudent =
    /\/AI_HL(?:\?|$).*aud=student/.test(referer) ||
    /\/AI_HL\/past-papers\?aud=student/.test(referer);

  const aud = isTeacher ? "teacher" : isStudent ? "student" : undefined;
  const coursePath = aud ? `/AI_HL/past-papers?aud=${aud}` : "/AI_HL/past-papers";

  if (!loader) {
    return (
      <main className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8 pt-3 md:pt-8">
        <h1 className="text-xl font-semibold">AI HL — Past Paper</h1>
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

  const mod = await loader();
  const data = mod.default || mod;
  const { meta, problems = [] } = data;

  return (
    <main className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8 pt-3 md:pt-8">
      {/* Header cu breadcrumb + titlu mare stilizat */}
      <PaperHeader
        meta={meta}
        coursePath={coursePath}     // ← păstrăm ?aud în breadcrumb
        courseLabel="AI HL"
        themeColor="#0E7490"        // culoare AI HL
      />

      {/* Lista de întrebări ale examenului */}
      <section className="mt-5 md:mt-6 space-y-6 pb-16">
        {problems.map((p, i) => (
          <ProblemRow key={p.id || i} p={p} index={i} hideCalcBadge={false} />
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
