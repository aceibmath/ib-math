export default {
  meta: {
    course: "AI SL",
    year: 2024, session: "May", tz: "TZ1",
    paper: 1, calculator: "CALCULATOR",
    title: "Mathematics AI SL — 2024 May TZ1 · Paper 1"
  },
  problems: [
    {
      id: "AI-SL-2024-MAY-TZ1-P1-Q01", code: "Q1",
      statement_md: "Mediană 12, IQR 6. Estimează Q1 și Q3.",
      solution_md: "IQR = Q3−Q1 = 6; median ≈ (Q1+Q3)/2 = 12 ⇒ Q1≈9, Q3≈15.",
      gdc: "GDC", hasIA: false, hasVideo: false
    },
    {
      id: "AI-SL-2024-MAY-TZ1-P1-Q02", code: "Q2",
      statement_md: "Exponențial: $P(0)=200$, $P(5)=300$. Găsește $k$ în $P(t)=P_0 e^{kt}$.",
      solution_md: "$300=200e^{5k}\\Rightarrow k=\\frac{\\ln 1.5}{5}.$",
      gdc: "GDC", hasIA: false, hasVideo: false
    }
  ]
};
