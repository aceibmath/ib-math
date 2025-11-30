// src/data/questionbank/aa-sl/sequences-and-series/p005-aasl-t1-seq.js
// Completează câmpurile și șterge variantele pe care nu le folosești.

const problem_xxx = {
  // ——— IDENTITATE & ÎNCADRARE ———
  id: "QB-AA-SL-SEQ-010",                 // ex: QB-AA-SL-SEQ-010 (UNIQ)
  code: "QB · AA SL · Number & Algebra · Sequences · 010", // titlu uman
  topic: "Number & Algebra",
  subtopic: "Sequences & Series",

  // meta opționale (pentru past papers / analytics)
  marks: "5",                             // lasă "x" și înlocuiești când e cazul
  year: "",                               // folosit la past papers / prediction
  sourcePage: "",                         // ex: "AA SL Questionbank · Sequences & Series · p.12"
  // sourceRef: "",                       // opțional: referință liberă (ex: "May 2021 TZ2 P1 Q3")

  // ——— CALCULATOR (alege o singură variantă și șterge restul) ———
  gdc: "GDC",                      // scrie "GDC" sau "NO GDC" (sau șterge dacă folosești alta)
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

The second term of an arithmetic sequence is 26. The sum of the first four terms of the arithmetic sequence is 118.

<div class="q">
  <span class="q-text">(a) Find the first term, <span class="math-inline">u_1</span>.</span>
  <span class="marks">[4]</span>
</div>

<div class="q">
  <span class="q-text">(b) Find the common difference, <span class="math-inline">d</span>.</span>
  <span class="marks">[1]</span>
</div>

  `,

 solution_md: String.raw`

**Markscheme**

The problem states that the terms form an arithmetic sequence.  
Let the first term be \(u_1\) and the common difference be \(d\).

---

**(a) Find the first term \(u_1\)**

Using the general-term formula of an arithmetic sequence (IB Formula Booklet, SL 1.2),
$$
u_n = u_1 + (n-1)d
$$

Substituting \(n = 2\), we obtain
$$
u_2 = u_1 + d
$$

The problem states that \(u_2 = 26\), so
$$
u_1 + d = 26 \tag{1}
$$

Using the sum formula for the first \(n\) terms of an arithmetic sequence (IB Formula Booklet, SL 1.2),
$$
S_n = \frac{n}{2}\bigl[2u_1 + (n-1)d\bigr]
$$

Substituting \(n = 4\), we obtain
$$
S_4 = \frac{4}{2}\bigl[2u_1 + 3d\bigr]
$$

The problem states that \(S_4 = 118\), so
$$
\frac{4}{2}\bigl[2u_1 + 3d\bigr] = 118
$$

which simplifies to
$$
2u_1 + 3d = 59 \tag{2}
$$

We now form the system of linear equations
$$
\begin{aligned}
u_1 + d &= 26 \\
2u_1 + 3d &= 59
\end{aligned}
$$

We use the substitution method by rearranging equation (1) to express \(u_1\) in terms of \(d\).

$$
u_1 = 26 - d
$$

Substituting this into equation \((2)\), we obtain
$$
\begin{aligned}
2(26 - d) + 3d &= 59 \\
52 - 2d + 3d &= 59 \\
52 + d &= 59 \\
d &= 7
\end{aligned}
$$

Substituting back \(d = 7\) into equation \((1)\) gives
$$
\begin{aligned}
u_1 + 7 &= 26 \\
u_1 &= 19
\end{aligned}
$$

Therefore,
$$
\boxed{u_1 = 19}
$$

---

**(b) Find the common difference \(d\).**

For an arithmetic sequence, the common difference is
$$
d = u_2 - u_1
$$

Using \(u_2 = 26\) and \(u_1 = 19\), we obtain
$$
\begin{aligned}
d &= 26 - 19 \\
  &= 7
\end{aligned}
$$

Therefore,
$$
\boxed{d = 7}
$$

  `,
};

export default problem_xxx;
