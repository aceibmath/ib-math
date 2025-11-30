// src/data/questionbank/aa-sl/sequences-and-series/p005-aasl-t1-seq.js
// Completează câmpurile și șterge variantele pe care nu le folosești.

const problem_xxx = {
  // ——— IDENTITATE & ÎNCADRARE ———
  id: "QB-AA-SL-SEQ-014",                 // ex: QB-AA-SL-SEQ-001 (UNIQ)
  code: "QB · AA SL · Number & Algebra · Sequences · 014", // titlu uman
  topic: "Number & Algebra",
  subtopic: "Sequences & Series",

  // meta opționale (pentru past papers / analytics)
  marks: "6",                             // lasă "x" și înlocuiești când e cazul
  year: "",                               // folosit la past papers / prediction
  sourcePage: "",                         // ex: "AA SL Questionbank · Sequences & Series · p.12"
  // sourceRef: "",                       // opțional: referință liberă (ex: "May 2021 TZ2 P1 Q3")

  // ——— CALCULATOR (alege o singură variantă și șterge restul) ———
  gdc: "GDC",                      // scrie "GDC" sau "NO GDC" (sau șterge dacă folosești alta)
  // technology: "NO GDC",
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

For a particular arithmetic sequence, the fourth term is \(u_4 = 10\) and the ninth term is \(u_9 = 0\).

<div class="q">
  <span class="q-text">Find the value of <span class="math-inline">k</span> such that <span class="math-inline">S_k = 0</span>.</span>
  <span class="marks">[6]</span>
</div>

  `,

 solution_md: String.raw`

**Markscheme**

Let \(u_1\) be the first term and \(d\) the common difference of the arithmetic sequence.  

Using the general-term formula of an arithmetic sequence (IB Formula Booklet, SL 1.2),
$$
u_n = u_1 + (n-1)d
$$

Substituting \(n = 4\), we obtain
$$
u_4 = u_1 + 3d
$$

We have \(u_4 = 10\), so
$$
u_1 + 3d = 10. \tag{1}
$$

Substituting \(n = 9\), we obtain
$$
u_9 = u_1 + 8d
$$

We have \(u_9 = 0\), so
$$
u_1 + 8d = 0 \tag{2}
$$

We now solve the system formed by equations \((1)\) and \((2)\):
$$
\begin{aligned}
u_1 + 3d &= 10\\
u_1 + 8d &= 0
\end{aligned}
$$

Subtracting equation \((1)\) from equation \((2)\), we obtain
$$
\begin{aligned}
(u_1 + 8d) - (u_1 + 3d) &= 0 - 10 \\
5d &= -10 \\
d &= -2
\end{aligned}
$$

Substituting \(d = -2\) back into equation \((1)\), we obtain
$$
\begin{aligned}
u_1 + 3(-2) &= 10 \\
u_1 - 6 &= 10 \\
u_1 &= 16
\end{aligned}
$$

Therefore, the first term and common difference are
$$
\boxed{u_1 = 16} \qquad \text{and} \qquad \boxed{d = -2}
$$

---

To find the value of \(k\) such that \(S_k = 0\), we use the sum formula for an arithmetic sequence (IB Formula Booklet, SL 1.2),
$$
\begin{aligned}
S_k &= \frac{k}{2}\bigl[2u_1 + (k-1)d\bigr] \\
&= \frac{k}{2}\bigl[2(16) + (k-1)(-2)\bigr] \\
&= \frac{k}{2}(32 - 2k +2) \\
&= \frac{k}{2}(34 - 2k) \\
&= \frac{k}{2}(2)(17 - k) \\
&= k(17 - k)
\end{aligned}
$$

Thus,
$$
\begin{aligned}
S_k &= k(17 - k)
\end{aligned}
$$

We now set \(S_k = 0\) and solve for \(k\):

$$
\begin{aligned}
0 &= k(17 - k) \\
\end{aligned}
$$

we obtain
$$
\begin{aligned}
k &= 0 \quad \text{or} \quad k = 17
\end{aligned}
$$
Since \(k\) must be a positive integer (number of terms), we obtain
$$
\boxed{k = 17}
$$
This means that the sum of the first 17 terms is zero.


  `,
};

export default problem_xxx;
