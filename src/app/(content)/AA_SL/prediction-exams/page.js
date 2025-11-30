// src/app/(content)/AA_SL/prediction-exams/page.js
export const dynamic = "force-dynamic";
export const metadata = { title: "AA SL Prediction Exams" };

import PageHeader from "@/components/ui/PageHeader";
import PredictionTitleCard from "@/components/predictionexams/PredictionTitleCard";
import PredictionClient from "./PredictionClient";

export default function Page() {
  const defaultYear = 2025;
  const defaultSession = "November";

  return (
    <PageHeader>
      {/* cardul verde pastel din hero (AA SL) */}
      <PredictionTitleCard course="AA SL" theme="aa-sl" />

      {/* Heading cohortă */}
      <h2 className="mt-4 mb-3 text-xl md:text-2xl font-semibold text-teal-900">
        {defaultSession} {defaultYear} Prediction Exams
      </h2>

      {/* selector Set + cardurile Paper */}
      <section className="mt-1">
        <PredictionClient
          defaultYear={defaultYear}
          defaultSession={defaultSession}
          availableSets={[1, 2, 3, 4, 5]}
        />
      </section>
    </PageHeader>
  );
}
