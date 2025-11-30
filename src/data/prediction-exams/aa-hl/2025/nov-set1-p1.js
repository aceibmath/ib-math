export default {
  meta: {
    kind: "prediction",
    course: "AA HL",
    year: 2025,
    session: "November",
    set: 1,
    paper: 1,
    calculator: "NO CALCULATOR",
    title: "Mathematics AA HL — 2025 November Prediction — Set 1 · Paper 1",
  },
  problems: [
    {
      id: "AA-HL-2025-NOV-SET1-P1-Q01",
      code: "Q1",
      gdc: "NO GDC",
      hasIA: false,
      hasVideo: false,
      statement_md: `
<p>Let \\(f(x)=x^3-3x\\).</p>
<ol>
<li>Find the stationary points of \\(f\\).</li>
<li>Determine the nature (max/min/saddle) of each stationary point.</li>
</ol>
      `,
      solution_md: `
<p>\\(f'(x)=3x^2-3=3(x^2-1)\\Rightarrow x=\\pm1\\).</p>
<p>\\(f''(x)=6x\\Rightarrow f''(-1)=-6<0\\Rightarrow\\) local maximum at \\(x=-1\\); 
\\(f''(1)=6>0\\Rightarrow\\) local minimum at \\(x=1\\).</p>
      `,
    },
  ],
};
