// src/data/questionbank/aa-sl/sequences-and-series/p001-aasl-t1-seq.js

const problem_xxx = {
  // ——— IDENTITATE & ÎNCADRARE ———
  id: "QB-AA-SL-SEQ-001",
  code: "QB · AA SL · Number & Algebra · Sequences · 001",
  topic: "Number & Algebra",
  subtopic: "Sequences & Series",

  // meta
  marks: "4",
  year: "",
  sourcePage: "",

  // CALCULATOR / DIFICULTY
  gdc: "GDC",
  difficulty: "Easy",

  showCalc: true,
  showDifficulty: true,
  showVideo: false,
  hasVideo: false,
  showIA: true,
  hasIA: true,

  // ——— ENUNȚ (Markdown + LaTeX) ———
  statement_md: String.raw`
Consider the arithmetic sequence:

$$
13,\;17,\;21,\;\ldots,\;105
$$

<div class="q">
  <span class="q-text">(a) Find the common difference, <span class="math-inline">d</span>.</span>
  <span class="marks">[2]</span>
</div>



<div class="q">
  <span class="q-text">(b) Find the sum of all the terms.</span>
  <span class="marks">[2]</span>
</div>

  `,

  // ——— SOLUȚIE (Markdown + LaTeX) ———
solution_md: String.raw`
**Markscheme**

For the given arithmetic sequence

$$
13,\;17,\;21,\;\ldots,\;105
$$

we identify the first few terms as

$$
u_{1}=13, u_{2}=17, u_{3}=21
$$

and the common difference is

$$
d=u_{2}-u_{1}=17-13=4
$$

The dots “$\ldots$” between 21 and 105 indicate that several terms are omitted.  
To visualise the structure of the sequence, we can summarise the known terms as follows:

<div style="text-align:center;">

$$
\begin{array}{|c|c|c|c|c|}
\hline
u_{1} & u_{2} & u_{3} & \cdots & u_{n} \\
\hline
13 & 17 & 21 & \cdots & 105 \\
\hline
\end{array}
$$

</div>

Since the last term shown is \(105\), we set

$$
u_{n}=105
$$

---

(a) We recall the formula for the $n$th term of an arithmetic sequence (IB Formula Booklet, SL 1.2):

$$
u_{n} =u_{1}+(n-1)d
$$

Substituting $u_{1}=13$, $u_{n}=105$ and $d=4$, we solve for $n$:

$$
\begin{aligned}
105 &= 13 + (n-1)\cdot 4 \\
92 &= 4(n-1) \\
23 &= n-1
\end{aligned}
$$

$$
\boxed{n = 24}
$$

Thus, the sequence contains 24 terms.

---

(b) Finding the sum of all terms

We recall the formula for the sum of the first $n$ terms of an arithmetic sequence (IB Formula Booklet, SL 1.2):

$$
S_{n}=\frac{n}{2}\big(u_{1}+u_{n}\big).
$$

From part (a), we know that $n=24$ and $u_{n}=105$, so

$$
\begin{aligned}
S_{24}
  &=\frac{24}{2}(13+105) \\
  &=12(118) \\
  &=1416.
\end{aligned}
$$

Therefore, the total sum of all terms in the sequence is

$$
\boxed{S_{24}=1416}
$$
`,

};

export default problem_xxx;
