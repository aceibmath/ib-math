//src/data/questionbank/aa-sl/sequences-and-series/p003-aasl-t1-seq.js

const problem_xxx = {
  // ——— IDENTITATE & ÎNCADRARE ———
  id: "QB-AA-SL-SEQ-003",                 // ex: QB-AA-SL-SEQ-003 (UNIQ)
  code: "QB · AA SL · Number & Algebra · Sequences · 003", // titlu uman
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
The second term of an arithmetic sequence is 11 and the ninth term is 60.  

Find the first term and the common difference of the sequence.
  `,

  solution_md: String.raw`
**Markscheme**

We recall the formula for the general term of an arithmetic sequence (IB Formula Booklet, SL 1.2):
$$
u_n = u_1 + (n-1)d.
$$

---

**(a) Step 1 — Write the expressions for \(u_2\) and \(u_9\)**

For the second term:
$$
u_2 = u_1 + d.
$$

For the ninth term:
$$
u_9 = u_1 + 8d.
$$

Substitute the given values:
$$
\begin{aligned}
u_1 + d &= 11 \\
u_1 + 8d &= 60
\end{aligned}
$$

---

**Step 2 — Solve the simultaneous equations**

Subtract the first equation from the second:
$$
\begin{aligned}
(u_1 + 8d) - (u_1 + d) &= 60 - 11 \\
7d &= 49
\end{aligned}
$$

So
$$
d = 7.
$$

Substitute back to find \(u_1\):
$$
\begin{aligned}
u_1 + d &= 11 \\
u_1 + 7 &= 11 \\
u_1 &= 4
\end{aligned}
$$

Thus
$$
\boxed{u_1 = 4,\quad d = 7}.
$$

---

**(b) Step 1 — Alternative method: express \(u_9\) in terms of \(u_2\)**

We use
$$
u_9 = u_2 + 7d.
$$

Substitute the known values:
$$
\begin{aligned}
60 &= 11 + 7d \\
49 &= 7d \\
d &= 7
\end{aligned}
$$

Then
$$
u_1 = u_2 - d = 11 - 7 = 4.
$$

Thus the answer is
$$
\boxed{u_1 = 4,\quad d = 7}.
$$


`,
};

export default problem_xxx;
