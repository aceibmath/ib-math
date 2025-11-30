// src/data/questionbank/aa-sl/sequences-and-series/p005-aasl-t1-seq.js
// Completează câmpurile și șterge variantele pe care nu le folosești.

const problem_xxx = {
  // ——— IDENTITATE & ÎNCADRARE ———
  id: "QB-AA-SL-SEQ-015",                 // ex: QB-AA-SL-SEQ-015 (UNIQ)
  code: "QB · AA SL · Number & Algebra · Sequences · 015", // titlu uman
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
An arithmetic sequence has first term \(u_1 = 90\) and common difference \(d =-2.25\).
<div class="q">
  <span class="q-text">
    (a) Given that the <span class="math-inline">k</span>-th term of the sequence is zero, find the value of <span class="math-inline">k</span>.
  </span>
  <span class="marks">[2]</span>
</div>

Let <span class="math-inline">S_n</span> denote the sum of the first <span class="math-inline">n</span> terms of the sequence.
<div class="q">
  <span class="q-text">
    (b) Find the maximum value of <span class="math-inline">S_n</span>.
  </span>
  <span class="marks">[3]</span>
</div>


  `,

 solution_md: String.raw`

**Markscheme**

We are given an arithmetic sequence with first term \(u_1 = 90\) and common difference \(d = -2.25\).

---

**(a) Given that the \(k\)-th term of the sequence is zero, find the value of \(k\).**

Using the general-term formula of an arithmetic sequence (IB Formula Booklet, SL 1.2),

$$
u_n = u_1 + (n-1)d
$$

substituting \(u_1 = 90\) and \(d = -2.25\), we obtain

$$
u_n = 90 + (n-1)(-2.25)
$$

We now set \(u_k = 0\) and solve for \(k\):
$$
\begin{aligned}
0 &= 90 + (k-1)(-2.25) \\
0 &= 90 - 2.25(k-1) \\
2.25(k-1) &= 90 \\
k-1 &= \frac{90}{2.25} \\
k-1 &= 40 \\
k &= 41
\end{aligned}
$$

Therefore,
$$
\boxed{k = 41}
$$
This means that the 41st term, \(u_{41}\), is equal to 0.

---

**(b) Find the maximum value of \(S_n\).**

Using the sum formula for an arithmetic sequence (IB Formula Booklet, SL 1.2),

$$
S_n = \frac{n}{2}\bigl[2u_1 + (n-1)d\bigr]
$$

substituting \(u_1 = 90\) and \(d = -2.25\), we obtain

$$
S_n = \frac{n}{2}\bigl[180 + (n-1)(-2.25)\bigr]
$$

- From part (a), we know that \(u_{41} = 0\).  
- The first 40 terms of the sequence,
\[
u_1, u_2, \ldots, u_{40},
\]
are all positive, since the sequence decreases steadily from \(u_1 = 90\) down to \(u_{41} = 0\).  
- Every term after this,
\[
u_{42}, u_{43}, \ldots,
\]
is negative.

Therefore, the maximum value of the sum of the first n terms occurs at n = 40 (or n = 41), and is

We now compute \(S_{40}\):
$$
\begin{aligned}
S_{40}
&= \frac{40}{2}\bigl[180 + 39(-2.25)\bigr] \\
&= 20(180 - 87.75)\\
&= 20(92.25) \\
&= 1845
\end{aligned}
$$

Thus, the maximum value of the sum of the first \(n\) terms is
$$
\boxed{S_{40} = S_{41} = 1845}
$$


  `,
};

export default problem_xxx;
