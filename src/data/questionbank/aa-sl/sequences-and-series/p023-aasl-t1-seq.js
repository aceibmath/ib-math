// src/data/questionbank/aa-sl/sequences-and-series/p005-aasl-t1-seq.js


const problem_xxx = {
  //  IDENTITATE & ÎNCADRARE 
  id: "QB-AA-SL-SEQ-023",                 // ex: QB-AA-SL-SEQ-023 (UNIQ)
  code: "QB · AA SL · Number & Algebra · Sequences · 023", // titlu uman
  topic: "Number & Algebra",
  subtopic: "Sequences & Series",

  // meta opționale (pentru past papers / analytics)
  marks: "8",                             // lasă "x" și înlocuiești când e cazul
  year: "",                               // folosit la past papers / prediction
  sourcePage: "",                         // ex: "AA SL Questionbank  Sequences & Series  p.12"
  // sourceRef: "",                       // opțional: referință liberă (ex: "May 2021 TZ2 P1 Q3")

  //  CALCULATOR (alege o singură variantă și șterge restul) 
  gdc: "GDC",                      // scrie "GDC" sau "NO GDC" (sau șterge dacă folosești alta)
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

The second term, \(u_2\), of a geometric sequence is \(250\). The fifth term, \(u_5\), is \(16\).

<div class="q">
  <span class="q-text">(a) Find the common ratio of the sequence, <span class="math-inline">r</span>.</span>
  <span class="marks">[2]</span>
</div>

<div class="q">
  <span class="q-text">(b) Find the first term of the sequence, <span class="math-inline">u_1</span>.</span>
  <span class="marks">[2]</span>
</div>

<div class="q">
  <span class="q-text">(c) Find the least number of terms <span class="math-inline">n</span> such that <span class="math-inline">S_\infty - S_n &lt; 0.01</span>.</span>
  <span class="marks">[4]</span>
</div>

  `,

 solution_md: String.raw`

**Markscheme**

From the information provided, we are told that the second and fifth terms of a geometric sequence are \(u_2 = 250\) and \(u_5 = 16\).

---

**(a) Find the common ratio, \(r\).**

In a geometric sequence, the ratio between corresponding terms is constant:

$$
\frac{u_5}{u_2} = r^{3}
$$

Substituting the known values, we obtain

$$
r^{3} = \frac{16}{250} = \frac{8}{125}
$$

Taking the cube root gives

$$
r = \frac{2}{5}
$$

Therefore,

$$
\boxed{r = \frac{2}{5}}
$$

---

**(b) Find the first term, \(u_1\).**

Using the general-term formula for a geometric sequence (IB Formula Booklet, SL 1.2),

$$
u_n = u_1 r^{\,n-1}
$$

with \(n = 2\), we get:

$$
u_2 = u_1 r
$$

Substituting \(u_2 = 250\) and \(r = \frac{2}{5}\),

$$
250 = u_1 \left(\frac{2}{5}\right)
$$

Multiplying both sides by \(\frac{5}{2}\), we obtain

$$
u_1 = 250 \left(\frac{5}{2}\right)
$$

Therefore,

$$
\boxed{u_1 = 625}
$$

---

**(c) Find the least number of terms \(n\) such that \(S_\infty - S_n < 0.01\).**

For a geometric sequence with \(|r| < 1\), the difference between the sum to infinity and the sum of the first \(n\) terms is

$$
S_\infty - S_n = \frac{u_1 r^{\,n}}{1 - r}
$$

This difference becomes smaller as \(n\) increases.

Substituting \(u_1 = 625\) and \(r = \frac{2}{5}\), we obtain

$$
\begin{aligned}
S_\infty - S_n &= \frac{625 \left(\frac{2}{5}\right)^n}{1 - \frac{2}{5}}\\
&= \frac{625 \left(\frac{2}{5}\right)^n}{\frac{3}{5}}\\
&= \frac{3125}{3} \left(\frac{2}{5}\right)^n
\end{aligned}
$$

We require

$$
\frac{3125}{3} \left(\frac{2}{5}\right)^n < 0.01
$$

Multiplying both sides by \(\frac{3}{3125}\), we obtain

$$
\left(\frac{2}{5}\right)^n < \frac{0.03}{3125} 
$$

Taking natural logarithms:

$$
n \ln\left(\frac{2}{5}\right) < \ln\left(\frac{0.03}{3125}\right)
$$

Since \(\ln\left(\frac{2}{5}\right) < 0\), dividing by this negative number reverses the inequality:

$$
n > \frac{\ln\left(\frac{0.03}{3125}\right)}      {\ln\left(\frac{2}{5}\right)}
$$

Evaluating gives

$$
n > 12.6
$$

Therefore, the least integer satisfying the condition is

$$
\boxed{n = 13}
$$




  `,
};

export default problem_xxx;
