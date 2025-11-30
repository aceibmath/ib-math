// src/data/questionbank/aa-sl/sequences-and-series/p005-aasl-t1-seq.js


const problem_xxx = {
  //  IDENTITATE & ÎNCADRARE 
  id: "QB-AA-SL-SEQ-026",                 // ex: QB-AA-SL-SEQ-026 (UNIQ)
  code: "QB · AA SL · Number & Algebra · Sequences · 026", // titlu uman
  topic: "Number & Algebra",
  subtopic: "Sequences & Series",

  // meta opționale (pentru past papers / analytics)
  marks: "6",                             // lasă "x" și înlocuiești când e cazul
  year: "",                               // folosit la past papers / prediction
  sourcePage: "",                         // ex: "AA SL Questionbank  Sequences & Series  p.12"
  // sourceRef: "",                       // opțional: referință liberă (ex: "May 2021 TZ2 P1 Q3")

  //  CALCULATOR (alege o singură variantă și șterge restul) 
  gdc: "NO GDC",                      // scrie "GDC" sau "NO GDC" (sau șterge dacă folosești alta)
  // technology: "GDC/NO GDC",
  // calculator: true,                    // true => CALCULATOR, false => NO CALCULATOR

  //  DIFFICULTY 
  difficulty: "Medium",         // păstrează una și șterge restul

  //  VIZIBILITATE CHIP-URI (header) 
  // showX = dacă să apară chip-ul deloc; hasX = stare on/off (verde vs gri)
  showCalc: true,
  showDifficulty: true,

  showVideo: true,
  hasVideo: false,

  showIA: true,
  hasIA: true,

  //  CONȚINUT 
  statement_md: String.raw`

A geometric sequence has all positive terms. The sum of the first two terms is 6 and the sum to infinity is 8.

<div class="q">
  <span class="q-text">(a) Find the common ratio, <span class="math-inline">r</span>.</span>
  <span class="marks">[4]</span>
</div>

<div class="q">
  <span class="q-text">(b) Find the first term, <span class="math-inline">u_1</span>.</span>
  <span class="marks">[2]</span>
</div>

  `,

 solution_md: String.raw`

A geometric sequence has all positive terms. The sum of the first two terms is 6 and the sum to infinity is 8. Find the value of

<div class="q">
  <span class="q-text">(a) the common ratio;</span>
  <span class="marks">[4]</span>
</div>

<div class="q">
  <span class="q-text">(b) the first term.</span>
  <span class="marks">[2]</span>
</div>

`,

solution_md: String.raw`

**Markscheme**

From the information provided, we are told that a geometric sequence has all positive terms, the sum of the first two terms is 6, and the sum to infinity is 8.

Let the first term be \(u_1\) and the common ratio be \(r\).

---

**(a) Find the common ratio.**

The sum of the first two terms is

$$
\begin{aligned}
u_1 + u_2 &= 6 \\
u_1 + u_1 r &= 6
\end{aligned}
$$
Taking \(u_1\) as a common factor, we obtain
$$
u_1(1 + r) = 6 \tag{1}
$$

Using the sum to infinity formula for a geometric sequence (IB Formula Booklet, SL 1.8),

$$
S_\infty = \frac{u_1}{1 - r}
$$

with \(S_\infty = 8\), we obtain

$$
8 = \frac{u_1}{1 - r} \tag{2}
$$

Rearranging (2) gives

$$
u_1 = 8(1 - r) \tag{3}
$$

Substituting (3) into (1), we obtain

$$
\begin{aligned}
u_1(1 + r) &= 6 \\
8(1 - r)(1 + r) &= 6 \\
8(1 - r^2) &= 6 \\
1 - r^2 &= \frac{3}{4} \\
r^2 &= \frac{1}{4}
\end{aligned}
$$

Hence

$$
r = \pm \frac{1}{2}
$$

For the sum to infinity to exist, we require \(|r| < 1\). Both values satisfy this condition.

Since all terms are positive and \(u_1 > 0\), we require \(r > 0\).

Therefore,

$$
\boxed{r = \frac{1}{2}}
$$

---

**(b) Find the first term.**

Using (3) with \(r = \frac{1}{2}\), we obtain

$$
\begin{aligned}
u_1 &= 8\left(1 - \frac{1}{2}\right) \\
&= 8\left(\frac{1}{2}\right) \\
&= 4
\end{aligned}
$$

Therefore,

$$
\boxed{u_1 = 4}
$$

  `,
};

export default problem_xxx;
