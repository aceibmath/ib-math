// src/data/questionbank/ai-hl/sequences-and-series.js
const sequences_and_series_aihl = [
  {
    id: "AI-HL-SEQ-001",
    code: "AI HL · Number & Algebra · Sequences · 001",
    topic: "Number & Algebra",
    subtopic: "Sequences & Series",
    marks: 7,
    gdc: "GDC",
    difficulty: "Medium",
    year: "Specimen",
    tags: ["recursive", "explicit", "inequality"],

    statement_md: `
[Maximum mark: 7]

A sequence is defined by $u_1 = 3$ and $u_{n+1} = u_n + 5$.

(a) Write down $u_2$ and $u_3$. $([2])$

(b) Find a general expression for $u_n$ in terms of $n$. $([3])$

(c) Hence find the smallest $n$ such that $u_n > 60$. $([2])$
`,

    solution_md: `
This is an arithmetic sequence with first term $3$ and common difference $5$.

(a) 
$u_2 = 8$, $u_3 = 13$.

(b)
$u_n = 3 + 5(n-1) = 5n - 2$.

(c)
We need $5n - 2 > 60 \\Rightarrow 5n > 62 \\Rightarrow n > 12.4$.
Smallest integer $n$ is $13$.
`,

    hasWorkedSolution: true,
    hasVideo: false,
    hasIA: true
  }
];

export default sequences_and_series_aihl;
