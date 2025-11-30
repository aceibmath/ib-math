// src/components/pastpapers/PastPapersTitleCard.jsx
// server component

export default function PastPapersTitleCard({
  course = "AA SL",
  theme = "aa-sl", // "aa-sl" | "aa-hl" | "ai-sl" | "ai-hl"
}) {
  const isAI = course.trim().startsWith("AI");
  const level = course.includes("SL") ? "Standard" : "Higher";
  const family = isAI
    ? "Applications & Interpretation"
    : "Analysis & Approaches";

  // same palettes as QuestionbankTitleCard (do NOT invent new colors)
  const palette = {
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
    // fallback just in case: AA SL look
    bg: "bg-gradient-to-b from-emerald-50 to-emerald-100/40",
  };

  return (
    <section
      className={`
        rounded-3xl border border-slate-200
        ${palette.bg}
        px-4 md:px-5 py-2 md:py-3 shadow-sm
        mb-4
      `}
    >
      <h1
        className="
          text-[26px] sm:text-[30px] md:text-[34px]
          leading-tight font-semibold tracking-tight text-teal-900
        "
      >
        {course} Past Papers
      </h1>

      <p className="mt-1 text-[14px] md:text-[16px] text-teal-800">
        Browse the {family} {level} Level past papers by year, session and time
        zone.
      </p>
    </section>
  );
}
