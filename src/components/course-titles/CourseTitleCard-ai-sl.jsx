// src/components/course-titles/CourseTitleCard-ai-sl.jsx
// server component — stil unitar pentru toate course title cards

export default function CourseTitleCardAISL() {
  return (
    <section
      className="
        rounded-3xl border border-slate-200
        bg-gradient-to-b from-[#FFFDE7] to-[#FEF3C7]
        px-4 md:px-5 py-2 md:py-3 shadow-sm
      "
    >
      <h1 className="text-[26px] sm:text-[30px] md:text-[34px] leading-tight font-semibold tracking-tight text-teal-900">
        IB Mathematics Applications &amp; Interpretation SL
      </h1>
      <p className="mt-1 text-[14px] md:text-[16px] text-teal-800">
        Mathematics: Applications and Interpretation (SL) focuses on using mathematics to model and
        make sense of real-world situations. The course emphasizes data analysis, statistical reasoning,
        functions and modeling, technology-supported problem-solving, and clear interpretation and
        communication of results. It suits students who prefer applied contexts, collaborative inquiry,
        and using digital tools to explore patterns and make decisions. Graduates are well prepared for
        university studies in social sciences, business and management, economics with an applied
        orientation, environmental or life sciences, psychology, geography, health sciences, and other
        fields where data literacy and mathematical modeling are essential.
      </p>
    </section>
  );
}
