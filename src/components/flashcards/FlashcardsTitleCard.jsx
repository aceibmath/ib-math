// src/components/flashcards/FlashcardsTitleCard.jsx
// server component

export default function FlashcardsTitleCard({
  course = "AA SL",
  theme = "aa-sl", // "aa-sl" | "aa-hl" | "ai-sl" | "ai-hl"
}) {
  // culori consistente cu Questionbank / PastPapers / Prediction
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
      // fallback safe (AA SL teal pastel)
      bg: "bg-gradient-to-b from-emerald-50 to-emerald-100/40",
    };

  return (
    <section
      className={`rounded-3xl border border-slate-200 ${palette.bg} px-4 md:px-5 py-2 md:py-3 shadow-sm`}
    >
      <h1 className="text-[26px] sm:text-[30px] md:text-[34px] leading-tight font-semibold tracking-tight text-teal-900">
        {course} Flashcards
      </h1>

      <p className="mt-1 text-[14px] md:text-[16px] text-teal-800">
        Build mastery in {course} with concise flashcards designed for short,
        focused study sessions. 
      </p>
    </section>
  );
}
