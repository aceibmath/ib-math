// src/data/questionbank/aa-sl/sequences-and-series/p005-aasl-t1-seq.js
// Completează câmpurile și șterge variantele pe care nu le folosești.

const problem_xxx = {
  // ——— IDENTITATE & ÎNCADRARE ———
  id: "QB-AA-SL-SEQ-018",                 // ex: QB-AA-SL-SEQ-018 (UNIQ)
  code: "QB · AA SL · Number & Algebra · Sequences · XXX", // titlu uman
  topic: "Number & Algebra",
  subtopic: "Sequences & Series",

  // meta opționale (pentru past papers / analytics)
  marks: "4",                             // lasă "x" și înlocuiești când e cazul
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

In an arithmetic sequence, the sum of the 3rd and the 5th terms is 2.  
Given that the sum of the first six terms is 18, determine the first term, \(u_1\), and the common difference, \(d\).

  `,

 solution_md: String.raw`
**Markscheme**

 We are given
$$
u_3 + u_5 = 2
$$

Using the general-term formula for an arithmetic sequence (IB Formula Booklet, SL 1.2),
$$
u_n = u_1 + (n-1)d
$$
and substituting \(n = 3\) and \(n = 5\), we obtain
$$
\begin{aligned}
u_3 &= u_1 + 2d\\
u_5 &= u_1 + 4d
\end{aligned}
$$

Therefore,
$$
\begin{aligned}
u_3 + u_5 &= (u_1 + 2d) + (u_1 + 4d) \\
          &= 2u_1 + 6d = 2
\end{aligned}
$$

Dividing by 2, we obtain
$$
u_1 + 3d = 1 \tag{1}
$$

---

We are also told that the sum of the first six terms is 18, so \(S_6 = 18\).

Using the sum formula for an arithmetic sequence (IB Formula Booklet, SL 1.2),
$$
S_n = \frac{n}{2}\bigl(u_1 + u_n\bigr)
$$
with \(n = 6\), we have
$$
\begin{aligned}
S_6 &= \frac{6}{2}\bigl(u_1 + u_6\bigr) \\
18 &= 3\bigl(u_1 + u_6\bigr) \\
6 &= u_1 + u_6
\end{aligned}
$$

Since
$$
u_6 = u_1 + 5d
$$
we obtain
$$
\begin{aligned}
6 &= u_1 + (u_1 + 5d) \\
  &= 2u_1 + 5d
\end{aligned}
$$

Thus,
$$
2u_1 + 5d = 6 \tag{2}
$$

---

Using equations \((1)\) and \((2)\), we solve the simultaneous system
$$
\begin{aligned}
u_1 + 3d &= 1\\
2u_1 + 5d &= 6
\end{aligned}
$$

From \((1)\), we express \(u_1\) in terms of \(d\):
$$
u_1 = 1 - 3d
$$

Substituting into \((2)\), we obtain
$$
\begin{aligned}
2(1 - 3d) + 5d &= 6 \\
2 - 6d + 5d &= 6 \\
2 - d &= 6 \\
-d &= 4 \\
d &= -4
\end{aligned}
$$

Substituting \(d = -4\) back into \((1)\), we obtain
$$
\begin{aligned}
u_1 + 3(-4) &= 1 \\
u_1 - 12 &= 1 \\
u_1 &= 13
\end{aligned}
$$

Therefore,
$$
\boxed{u_1 = 13}
\qquad\text{and}\qquad
\boxed{d = -4}
$$

  `,
};

export default problem_xxx;
