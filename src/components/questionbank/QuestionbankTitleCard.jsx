// src/components/questionbank/QuestionbankTitleCard.jsx
// server component — unificat pentru toate cele 4 cursuri
// urmează exact structura din TeacherLessonsTitleCard

export default function QuestionbankTitleCard({
  course = "AA SL",
  theme = "aa-sl", // aa-sl | aa-hl | ai-sl | ai-hl
}) {
  // Fundaluri unice per curs; textul rămâne teal.
  const palette = {
    "aa-sl": {
      bg: "bg-gradient-to-b from-emerald-50 to-emerald-100/40", // verde-albăstrui pastel (AA SL)
    },
    "aa-hl": {
      bg: "bg-gradient-to-b from-[#F3E8FF] to-[#EDE9FE]", // mov pastel (AA HL)
    },
    "ai-sl": {
      bg: "bg-gradient-to-b from-[#FFFBEB] to-[#FEF3C7]", // galben cald pastel (AI SL)
    },
    "ai-hl": {
      bg: "bg-gradient-to-b from-[#ECFEFF] to-[#CFFAFE]", // aqua / albastru-verzui pastel (AI HL)
    },
  }[theme];

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
        {course} Questionbank
      </h1>

      <p className="mt-1 text-[14px] md:text-[16px] text-teal-800">
        The {course} Questionbank provides a structured collection of IB-style questions covering the entire syllabus. Each item includes a detailed worked solution, supporting students in developing conceptual understanding, accuracy, and confidence across all topics.
      </p>
    </section>
  );
}
