// src/app/(content)/AA_SL/questionbank/[subtopic]/page.js
export const dynamic = "force-dynamic";

import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import data from "@/data/questionbank/aa-sl/index";
import SubtopicList from "@/components/questionbank/SubtopicList";

const LABELS = [
  "Sequences & Series",
  "Exponents & Logarithms",
  "Binomial Theorem",
  "Proofs",
  "Introducing Functions",
  "Quadratic Equations and Functions",
  "Rational Functions",
  "Exponential and Logarithmic Functions",
  "Transformations of Functions",
  "Geometry & Trigonometry in 2D and 3D",
  "Trigonometric Functions",
  "Univariate Statistics",
  "Bivariate Statistics",
  "Probability",
  "Distributions",
  "Differentiation",
  "Integration",
  "Kinematics",
];

function slugify(label) {
  return label.toLowerCase().replace(/\s+/g, "-");
}

export default async function Page({ params, searchParams }) {
  const p = await params;
  const sp = await searchParams;

  const slug = decodeURIComponent(p.subtopic);
  const label = LABELS.find((l) => slugify(l) === slug);
  if (!label) return notFound();

  // --- determinăm corect audiența (teacher/student)
  let aud = sp?.aud || "";

  // dacă nu avem aud în searchParams, încercăm să-l deducem din referer
  if (!aud) {
    const referer = headers().get("referer") || "";
    if (referer.includes("aud=teacher")) aud = "teacher";
    else if (referer.includes("aud=student")) aud = "student";
  }

  // stabilim linkurile în funcție de aud
  const aaLink = aud === "teacher" ? "/AA_SL?aud=teacher" : "/AA_SL?aud=student";
  const qbLink =
    aud === "teacher"
      ? "/AA_SL/questionbank?aud=teacher"
      : "/AA_SL/questionbank?aud=student";

  const items = data.filter((p) =>
    Array.isArray(p.subtopics)
      ? p.subtopics.includes(label)
      : p.subtopic === label
  );

  return (
    <div className="min-h-[100vh] bg-white">
      <div className="mx-auto px-4 md:px-6 pt-3 md:pt-4" style={{ maxWidth: 1280 }}>
        {/* === BREADCRUMB === */}
        <nav aria-label="Breadcrumb" className="mb-2 md:mb-3 text-sm text-slate-600">
          <ul className="flex items-center gap-2 list-none p-0 m-0">
            <li>
              <Link href="/" className="hover:underline !text-[#0f766e]">
                Home
              </Link>
            </li>

            <li aria-hidden="true" className="!text-[#0f766e]">›››</li>

            <li>
              <Link href={aaLink} className="hover:underline !text-[#0f766e]">
                AA SL
              </Link>
            </li>

            <li aria-hidden="true" className="!text-[#0f766e]">›››</li>

            <li>
              <Link href={qbLink} className="hover:underline !text-[#0f766e]">
                Questionbank
              </Link>
            </li>

            <li aria-hidden="true" className="!text-[#0f766e]">›››</li>

            <li className="text-slate-500">{label}</li>
          </ul>
        </nav>

        {/* === SECȚIUNE CONȚINUT === */}
        <section className="relative mt-4 md:mt-6 min-h-[60vh] pb-10">
          <SubtopicList subtopicLabel={label} allItems={items} />
        </section>
      </div>
    </div>
  );
}
