// src/data/questionbank/aa-sl/sequences-and-series/p005-aasl-t1-seq.js
// Completează câmpurile și șterge variantele pe care nu le folosești.

const problem_xxx = {
  // ——— IDENTITATE & ÎNCADRARE ———
  id: "QB-AA-SL-SEQ-012",                 // ex: QB-AA-SL-SEQ-012 (UNIQ)
  code: "QB · AA SL · Number & Algebra · Sequences · 012", // titlu uman
  topic: "Number & Algebra",
  subtopic: "Sequences & Series",

  // meta opționale (pentru past papers / analytics)
  marks: "x",                             // lasă "x" și înlocuiești când e cazul
  year: "",                               // folosit la past papers / prediction
  sourcePage: "",                         // ex: "AA SL Questionbank · Sequences & Series · p.12"
  // sourceRef: "",                       // opțional: referință liberă (ex: "May 2021 TZ2 P1 Q3")

  // ——— CALCULATOR (alege o singură variantă și șterge restul) ———
  gdc: "NO GDC",                      // scrie "GDC" sau "NO GDC" (sau șterge dacă folosești alta)
  // technology: "GDC/NO GDC",
  // calculator: true,                    // true => CALCULATOR, false => NO CALCULATOR

  // ——— DIFFICULTY ———
  difficulty: "Medium",         // păstrează una și șterge restul

  // ——— VIZIBILITATE CHIP-URI (header) ———
  // showX = dacă să apară chip-ul deloc; hasX = stare on/off (verde vs gri)
  showCalc: true,
  showDifficulty: true,

  showVideo: true,
  hasVideo: false,

  showIA: true,
  hasIA: true,

  // ——— CONȚINUT ———
  statement_md: String.raw`

The first three terms of an arithmetic sequence are <span class="math-inline">u_1</span>, <span class="math-inline">5u_1 - 18</span> and <span class="math-inline">3u_1 + 18</span>.

<div class="q">
  <span class="q-text">(a) Show that <span class="math-inline">u_1 = 9</span>.</span>
  <span class="marks">[2]</span>
</div>

<div class="q">
  <span class="q-text">(b) Prove that the sum of the first <span class="math-inline">n</span> terms of this arithmetic sequence is a square number.</span>
  <span class="marks">[4]</span>
</div>

  `,

 solution_md: String.raw`

**Markscheme**

Since the three given terms are the first three terms of an arithmetic sequence, the common difference must satisfy
$$
d = u_2 - u_1 \quad\text{and}\quad d = u_3 - u_2
$$
so
$$
u_2 - u_1 = u_3 - u_2
$$

---

**(a) Show that \(u_1 = 9\).**

Using the condition for an arithmetic sequence, we equate the two consecutive differences:
$$
\begin{aligned}
u_2 - u_1 &= u_3 - u_2 \\
(5u_1 - 18) - u_1 &= (3u_1 + 18) - (5u_1 - 18) \\
4u_1 - 18 &= -2u_1 + 36 \\
6u_1 &= 54 \\
u_1 &= 9
\end{aligned}
$$

Therefore,
$$
\boxed{u_1 = 9}
$$

---

**(b) Prove that the sum of the first \(n\) terms is a square number.**

From part (a), the first term is
$$
u_1 = 9
$$
The second term is
$$
\begin{aligned}
u_2 &= 5u_1 - 18\\
&= 5(9) - 18\\
&= 27 
\end{aligned}
$$
so the common difference is
$$
\begin{aligned}
d &= u_2 - u_1\\
&= 27 - 9\\
&= 18
\end{aligned}
$$

Using the sum formula for the first \(n\) terms of an arithmetic sequence (IB Formula Booklet, SL 1.2),
$$
S_n = \frac{n}{2}\bigl[2u_1 + (n-1)d\bigr]
$$

Substituting \(u_1 = 9\) and \(d = 18\), we obtain
$$
\begin{aligned}
S_n &= \frac{n}{2}\bigl[2(9) + (n-1)(9)\bigr] \\
    &= \frac{n}{2}\bigl[18 + 18n - 18\bigr] \\
    &= \frac{n}{2}\cdot 18n \\
    &= 9n^2
\end{aligned}
$$

We can write
$$
S_n = 9n^2 = (3n)^2,
$$
which is a perfect square for every positive integer \(n\).

Therefore, the sum of the first \(n\) terms of this arithmetic sequence is always a square number.


  `,
};

export default problem_xxx;
