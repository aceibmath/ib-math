// src/components/predictionexams/PaperRenderer.jsx
export default function PaperHeader({ meta, coursePath = "/AA_SL/prediction-exams" }) {
  const label =
    meta?.title ||
    `${meta?.year} ${meta?.session} Prediction — Set ${meta?.set} · Paper ${meta?.paper}`;

  const courseRoot = coursePath.replace("/prediction-exams", ""); // ex: /AA_SL
  const calc = meta?.calculator ? ` · ${String(meta.calculator).toUpperCase()}` : "";

  return (
    <div className="mt-4 md:mt-6 mb-4">
      {/* Breadcrumb: Home ››› AA SL ››› Prediction Exams */}
      <nav className="mb-2 text-[13px] md:text-[14px] text-teal-900 font-medium">
        <a href="/" className="hover:underline">Home</a>
        <span className="mx-1">›››</span>
        <a href={courseRoot} className="hover:underline">{meta?.course || "AA SL"}</a>
        <span className="mx-1">›››</span>
        <a href={coursePath} className="hover:underline">Prediction Exams</a>
      </nav>

      {/* Titlu micșorat + NO CALCULATOR inclus aici */}
      <h1 className="text-[20px] sm:text-[22px] md:text-[24px] leading-snug font-medium text-teal-900">
        {label}{calc}
      </h1>

      {/* Al 3-lea rând eliminat (nu mai afișăm calculatorul aici) */}
      {/* <div className="mt-1 text-sm text-gray-600">{meta?.calculator}</div> */}
    </div>
  );
}
