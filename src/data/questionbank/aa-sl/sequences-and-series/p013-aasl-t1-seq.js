// src/data/questionbank/aa-sl/sequences-and-series/p005-aasl-t1-seq.js
// Completează câmpurile și șterge variantele pe care nu le folosești.

const problem_xxx = {
  // ——— IDENTITATE & ÎNCADRARE ———
  id: "QB-AA-SL-SEQ-013",                 // ex: QB-AA-SL-SEQ-013 (UNIQ)
  code: "QB · AA SL · Number & Algebra · Sequences · 013", // titlu uman
  topic: "Number & Algebra",
  subtopic: "Sequences & Series",

  // meta opționale (pentru past papers / analytics)
  marks: "6",                             // lasă "x" și înlocuiești când e cazul
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

For a particular arithmetic sequence, the fifth term is \(u_5 = 60\) and the sum of the first 40 terms is \(S_{40} = 540\).

<div class="q">
  <span class="q-text">Find the value of <span class="math-inline">k</span> such that <span class="math-inline">u_k = 0</span>.</span>
 
</div>

  `,

 solution_md: String.raw`
**Markscheme**

Let \(u_1\) be the first term and \(d\) the common difference of the arithmetic sequence.  

Using the general-term formula of an arithmetic sequence (IB Formula Booklet, SL 1.2),
$$
u_n = u_1 + (n-1)d
$$

Substituting \(n = 5\), we obtain
$$
u_5 = u_1 + 4d
$$

We have \(u_5 = 60\), so
$$
u_1 + 4d = 60. \tag{1}
$$

Using the sum formula for the first \(n\) terms of an arithmetic sequence (IB Formula Booklet, SL 1.2),
$$
S_n = \frac{n}{2}\bigl[2u_1 + (n-1)d\bigr]
$$

Substituting \(n = 40\), we obtain
$$
S_{40} = \frac{40}{2}\bigl[2u_1 + 39d\bigr]
$$

We have \(S_{40} = 540\), so
$$
\frac{40}{2}\bigl[2u_1 + 39d\bigr] = 540
$$

Simplifying, we obtain
$$
20\bigl[2u_1 + 39d\bigr] = 540
$$
so
$$
2u_1 + 39d = 27 \tag{2}
$$

We now solve the system formed by equations \((1)\) and \((2)\):
$$
\begin{aligned}
u_1 + 4d &= 60\\
2u_1 + 39d &= 27 
\end{aligned}
$$

We use the substitution method by rearranging equation \((1)\) to express \(u_1\) in terms of \(d\):
$$
u_1 = 60 - 4d
$$

Substituting this expression into equation \((2)\), we obtain
$$
\begin{aligned}
2u_1 + 39d &= 27 \\
2(60 - 4d) + 39d &= 27 \\
120 - 8d + 39d &= 27 \\
120 + 31d &= 27 \\
31d &= 27 - 120 \\
31d &= -93 \\
d &= -3
\end{aligned}
$$

Substituting \(d = -3\) back into equation \((1)\), we obtain
$$
\begin{aligned}
u_1 + 4d &= 60 \\
u_1 + 4(-3) &= 60 \\
u_1 - 12 &= 60 \\
u_1 &= 72
\end{aligned}
$$

Therefore, the first term and common difference are
$$
\boxed{u_1 = 72} \qquad \text{and} \qquad \boxed{d = -3}
$$

---

To find the value of \(k\) such that \(u_k = 0\), we use the general-term formula again,
$$
u_k = u_1 + (k-1)d
$$

Substituting \(u_1 = 72\) and \(d = -3\), we obtain
$$
u_k = 72 + (k-1)(-3)
$$

We now set \(u_k = 0\) and solve for \(k\):

$$
\begin{aligned}
0 &= 72 + (k-1)(-3) \\
0 &= 72 - 3(k-1) \\
0 &= 72 - 3k + 3 \\
0 &= 75 - 3k \\
3k &= 75 \\
k &= 25.
\end{aligned}
$$

Therefore,
$$
\boxed{k = 25}
$$
This means that the 25th term, \(u_{25}\), is equal to 0.

  `,
};

export default problem_xxx;
