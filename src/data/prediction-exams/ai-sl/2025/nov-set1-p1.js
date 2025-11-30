export default {
  meta: {
    kind: "prediction",
    course: "AI SL",
    year: 2025,
    session: "November",
    set: 1,
    paper: 1,
    calculator: "NO CALCULATOR",
    title: "Mathematics AI SL — 2025 November Prediction — Set 1 · Paper 1",
  },
  problems: [
    {
      id: "AI-SL-2025-NOV-SET1-P1-Q01",
      code: "Q1",
      gdc: "NO GDC",
      hasIA: false,
      hasVideo: false,
      statement_md: `
<p>A fair die is rolled twice. Let \\(S\\) be the sum of the two results.</p>
<ol>
<li>Find \\(\\Pr(S\\ge 10)\\).</li>
<li>Find \\(E[S]\\).</li>
</ol>
      `,
      solution_md: `
<p>\\(S\\ge 10\\Rightarrow\\{(4,6),(5,5),(5,6),(6,4),(6,5),(6,6)\\}\\Rightarrow 6/36=1/6.\\)
Expected value for one die is \\(3.5\\), so for two dice \\(E[S]=7\\).</p>
      `,
    },
  ],
};
