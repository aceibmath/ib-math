// src/data/questionbank/aa-hl/sequences-and-series.js

const sequences_and_series_hl = [
  {
    id: "AA-HL-SEQ-TEST-001",
    code: "AA HL · Algebra · Sequences · 001",
    topic: "Number & Algebra",
    subtopics: ["Sequences & Series"], // notă: AA HL folosește plural subtopics[]
    // subtopic: "Sequences & Series", // dacă vrei și câmpul simplu, îl poți lăsa comentat

    marks: 7,
    gdc: "GDC",
    difficulty: "Medium",
    year: "Specimen",
    tags: ["arithmetic", "nth-term", "threshold"],

    statement_md: `
[Maximum mark: 7]

A sequence is defined by $u_1 = 3$ and $u_{n+1} = u_n + 5$.

(a) Write down $u_2$ and $u_3$. $([2])$

(b) Find a general expression for $u_n$ in terms of $n$. $([3])$

(c) Hence find the smallest $n$ such that $u_n > 60$. $([2])$
`,

    solution_md: `
**(a)**  
$u_2 = 8,\quad u_3 = 13.$

**(b)**  
This is an arithmetic sequence with first term $3$ and common difference $5$, so  
$$u_n = 3 + 5(n-1) = 5n - 2.$$

**(c)**  
Solve $5n - 2 > 60 \\Rightarrow 5n > 62 \\Rightarrow n > 12.4.$  
Smallest integer $n = 13.$
`,

    hasWorkedSolution: true,
    hasVideo: true,
    hasIA: true
  },
];

export default sequences_and_series_hl;
