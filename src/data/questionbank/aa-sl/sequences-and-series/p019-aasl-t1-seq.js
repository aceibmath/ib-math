// src/data/questionbank/aa-sl/sequences-and-series/p005-aasl-t1-seq.js
// Completează câmpurile și șterge variantele pe care nu le folosești.

const problem_xxx = {
  // ——— IDENTITATE & ÎNCADRARE ———
  id: "QB-AA-SL-SEQ-019",                 // ex: QB-AA-SL-SEQ-19 (UNIQ)
  code: "QB · AA SL · Number & Algebra · Sequences · 019", // titlu uman
  topic: "Number & Algebra",
  subtopic: "Sequences & Series",

  // meta opționale (pentru past papers / analytics)
  marks: "5",                             // lasă "x" și înlocuiești când e cazul
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

The 1st, 5th and 11th terms of an arithmetic sequence, with common difference \(d\), \(d \neq 0\), form the first three terms of a geometric sequence with common ratio \(r\).

Given that the 1st term of both sequences is \(16\), find:

<div class="q">
  <span class="q-text">(a) the value of the common difference, <span class="math-inline">d</span>.</span>
  <span class="marks">[4]</span>
</div>

<div class="q">
  <span class="q-text">(b) the value of the common ratio, <span class="math-inline">r</span>.</span>
  <span class="marks">[1]</span>
</div>
  

  `,

 solution_md: String.raw`

**Markscheme**

From the information provided, we are told that the first term of both sequences is \(16\), so \(u_1 = 16\).

The arithmetic sequence has common difference \(d\), with \(d \neq 0\).  
The geometric sequence has common ratio \(r\).

---

**(a) Find the value of the common difference, \(d\).**

Using the general-term formula for an arithmetic sequence (IB Formula Booklet, SL 1.2) for \(n = 1, 5, 11\),

$$
u_n = u_1 + (n - 1)d
$$

we obtain the following terms:

$$
\begin{aligned}
u_1 &= 16, \\
u_5 &= 16 + 4d \\
u_{11} &= 16 + 10d
\end{aligned}
$$

Let us now define the first three terms of the geometric sequence as \(v_1, v_2, v_3\), with common ratio \(r\).  
From the information provided, these geometric terms correspond to the arithmetic ones:

$$
v_1 = u_1\qquad
v_2 = u_5\qquad
v_3 = u_{11}
$$

Therefore,

$$
v_1 = 16\qquad
v_2 = 16 + 4d\qquad
v_3 = 16 + 10d
$$

In a geometric sequence, the ratio between consecutive terms is constant:

$$
r=\frac{v_2}{v_1} = \frac{v_3}{v_2}
$$

Substituting the expressions above, we get

$$
\frac{16 + 4d}{16} = \frac{16 + 10d}{16 + 4d}
$$

Cross-multiplying gives

$$
\begin{aligned}
(16 + 4d)^2 &= 16(16 + 10d)\\
256 + 128d + 16d^2 &= 256 + 160d
\end{aligned}
$$

Subtracting \(256\) from both sides:

$$
128d + 16d^2 = 160d
$$

Rearranging:

$$
\begin{aligned}
16d^2 + 128d - 160d &= 0 \\
16d^2 - 32d &= 0 \\
16d(d - 2) &= 0
\end{aligned}
$$

Since \(d \neq 0\), it follows that

$$
d - 2 = 0
$$

Therefore,

$$
\boxed{d = 2}
$$

---

**(b) Find the value of the common ratio, \(r\).**

From part (a), we deduce that \(d = 2\).  
Substituting this into the expressions for the terms, we obtain

$$
\begin{aligned}
v_1 &=u_1 = 16 \\
v_2 &= u_5 = 16 + 4d = 16 + 4(2) = 24 \\
v_3 &= u_{11} = 16 + 10d = 16 + 10(2) = 36
\end{aligned}
$$

These form the first three terms of the geometric sequence.  
Thus, the common ratio is

$$
r = \frac{v_2}{u_1} = \frac{24}{16} = \frac{3}{2}
$$

Checking with the next ratio:

$$
\frac{v_{3}}{v_2} = \frac{36}{24} = \frac{3}{2}
$$

Therefore,

$$
\boxed{r = \frac{3}{2}}
$$

  `,
};

export default problem_xxx;
