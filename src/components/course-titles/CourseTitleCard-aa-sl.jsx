// src/components/course-titles/CourseTitleCard-aa-sl.jsx
// server component – aliniat la stilul unitar al cardurilor de titlu

export default function CourseTitleCardAASL() {
  return (
    <section
      className="
        rounded-3xl border border-slate-200
        bg-gradient-to-b from-emerald-50 to-emerald-100/40
        px-4 md:px-5 py-2 md:py-3 shadow-sm
      "
    >
      <h1 className="text-[26px] sm:text-[30px] md:text-[34px] leading-tight font-semibold tracking-tight text-teal-900">
        IB Mathematics Analysis &amp; Approaches SL
      </h1>
      <p className="mt-1 text-[14px] md:text-[16px] text-teal-800">
        Mathematics: Analysis and Approaches (SL) is a traditional, concept-driven
        mathematics course for students who enjoy abstraction, clear logical reasoning,
        and precise algebraic work. It emphasizes theoretical understanding, algebraic
        manipulation, proof-style thinking, problem-solving, and communicating
        mathematical arguments clearly. This course suits students who are confident
        without relying heavily on technology and who value understanding “why”
        methods work, not just “how.” It prepares learners for quantitatively demanding
        university pathways such as physical sciences, engineering foundations,
        mathematics, and selective economics or computer science programs that expect
        strong algebra/calculus fluency.
      </p>
    </section>
  );
}
