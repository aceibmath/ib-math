// src/data/questionbank/aa-sl/sequences-and-series/p005-aasl-t1-seq.js
// Completează câmpurile și șterge variantele pe care nu le folosești.

const problem_xxx = {
  // ——— IDENTITATE & ÎNCADRARE ———
  id: "QB-AA-SL-SEQ-016",                 // ex: QB-AA-SL-SEQ-016 (UNIQ)
  code: "QB · AA SL · Number & Algebra · Sequences · 016", // titlu uman
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

Find the value of \(k\) if

$$
\sum_{r=1}^{\infty} k\left(\frac{1}{4}\right)^r = 8.
$$

  `,

 solution_md: String.raw`

**Markscheme**

We are given the infinite series  

$$
\sum_{r=1}^{\infty} k\left(\frac{1}{4}\right)^r = 8.
$$

On expansion, we obtain:

$$
k\left(\frac{1}{4}\right)^1 + k\left(\frac{1}{4}\right)^2 + k\left(\frac{1}{4}\right)^3 + \cdots = 8.
$$

This is a geometric series with the first term  

$$
a = k\left(\frac{1}{4}\right)
$$

and the common ratio  

$$
r = \frac{1}{4}.
$$

Since \(|r| < 1\), the series converges.

Using the sum to infinity formula for a geometric series (IB Formula Booklet, SL 1.3):
$$
S_\infty = \frac{a}{1 - r},
$$

substituting \(a = k\left(\frac{1}{4}\right)\) and \(r = \frac{1}{4}\), we obtain:


$$
\begin{aligned}
\frac{k\left(\frac{1}{4}\right)}{1 - \frac{1}{4}} &= 8 \\
\frac{k\left(\frac{1}{4}\right)}{\frac{3}{4}} &= 8 \\
k\left(\frac{1}{4}\right)\cdot\frac{4}{3} &= 8 \\
\frac{k}{3} &= 8 \\
k &= 24
\end{aligned}
$$


Therefore,

$$
\boxed{k = 24}
$$


  `,
};

export default problem_xxx;
