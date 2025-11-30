// src/components/teacher-lessons/TeacherLessonsTitleCard.jsx
// server component — unificat pentru toate cele 4 cursuri

export default function TeacherLessonsTitleCard({
  course = "AA SL",
  theme = "aa-sl", // aa-sl | aa-hl | ai-sl | ai-hl
}) {
  // Fundaluri unice per curs; textul rămâne teal.
  const palette = {
    "aa-sl": {
      bg: "bg-gradient-to-b from-emerald-50 to-emerald-100/40", // verde-albastrui
    },
    "aa-hl": {
      bg: "bg-gradient-to-b from-[#F3E8FF] to-[#EDE9FE]", // violet pastel
    },
    "ai-sl": {
      bg: "bg-gradient-to-b from-[#FFFBEB] to-[#FEF3C7]", // galben deschis pastel
    },
    "ai-hl": {
      bg: "bg-gradient-to-b from-[#ECFEFF] to-[#CFFAFE]", // albastru-verzui deschis pastel
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
        {course} Teacher Lessons
      </h1>

      <p className="mt-1 text-[14px] md:text-[16px] text-teal-800">
        Access IB DP topics, structured syllabus sections, and ready-to-teach lessons
      </p>
    </section>
  );
}
