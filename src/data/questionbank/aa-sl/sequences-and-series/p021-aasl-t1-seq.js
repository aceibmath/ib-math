// src/data/questionbank/aa-sl/sequences-and-series/p005-aasl-t1-seq.js


const problem_xxx = {
  // ——— IDENTITATE & ÎNCADRARE ———
  id: "QB-AA-SL-SEQ-021",                 // ex: QB-AA-SL-SEQ-021 (UNIQ)
  code: "QB · AA SL · Number & Algebra · Sequences · 021", // titlu uman
  topic: "Number & Algebra",
  subtopic: "Sequences & Series",

  // meta opționale (pentru past papers / analytics)
  marks: "x",                             // lasă "x" și înlocuiești când e cazul
  year: "",                               // folosit la past papers / prediction
  sourcePage: "",                         // ex: "AA SL Questionbank · Sequences & Series · p.12"
  // sourceRef: "",                       // opțional: referință liberă (ex: "May 2021 TZ2 P1 Q3")

  // ——— CALCULATOR (alege o singură variantă și șterge restul) ———
  gdc: "GDC/NO GDC",                      // scrie "GDC" sau "NO GDC" (sau șterge dacă folosești alta)
  // technology: "GDC/NO GDC",
  // calculator: true,                    // true => CALCULATOR, false => NO CALCULATOR

  // ——— DIFFICULTY ———
  difficulty: "Easy/Medium/Hard",         // păstrează una și șterge restul

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

Three numbers \(u_1\), \(u_2\) and \(u_3\) form the first three terms of an arithmetic sequence with common difference \(d \neq 0\).<br>
The numbers \(u_2\), \(u_3\) and \(u_1\) form the first three terms of a geometric sequence.

Given that the three numbers add up to \(9\), find the values of \(u_1\), \(u_2\) and \(u_3\).



  `,

 solution_md: String.raw`

Three numbers \(u_1\), \(u_2\), and \(u_3\) form the first three terms of an arithmetic sequence with common difference \(d\), \(d \neq 0\).

The numbers \(u_2\), \(u_3\), and \(u_1\) form the first three terms of a geometric sequence.

Given that the three numbers add up to 9, find the values of \(u_1\), \(u_2\), and \(u_3\).

`,

solution_md: String.raw`

**Markscheme**

We are given that \(u_1\), \(u_2\), and \(u_3\) form the first three terms of an arithmetic sequence with common difference \(d\), where \(d \neq 0\).

The numbers \(u_2\), \(u_3\), and \(u_1\) form the first three terms of a geometric sequence.

Additionally, we are told that:

$$
u_1 + u_2 + u_3 = 9 \tag{1}
$$

---

Since \(u_1\), \(u_2\), \(u_3\) form an arithmetic sequence with common difference \(d\), we can write:

$$
u_1 = u_1,\quad u_2 = u_1 + d,\quad u_3 = u_1 + 2d
$$

Substituting these into (1), we obtain:

$$
u_1 + (u_1 + d) + (u_1 + 2d) = 9
$$

Simplifying:

$$
\begin{aligned}
3u_1 + 3d &= 9 \\
3(u_1 + d) &= 9 \\
u_1 + d &= 3
\end{aligned}
$$

Therefore:

$$
u_2 = 3 \tag{2}
$$

---

Since \(u_2\), \(u_3\), \(u_1\) form a geometric sequence, the ratio between consecutive terms is constant. Therefore:

$$
\frac{u_3}{u_2} = \frac{u_1}{u_3}
$$

Cross-multiplying gives:

$$
u_3^2 = u_1 u_2 \tag{3}
$$

Substituting \(u_2 = 3\) from (2):

$$
u_3^2 = 3u_1
$$

From (2), we know that \(u_2 = 3\), so:


$$
\begin{aligned}
u_2 &= 3\\
u_1 + d &= 3\\
d &= 3 - u_1
\end{aligned}
$$

Substituting this into \(u_3 = u_1 + 2d\):

$$
\begin{aligned}
u_3 &= u_1 + 2d\\
u_3 &= u_1 + 2(3 - u_1)\\
u_3 &= u_1 + 6 - 2u_1\\
u_3 &= 6 - u_1\\
\end{aligned}
$$

Now substituting \(u_3 = 6 - u_1\) into \(u_3^2 = 3u_1\):

$$
\begin{aligned}
(6 - u_1)^2 &= 3u_1\\
36 - 12u_1 + u_1^2 &= 3u_1\\
u_1^2 - 12u_1 - 3u_1 + 36 &= 0 \\
u_1^2 - 15u_1 + 36 &= 0
\end{aligned}
$$

Factoring:

$$
(u_1 - 12)(u_1 - 3) = 0
$$

This gives two solutions:

$$
u_1 = 12 \quad \text{or} \quad u_1 = 3
$$

---

**Case 1:** \(u_1 = 12\)

From (2), \(u_2 = 3\).

From (1):

$$
\begin{aligned}
u_3 &= 9 - u_1 - u_2\\
&= 9 - 12 - 3\\
&= -6\\
\end{aligned}
$$

We verify this forms a geometric sequence \(u_2, u_3, u_1\):

$$
\frac{u_3}{u_2} = \frac{-6}{3} = -2,\quad \frac{u_1}{u_3} = \frac{12}{-6} = -2 \quad \checkmark
$$

The common difference is:

$$
d = u_2 - u_1 = 3 - 12 = -9 \neq 0 \quad \checkmark
$$

---

**Case 2:** \(u_1 = 3\)

From (2), \(u_2 = 3\).

From (1):

$$
\begin{aligned}
u_3 &= 9 - u_1 - u_2\\
&= 9 - 3 - 3\\
&= 3\\
\end{aligned}
$$

This gives \(u_1 = u_2 = u_3 = 3\), which means \(d = 0\).

Since we require \(d \neq 0\), this solution is rejected.

---

Therefore, the unique solution is:

$$
\boxed{u_1 = 12,\quad u_2 = 3,\quad u_3 = -6}
$$

  `,
};

export default problem_xxx;
