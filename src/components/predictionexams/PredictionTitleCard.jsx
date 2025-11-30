// src/components/predictionexams/PredictionTitleCard.jsx
// server component (sau poate fi și client, nu contează pentru stil)

export default function PredictionTitleCard({
  course = "AA SL",
  theme = "aa-sl", // "aa-sl" | "aa-hl" | "ai-sl" | "ai-hl"
}) {
  // pentru textul din paragraf (Analysis & Approaches vs Applications & Interpretation)
  const isAI = course.trim().startsWith("AI");

  // paleta identică cu PastPapersTitleCard / QuestionbankTitleCard
  const palette =
    {
      "aa-sl": {
        bg: "bg-gradient-to-b from-emerald-50 to-emerald-100/40",
      },
      "aa-hl": {
        bg: "bg-gradient-to-b from-[#F3E8FF] to-[#EDE9FE]",
      },
      "ai-sl": {
        bg: "bg-gradient-to-b from-[#FFFBEB] to-[#FEF3C7]",
      },
      "ai-hl": {
        bg: "bg-gradient-to-b from-[#ECFEFF] to-[#CFFAFE]",
      },
    }[theme] || {
      // fallback de siguranță (AA SL look)
      bg: "bg-gradient-to-b from-emerald-50 to-emerald-100/40",
    };

  return (
    <section
      className={`
        rounded-3xl border border-slate-200
        ${palette.bg}
        px-4 md:px-5 py-2 md:py-3 shadow-sm
        mb-0
      `}
    >
      <h1
        className="
          text-[26px] sm:text-[30px] md:text-[34px]
          leading-tight font-semibold tracking-tight text-teal-900
        "
      >
        {course} Prediction Exams
      </h1>

      <p className="mt-1 text-[14px] md:text-[16px] text-teal-800">
      The {course}  Prediction Exams provide exam-style practice papers aligned with the IB syllabus. Each paper contains new, high-quality questions based on recent IB sessions and includes detailed worked solutions to support effective final exam preparation.
      </p>
    </section>
  );
}
