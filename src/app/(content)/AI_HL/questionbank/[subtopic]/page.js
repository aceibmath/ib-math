// src/app/(content)/AI_HL/questionbank/[subtopic]/page.js
export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { headers } from "next/headers";           // ✅ ca să citim Referer
import Link from "next/link";
import SubtopicListAIHL from "@/components/questionbank/SubtopicListAIHL";
import data from "@/data/questionbank/ai-hl/index";

// SUBTOPIC LABELS exact ca în dataset
const LABELS = [
  // Topic 1 — Number & Algebra
  "Sequences & Series",
  "Financial Mathematics",
  "Systems of Linear Equations",

  // Topic 2 — Functions
  "Linear Equations & Graphs",
  "Applications of Functions",
  "Properties of Functions",

  // Topic 3 — Geometry & Trigonometry
  "3D Shapes",
  "Trigonometry",
  "Voronoi Diagrams",

  // Topic 4 — Statistics & Probability
  "Univariate Statistics",
  "Bivariate Statistics",
  "Probability",
  "Distributions",
  "Hypothesis Testing",

  // Topic 5 — Calculus
  "Differentiation",
  "Integration",
];

// slugify simplu
function slugify(label) {
  return label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function Page({ params }) {
  // ex: /AI_HL/questionbank/sequences-series
  const slugFromUrl = decodeURIComponent(params.subtopic || "").toLowerCase();
  const label = LABELS.find((l) => slugify(l) === slugFromUrl);
  if (!label) return notFound();

  // Elementele subtopicului
  const items = data.filter((p) =>
    Array.isArray(p.subtopics) ? p.subtopics.includes(label) : p.subtopic === label
  );

  // 🔎 inferăm audiența din Referer – păstrăm ruta teacher/student
  const referer = headers().get("referer") || "";
  const isTeacher =
    /\/AI_HL(?:\?|$).*aud=teacher/.test(referer) ||
    /\/AI_HL\/questionbank\?aud=teacher/.test(referer);

  const audSuffix = isTeacher ? "?aud=teacher" : "?aud=student";
  const hlLink   = `/AI_HL${audSuffix}`;
  const qbLink   = `/AI_HL/questionbank${audSuffix}`;

  return (
    <div className="min-h-[100vh] bg-white">
      <div className="mx-auto px-4 md:px-6 pt-3 md:pt-4" style={{ maxWidth: 1280 }}>
        {/* === BREADCRUMB AI HL (culoarea temei) === */}
        <nav aria-label="Breadcrumb" className="mb-2 md:mb-3 text-sm text-slate-600">
          <ul className="flex items-center gap-2 list-none p-0 m-0">
            <li>
              <Link href="/" className="hover:underline" style={{ color: "var(--ai-hl-dark)" }}>
                Home
              </Link>
            </li>

            <li aria-hidden="true" style={{ color: "var(--ai-hl-dark)" }}>›››</li>

            <li>
              <Link href={hlLink} className="hover:underline" style={{ color: "var(--ai-hl-dark)" }}>
                AI HL
              </Link>
            </li>

            <li aria-hidden="true" style={{ color: "var(--ai-hl-dark)" }}>›››</li>

            <li>
              <Link href={qbLink} className="hover:underline" style={{ color: "var(--ai-hl-dark)" }}>
                Questionbank
              </Link>
            </li>

            <li aria-hidden="true" style={{ color: "var(--ai-hl-dark)" }}>›››</li>

            <li className="text-slate-500">{label}</li>
          </ul>
        </nav>

        {/* === LISTA DE PROBLEME === */}
        <section className="relative mt-4 md:mt-6 min-h-[60vh] pb-10">
          <SubtopicListAIHL subtopicLabel={label} allItems={items} />
        </section>
      </div>
    </div>
  );
}
