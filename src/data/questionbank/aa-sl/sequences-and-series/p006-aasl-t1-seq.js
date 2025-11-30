// src/data/questionbank/aa-sl/sequences-and-series/p005-aasl-t1-seq.js
// Completează câmpurile și șterge variantele pe care nu le folosești.

const problem_xxx = {
  // ——— IDENTITATE & ÎNCADRARE ———
  id: "QB-AA-SL-SEQ-006",                 // ex: QB-AA-SL-SEQ-001 (UNIQ)
  code: "QB · AA SL · Number & Algebra · Sequences · 006", // titlu uman
  topic: "Number & Algebra",
  subtopic: "Sequences & Series",

  // meta opționale (pentru past papers / analytics)
  marks: "3",                             // lasă "x" și înlocuiești când e cazul
  year: "",                               // folosit la past papers / prediction
  sourcePage: "",                         // ex: "AA SL Questionbank · Sequences & Series · p.12"
  // sourceRef: "",                       // opțional: referință liberă (ex: "May 2021 TZ2 P1 Q3")

  // ——— CALCULATOR (alege o singură variantă și șterge restul) ———
  gdc: "GDC",                      // scrie "GDC" sau "NO GDC" (sau șterge dacă folosești alta)
  // technology: "GDC/NO GDC",
  // calculator: true,                    // true => CALCULATOR, false => NO CALCULATOR

  // ——— DIFFICULTY ———
  difficulty: "Easy",         // păstrează una și șterge restul

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


Find the value of

$$
\sum_{r=1}^{100} (3r + 1).
$$
  `,

 solution_md: String.raw`

**Markscheme**

Series can be represented in compact form using sigma notation.  
This uses the general term \(u_r\). In expanded form:

$$
\sum_{r=1}^{n} u_r = u_1 + u_2 + u_3 + \cdots + u_n,
$$

where  
\(r=1\) is the lower bound,  
\(r=n\) is the upper bound,  
and \(u_1, u_2, u_3, \ldots, u_n\) are the terms generated from the general term \(u_r\).

---

**Step 1 — Find the first and last terms**

We are given the series

$$
\sum_{r=1}^{100} (3r + 1),
$$

where  
- \(r = 1\) is the lower bound  
- \(r = 100\) is the upper bound  
- and the general term is

$$
u_r = 3r + 1.
$$

To determine the nature of the series, we first compute the first three terms.

Substitute \(r = 1, 2, 3\):

$$
u_1 = 3\cdot 1 + 1 = 4
$$

$$
u_2 = 3\cdot 2 + 1 = 7
$$

$$
u_3 = 3\cdot 3 + 1 = 10
$$

Since
$$
u_2 - u_1 = u_3 - u_2 = 3,
$$

the sequence is arithmetic with first term \(u_1 = 4\) and common difference \(d = 3\).

The last term is obtained by substituting \(r = 100\):

$$
u_{100} = 3\cdot 100 + 1 = 301.
$$

Thus we are summing the first \(100\) terms of an arithmetic sequence with

$$
u_1 = 4,\quad d = 3,\quad u_{100} = 301.
$$

---

**Step 2 — Use the sum formula for an arithmetic sequence**

We recall the formula for the sum of the first \(n\) terms of an arithmetic sequence  
(IB Formula Booklet, SL 1.2):

$$
S_n = \frac{n}{2}\bigl(2u_1 + (n-1)d\bigr).
$$

Substituting \(n=100\), \(u_1 = 4\), \(d = 3\):

$$
\begin{aligned}
S_{100}
&= \frac{100}{2}\bigl(2\cdot 4 + 99\cdot 3\bigr) \\
&= 50 (8 + 297) \\
&= 50 \cdot 305 \\
&= 15250.
\end{aligned}
$$

Therefore, the value of the series is:

$$
\boxed{15250}.
$$

---

**Note:**  
We could also use the equivalent formula

$$
S_n = \frac{n}{2}(u_1 + u_n),
$$

Substituting \(n = 100\), \(u_1 = 4\), \(u_{100} = 301\):

$$
\begin{aligned}
S_{100}
&= \frac{100}{2}(4 + 301) \\
&= 50 \cdot 305 \\
&= 15250.
\end{aligned}
$$

This confirms that the alternative formula gives the same result.


  `,
};

export default problem_xxx;
