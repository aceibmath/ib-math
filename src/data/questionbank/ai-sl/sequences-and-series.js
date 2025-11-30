// src/data/questionbank/ai-sl/sequences-and-series.js

const sequences_and_series = [
  {
    id: "AI-SL-SEQ-001",
    code: "AI SL · Number & Algebra · Sequences · 001",
    topic: "Number & Algebra",
    subtopic: "Sequences & Series",
    marks: 7,
    gdc: "GDC",
    difficulty: "Medium",
    year: "Specimen",
    tags: ["arithmetic", "explicit-form", "inequality-threshold"],

    statement_md: `
[Maximum mark: 7]

A sequence is defined by $u_1 = 3$ and $u_{n+1} = u_n + 5$.

(a) Write down $u_2$ and $u_3$. $([2])$

(b) Find a general expression for $u_n$ in terms of $n$. $([3])$

(c) Hence find the smallest $n$ such that $u_n > 60$. $([2])$
`,

    solution_md: `
We are told $u_1 = 3$ and $u_{n+1} = u_n + 5$.  
This is an arithmetic sequence with first term $a = 3$ and common difference $d = 5$.

---

**(a)**  
$u_2 = 3 + 5 = 8$  
$u_3 = 8 + 5 = 13$  
So $u_2 = 8$, $u_3 = 13$.

---

**(b)**  
For an arithmetic sequence:
$$
u_n = a + (n-1)d = 3 + (n-1)\cdot 5 = 3 + 5n - 5 = 5n - 2.
$$

So $u_n = 5n - 2$.

---

**(c)**  
We want $u_n > 60$.

Use the formula:
$$
5n - 2 > 60
\quad\Rightarrow\quad
5n > 62
\quad\Rightarrow\quad
n > \frac{62}{5} = 12.4
$$

The smallest integer $n$ greater than $12.4$ is $n = 13$.

So the least $n$ with $u_n > 60$ is $\\boxed{13}$.
`,

    hasWorkedSolution: true,
    hasVideo: false,
    hasIA: false,
  },

  // (poți continua aici cu AI-SL-SEQ-002, AI-SL-SEQ-003 etc, exact ca la AA SL)
];

export default sequences_and_series;
