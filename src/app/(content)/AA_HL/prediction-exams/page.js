// src/app/(content)/AA_HL/prediction-exams/page.js
export const metadata = {
  title: "IB Mathematics AA HL — Prediction Exams",
};

import PageHeader from "@/components/ui/PageHeader";
import PredictionTitleCard from "@/components/predictionexams/PredictionTitleCard";
import PredictionClient from "./PredictionClient";
import { INDEX as AA_HL_PRED_INDEX } from "@/data/prediction-exams/aa-hl/index.js";

// ---------- helpers ----------
function latestCohort(index) {
  if (!Array.isArray(index) || index.length === 0)
    return { year: 2025, session: "November" };

  const years = [...new Set(index.map((x) => x.year))]
    .filter(Boolean)
    .sort((a, b) => b - a);

  const y = years[0];
  const sesForY = index
    .filter((x) => x.year === y)
    .map((x) => x.session);

  const hasNov = sesForY.includes("November");
  return { year: y, session: hasNov ? "November" : "May" };
}

function setsFor(index, year, session) {
  return [...new Set(
    index
      .filter((x) => x.year === year && x.session === session)
      .map((x) => x.set)
  )].sort((a, b) => a - b);
}

// ---------- page ----------
export default function Page() {
  const cohort = latestCohort(AA_HL_PRED_INDEX);
  const sets = setsFor(
    AA_HL_PRED_INDEX,
    cohort.year,
    cohort.session
  );

  // gri foarte închis folosit deja la AA SL prediction: rgb(30 41 59)
  const DARK_TEXT = "rgb(30 41 59)";

  return (
    <PageHeader>
      {/* cardul pastel mov pentru AA HL */}
      <PredictionTitleCard course="AA HL" theme="aa-hl" />

      {/* Heading cohortă */}
      <h2
        className="mt-4 mb-3 text-xl md:text-2xl font-semibold"
        style={{ color: DARK_TEXT }}
      >
        {cohort.session} {cohort.year} Prediction Exams
      </h2>

      {/* Set-uri + P1/P2/P3 */}
      <section className="mt-1">
        <PredictionClient
          index={AA_HL_PRED_INDEX}
          defaultYear={cohort.year}
          defaultSession={cohort.session}
          availableSets={sets}
        />
      </section>
    </PageHeader>
  );
}
