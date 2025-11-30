// src/app/(content)/AA_HL/questionbank/[subtopic]/page.js
export const dynamic = "force-dynamic";

import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";

import data from "@/data/questionbank/aa-hl/index";
import SubtopicListAAHL from "@/components/questionbank/SubtopicListAAHL";

// Toate etichetele AA HL
const LABELS = [
  "Sequences & Series",
  "Exponents & Logs",
  "Binomial Theorem",
  "Counting Principles",
  "Proofs",
  "Complex Numbers",
  "Systems of Linear Equations",
  "Function Properties",
  "Quadratics",
  "Rational Functions",
  "Exp/Log Functions",
  "Transformations",
  "Inequalities",
  "Polynomials",
  "Geo & Trig in 2D & 3D",
  "Trig Functions",
  "Vectors",
  "Univariate Statistics",
  "Bivariate Statistics",
  "Probability",
  "Distributions",
  "Differentiation",
  "Integration",
  "Kinematics",
  "Differential Equations",
  "Maclaurin Series",
];

// slugify
function slugify(label) {
  return label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default async function Page({ params, searchParams }) {
  const p = await params;
  const sp = await searchParams;

  const slug = decodeURIComponent(p.subtopic || "").toLowerCase();
  const label = LABELS.find((l) => slugify(l) === slug);
  if (!label) return notFound();

  // determinăm audiența (teacher/student)
  let aud = sp?.aud || "";

  // dacă lipsește aud, o deducem din referer
  if (!aud) {
    const referer = headers().get("referer") || "";
    if (referer.includes("aud=teacher")) aud = "teacher";
    else if (referer.includes("aud=student")) aud = "student";
  }

  // stabilim linkurile breadcrumbs în funcție de aud
  const aaLink = aud === "teacher" ? "/AA_HL?aud=teacher" : "/AA_HL?aud=student";
  const qbLink =
    aud === "teacher"
      ? "/AA_HL/questionbank?aud=teacher"
      : "/AA_HL/questionbank?aud=student";

  // extragem problemele din dataset
  const items = data.filter((p) =>
    Array.isArray(p.subtopics)
      ? p.subtopics.includes(label)
      : p.subtopic === label
  );

  const HL_COLOR = "#7E22CE";

  return (
    <div className="min-h-[100vh] bg-white">
      <div className="mx-auto px-4 md:px-6 pt-3 md:pt-4" style={{ maxWidth: 1280 }}>
        {/* === BREADCRUMB AA HL === */}
        <nav aria-label="Breadcrumb" className="mb-2 md:mb-3 text-sm text-slate-600">
          <ul className="flex items-center gap-2 list-none p-0 m-0">
            {/* Home */}
            <li>
              <Link href="/" className="hover:underline" style={{ color: HL_COLOR }}>
                Home
              </Link>
            </li>

            <li aria-hidden="true" style={{ color: HL_COLOR }}>›››</li>

            {/* AA HL */}
            <li>
              <Link href={aaLink} className="hover:underline" style={{ color: HL_COLOR }}>
                AA HL
              </Link>
            </li>

            <li aria-hidden="true" style={{ color: HL_COLOR }}>›››</li>

            {/* Questionbank */}
            <li>
              <Link href={qbLink} className="hover:underline" style={{ color: HL_COLOR }}>
                Questionbank
              </Link>
            </li>

            <li aria-hidden="true" style={{ color: HL_COLOR }}>›››</li>

            {/* subtopic curent */}
            <li className="text-slate-500">{label}</li>
          </ul>
        </nav>

        {/* === LISTĂ PROBLEME === */}
        <section className="relative mt-4 md:mt-6 min-h-[60vh] pb-10">
          <SubtopicListAAHL subtopicLabel={label} allItems={items} />
        </section>
      </div>
    </div>
  );
}
