// src/app/(content)/AA_HL/past-papers/[slug]/page.js
import React from "react";
import { headers } from "next/headers";
import { REGISTRY } from "@/data/past-papers/aa-hl/registry.js";
import ProblemRowAAHL from "@/components/questionbank/ProblemRowAAHL.jsx";
import PaperHeader from "@/components/pastpapers/PaperHeader.jsx";

export async function generateMetadata({ params }) {
  const title = params?.slug?.toUpperCase().replace(/-/g, " ") || "Paper";
  return { title: `AA HL — ${title}` };
}

export default async function Page({ params }) {
  const slug = params.slug; // ex: "aa-hl-2024-may-tz1-p1"
  const loader = REGISTRY[slug];

  // 🔎 inferăm audiența din Referer (menține fluxul teacher/student)
  const referer = (await headers()).get("referer") || "";
  const isTeacher =
    /\/AA_HL(?:\?|$).*aud=teacher/.test(referer) ||
    /\/AA_HL\/past-papers\?aud=teacher/.test(referer);
  const isStudent =
    /\/AA_HL(?:\?|$).*aud=student/.test(referer) ||
    /\/AA_HL\/past-papers\?aud=student/.test(referer);

  const aud = isTeacher ? "teacher" : isStudent ? "student" : undefined;
  const coursePath = aud ? `/AA_HL/past-papers?aud=${aud}` : "/AA_HL/past-papers";

  if (!loader) {
    return (
      <main className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8 pt-3 md:pt-8">
        <h1 className="text-xl font-semibold">AA HL — Past Paper</h1>
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
      {/* Header cu breadcrumb și titlu mov AA HL */}
      <PaperHeader
        meta={meta}
        coursePath={coursePath}   // <— păstrează ?aud=...
        courseLabel="AA HL"
        themeColor="#7E22CE"      // mov închis AA HL
      />

      {/* Lista de întrebări din paper */}
      <section className="mt-5 md:mt-6 space-y-6 pb-16">
        {problems.map((p, i) => (
          <ProblemRowAAHL
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
