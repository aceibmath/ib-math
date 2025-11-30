// src/app/(content)/AA_SL/past-papers/[slug]/page.js
import React from "react";
import { headers } from "next/headers";                // 👈 pentru Referer
import { REGISTRY } from "@/data/past-papers/aa-sl/registry.js";
import ProblemRow from "@/components/questionbank/ProblemRow.jsx";
import PaperHeader from "@/components/pastpapers/PaperHeader.jsx";

export async function generateMetadata({ params }) {
  const title = params?.slug?.toUpperCase().replace(/-/g, " ") || "Paper";
  return { title: `AA SL — ${title}` };
}

export default async function Page({ params }) {
  const slug = params.slug; // ex: "aa-sl-2024-may-tz1-p1"
  const loader = REGISTRY[slug];

  if (!loader) {
    return (
      <main className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8 pt-3 md:pt-8">
        <h1 className="text-xl font-semibold">AA SL — Past Paper</h1>
        <p className="mt-2">
          Nu există dataset pentru: <code>{slug}</code>
        </p>
        <p className="mt-2">
          <a className="underline" href="/AA_SL/past-papers">Înapoi la index</a>
        </p>
      </main>
    );
  }

  // 🔎 inferăm audiența din Referer și o păstrăm în breadcrumb
  const referer = headers().get("referer") || "";
  const isTeacher =
    /\/AA_SL(?:\?|$).*aud=teacher/.test(referer) ||
    /\/AA_SL\/past-papers\?aud=teacher/.test(referer);
  const audSuffix = isTeacher ? "?aud=teacher" : "?aud=student";

  const mod = await loader();
  const data = mod.default || mod;
  const { meta, problems = [] } = data;

  return (
    <main className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8 pt-3 md:pt-8">
      {/* Header cu breadcrumb și titlu în teal */}
      <PaperHeader
        meta={meta}
        coursePath={`/AA_SL/past-papers${audSuffix}`}  // 👈 păstrăm aud
        courseLabel="AA SL"
        themeColor="#0F766E"
      />

      {/* Lista de întrebări */}
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
