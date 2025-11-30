// src/components/course-titles/CourseTitleCard-aa-hl.jsx
// server component — stil unitar de titlu

export default function CourseTitleCardAAHL() {
  return (
    <section
      className="
        rounded-3xl border border-slate-200
        bg-gradient-to-b from-violet-50 to-violet-100/40
        px-4 md:px-5 py-2 md:py-3 shadow-sm
      "
    >
      <h1 className="text-[26px] sm:text-[30px] md:text-[34px] leading-tight font-semibold tracking-tight text-teal-900">
        IB Mathematics Analysis &amp; Approaches HL
      </h1>
      <p className="mt-1 text-[14px] md:text-[16px] text-teal-800">
        Mathematics: Analysis and Approaches (HL) is a rigorous, two-year course for highly
        proficient students who seek depth in theoretical and abstract mathematics. The program
        develops advanced algebraic fluency, proof and reasoning, sophisticated problem-solving,
        and the ability to generalize and justify results across unfamiliar contexts. It is best
        suited to students who thrive on challenge, work independently at pace, and aim for
        competitive quantitative degrees. Typical pathways include pure or applied mathematics,
        engineering (all branches), physics and other physical sciences, economics and finance
        with strong quantitative requirements, and theoretical/computational tracks in computer
        science and data-intensive fields.
      </p>
    </section>
  );
}
