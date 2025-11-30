// src/components/predictionexams/PaperHeader.jsx
export default function PaperHeader({
  meta,
  coursePath = "/AA_SL/prediction-exams",
}) {
  // ex.: /AA_SL
  const courseRoot = coursePath.replace("/prediction-exams", "") || "/AA_SL";

  // Derivăm eticheta cursului (AA SL / AA HL / AI SL / AI HL)
  const courseKeyFromPath = (coursePath.split("/")[1] || "AA_SL"); // AA_SL, AA_HL, AI_SL, AI_HL
  const courseLabelFromPath = courseKeyFromPath.replace(/_/g, " "); // -> "AA SL", "AA HL", ...

  const courseLabel = meta?.course || courseLabelFromPath;

  const title =
    meta?.title ||
    `Mathematics ${courseLabel} — ${meta?.year} ${meta?.session} Prediction — Set ${meta?.set} · Paper ${meta?.paper}`;

  const calcSuffix = meta?.calculator
    ? ` · ${String(meta.calculator).toUpperCase()}`
    : "";

  return (
    <header className="mb-3">
      {/* Breadcrumb: Home >>> {Course} >>> Prediction Exams */}
      <nav className="mb-4 md:mb-5 text-sm">
        <a href="/" className="text-teal-900 hover:underline">Home</a>
        <span className="mx-1 text-teal-900">›››</span>
        <a href={courseRoot} className="text-teal-900 hover:underline">
          {courseLabel}
        </a>
        <span className="mx-1 text-teal-900">›››</span>
        <a href={coursePath} className="text-teal-900 hover:underline">
          Prediction Exams
        </a>
      </nav>

      {/* Titlu + calculator în aceeași linie, stil identic cu AA SL */}
      <h1 className="text-[20px] sm:text-[22px] md:text-[24px] leading-snug font-medium text-teal-900">
        {title}
        {calcSuffix}
      </h1>
    </header>
  );
}
