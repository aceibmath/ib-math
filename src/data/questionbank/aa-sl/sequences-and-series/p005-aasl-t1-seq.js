// src/data/questionbank/aa-sl/sequences-and-series/p005-aasl-t1-seq.js

const problem_xxx = {
  // ——— IDENTITATE & ÎNCADRARE ———
  id: "QB-AA-SL-SEQ-005",                 // ex: QB-AA-SL-SEQ-001 (UNIQ)
  code: "QB · AA SL · Number & Algebra · Sequences · 005", // titlu uman
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
The sum of an arithmetic series is given by  \[S_n = n(3n + 1).\]


<div class="q">
  <span class="q-text">(a) Find the common difference, <span class="math-inline">d</span>.</span>
  <span class="marks">[2]</span>
</div>

<div class="q">
  <span class="q-text">(b) Find the first three terms of the series.</span>
  <span class="marks">[2]</span>
</div>


  `,

solution_md: String.raw`
**Markscheme**

We recall the difference between a sequence and a series.

A sequence is the list of terms
$$
u_1,\;u_2,\;u_3,\;\dots,\;u_n.
$$

A series is the sum of these terms
$$
S_n = u_1 + u_2 + \cdots + u_n.
$$

The partial sums satisfy
$$
S_1 = u_1, \qquad
S_2 = u_1 + u_2, \qquad
S_3 = u_1 + u_2 + u_3, \qquad \dots
$$

Using the given formula for the sum of the first \(n\) terms,
$$
S_n = n(3n + 1),
$$
we can find the first few partial sums.

---

**(a) Step 1 — Use the formula for \(S_n\) to find \(S_1\) and \(S_2\)**

For \(n = 1\):
$$
S_1 = 1(3\cdot 1 + 1) = 4
$$

For \(n = 2\):
$$
S_2 = 2(3\cdot 2 + 1) = 2(7) = 14
$$

---

**Step 2 — Express \(S_1\) and \(S_2\) in terms of \(u_1\) and \(u_2\)**

By definition of partial sums,
$$
S_1 = u_1, \qquad S_2 = u_1 + u_2.
$$

So
$$
u_1 = 4, \qquad u_1 + u_2 = 14.
$$

Substitute \(u_1 = 4\) into \(u_1 + u_2 = 14\):
$$
\begin{aligned}
4 + u_2 &= 14 \\
u_2 &= 14 - 4 \\
u_2 &= 10
\end{aligned}
$$

---

**Step 3 — Find the common difference \(d\)**

For an arithmetic sequence,
$$
d = u_2 - u_1.
$$

Thus
$$
d = 10 - 4 = 6.
$$

So
$$
\boxed{d = 6}.
$$

---

**(b) Step 1 — Recall the values from part (a)**

From part (a) we have
$$
u_1 = 4, \qquad u_2 = 10, \qquad d = 6.
$$

---

**Step 2 — Compute \(u_3\)**

Using \(u_3 = u_2 + d\),
$$
\begin{aligned}
u_3 &= u_2 + d \\
u_3 &= 10 + 6 \\
u_3 &= 16
\end{aligned}
$$

Thus the first three terms of the sequence are
$$
\boxed{u_1 = 4,\quad u_2 = 10,\quad u_3 = 16}.
$$

`,
};


export default problem_xxx;
