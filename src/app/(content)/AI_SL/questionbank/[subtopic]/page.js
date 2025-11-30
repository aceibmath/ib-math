// src/app/(content)/AI_SL/questionbank/[subtopic]/page.js
export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { headers } from "next/headers";        // ✅ corect
import Link from "next/link";
import SubtopicListAISL from "@/components/questionbank/SubtopicListAISL";
import data from "@/data/questionbank/ai-sl/index";

const LABELS = [
  "Number Skills",
  "Sequences & Series",
  "Financial Mathematics",
  "Systems of Linear Equations",
  "Linear Equations & Graphs",
  "Applications of Functions",
  "Properties of Functions",
  "3D Shapes",
  "Trigonometry",
  "Voronoi Diagrams",
  "Univariate Statistics",
  "Bivariate Statistics",
  "Probability",
  "Distributions",
  "Hypothesis Testing",
  "Differentiation",
  "Integration",
];

function slugify(label) {
  return label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function Page({ params }) {
  const slugFromUrl = decodeURIComponent(params.subtopic || "").toLowerCase();
  const label = LABELS.find((l) => slugify(l) === slugFromUrl);
  if (!label) return notFound();

  const items = data.filter((p) =>
    Array.isArray(p.subtopics) ? p.subtopics.includes(label) : p.subtopic === label
  );

  // 🔎 inferăm audiența din Referer (la fel ca la AA SL)
  const referer = headers().get("referer") || "";
  const isTeacher =
    /\/AI_SL(?:\?|$).*aud=teacher/.test(referer) ||
    /\/AI_SL\/questionbank\?aud=teacher/.test(referer);
  const isStudent =
    /\/AI_SL(?:\?|$).*aud=student/.test(referer) ||
    /\/AI_SL\/questionbank\?aud=student/.test(referer);

  const aud = isTeacher ? "teacher" : isStudent ? "student" : undefined;

  const aiLink = aud ? `/AI_SL?aud=${aud}` : "/AI_SL";
  const qbLink = aud ? `/AI_SL/questionbank?aud=${aud}` : "/AI_SL/questionbank";

  // culoarea (maro închis din tema AI SL)
  const AISL_COLOR = "#78350f";

  return (
    <div className="min-h-[100vh] bg-white">
      <div className="mx-auto px-4 md:px-6 pt-3 md:pt-4" style={{ maxWidth: 1280 }}>
        {/* === BREADCRUMB AI SL — păstrează audiența === */}
        <nav aria-label="Breadcrumb" className="mb-2 md:mb-3 text-sm text-slate-600">
          <ul className="flex items-center gap-2 list-none p-0 m-0">
            <li>
              <Link href="/" className="hover:underline" style={{ color: AISL_COLOR }}>
                Home
              </Link>
            </li>
            <li aria-hidden="true" style={{ color: AISL_COLOR }}>›››</li>

            <li>
              <Link href={aiLink} className="hover:underline" style={{ color: AISL_COLOR }}>
                AI SL
              </Link>
            </li>
            <li aria-hidden="true" style={{ color: AISL_COLOR }}>›››</li>

            <li>
              <Link href={qbLink} className="hover:underline" style={{ color: AISL_COLOR }}>
                Questionbank
              </Link>
            </li>
            <li aria-hidden="true" style={{ color: AISL_COLOR }}>›››</li>

            <li className="text-slate-500">{label}</li>
          </ul>
        </nav>

        {/* === CONȚINUT === */}
        <section className="relative mt-4 md:mt-6 min-h-[60vh] pb-10">
          <SubtopicListAISL subtopicLabel={label} allItems={items} />
        </section>
      </div>
    </div>
  );
}
