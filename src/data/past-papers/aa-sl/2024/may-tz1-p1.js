export default {
  meta: {
    course: "AA SL",
    year: 2024,
    session: "May",
    tz: "TZ1",
    paper: 1,
    calculator: "NO CALCULATOR",
    title: "Mathematics AA SL — 2024 May TZ1 · Paper 1"
  },
  problems: [
    {
      id: "AA-SL-2024-MAY-TZ1-P1-Q01",
      code: "Q1",
      statement_md: "**Simplify:** \n$$\\frac{2x^2-8}{x^2-4}\\cdot\\frac{x-2}{x}$$ for real $x\\ne 0,\\pm 2$.",
      solution_md:
        "Factorize: $2x^2-8=2(x^2-4)=2(x-2)(x+2)$ și $x^2-4=(x-2)(x+2)$. \n" +
        "Expresia devine $$\\frac{2(x-2)(x+2)}{(x-2)(x+2)}\\cdot\\frac{x-2}{x} = 2\\cdot\\frac{x-2}{x} = \\frac{2x-4}{x}.$$",

      
        gdc: "NO GDC",      //gdc: "NO GDC", --->NO CALCULATOR; gdc: "GDC", ---->CALCULATOR; scoate GDC sa nu apara

        difficulty: "Easy|Medium|Hard",  //scoate difficulty sa nu apara
        
        showVideo: true,     // (implicit true; poți omite)
        hasVideo: false,
        
        showIA: true,
        hasIA: true,
        
      
        
       

        
    },
    {
      id: "AA-SL-2024-MAY-TZ1-P1-Q02",
      code: "Q2",
      statement_md:
        "**Solve for $\\theta$:** $\\;\\sin(\\theta)=\\frac{1}{2}$, $\\;0^\\circ\\le\\theta<360^\\circ$.",
      solution_md:
        "$\\sin(\\theta)=\\tfrac12\\Rightarrow \\theta=30^\\circ$ sau $150^\\circ$ în $[0,360)$.",
      gdc: "NO GDC",
      hasIA: false,
      hasVideo: false
    }
  ]
};
