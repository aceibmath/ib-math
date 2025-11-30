// src/app/(content)/AI_SL/prediction-exams/page.js
// server component
export const metadata = {
  title: "IB Mathematics AI SL — Prediction Exams",
};

import PageHeader from "@/components/ui/PageHeader";
import PredictionTitleCard from "@/components/predictionexams/PredictionTitleCard";
import PredictionClient from "./PredictionClient";
import { INDEX as AI_SL_PRED_INDEX } from "@/data/prediction-exams/ai-sl/index.js";

// helpers (cohorta cea mai recentă + seturile disponibile)
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

export default function Page() {
  const cohort = latestCohort(AI_SL_PRED_INDEX); // ex. 2025 November
  const sets = setsFor(
    AI_SL_PRED_INDEX,
    cohort.year,
    cohort.session
  ); // ex. [1..5]

  // gri foarte închis folosit peste tot la headings statice
  const DARK_TEXT = "rgb(30 41 59)";

  return (
    <PageHeader>
      {/* card pastel AI SL (galben cald) */}
      <PredictionTitleCard course="AI SL" theme="ai-sl" />

      {/* Heading cohortă: nu color curs, ci gri foarte închis */}
      <h2
        className="mt-4 mb-3 text-xl md:text-2xl font-semibold"
        style={{ color: DARK_TEXT }}
      >
        {cohort.session} {cohort.year} Prediction Exams
      </h2>

      {/* Set-uri + Paper 1 / Paper 2 */}
      <section className="mt-1">
        <PredictionClient
          index={AI_SL_PRED_INDEX}
          defaultYear={cohort.year}
          defaultSession={cohort.session}
          availableSets={sets}
        />
      </section>
    </PageHeader>
  );
}
