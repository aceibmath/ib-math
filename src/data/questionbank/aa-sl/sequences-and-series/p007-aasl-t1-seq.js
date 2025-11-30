// src/data/questionbank/aa-sl/sequences-and-series/p005-aasl-t1-seq.js
// Completează câmpurile și șterge variantele pe care nu le folosești.

const problem_xxx = {
  // ——— IDENTITATE & ÎNCADRARE ———
  id: "QB-AA-SL-SEQ-007",                 // ex: QB-AA-SL-SEQ-007 (UNIQ)
  code: "QB · AA SL · Number & Algebra · Sequences · XXX", // titlu uman
  topic: "Number & Algebra",
  subtopic: "Sequences & Series",

  // meta opționale (pentru past papers / analytics)
  marks: "6",                             // lasă "x" și înlocuiești când e cazul
  year: "",                               // folosit la past papers / prediction
  sourcePage: "",                         // ex: "AA SL Questionbank · Sequences & Series · p.12"
  // sourceRef: "",                       // opțional: referință liberă (ex: "May 2021 TZ2 P1 Q3")

  // ——— CALCULATOR (alege o singură variantă și șterge restul) ———
  gdc: "GDC",                      // scrie "GDC" sau "NO GDC" (sau șterge dacă folosești alta)
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

The sum of the first <span class="math-inline">n</span> terms of a sequence is given by  
$$
S_n = 4n^2 + n,
\qquad \text{where } n \in \mathbb{Z}^+.
$$

<div class="q">
  <span class="q-text">(a) Find <span class="math-inline">u_4</span>.</span>
  <span class="marks">[3]</span>
</div>

<div class="q">
  <span class="q-text">(b) Find an expression for <span class="math-inline">u_n</span>, the <span class="math-inline">n^{\text{th}}</span> term of the sequence.</span>
  <span class="marks">[3]</span>
</div>

<div class="q">
  <span class="q-text">(c) Show that the sequence is arithmetic.</span>
  <span class="marks">[2]</span>
</div>

  `,

 solution_md: String.raw`

**Markscheme**

**(a) Method 1 — Finding \(d\) by expressing both \(u_4\) and \(u_9\) in terms of \(u_1\)**  

Using the general-term formula of an arithmetic sequence (IB Formula Booklet, SL 1.2)
$$
u_n = u_1 + (n-1)d
$$

With \(n = 4\) and \(u_4 = 23\), we obtain
$$
23 = u_1 + (4-1)d
$$

With \(n = 9\) and \(u_9 = 58\), we obtain
$$
58 = u_1 + (9-1)d
$$

Using these, we get the simultaneous equations
$$
\begin{aligned}
u_1 + 3d &= 23\\
u_1 + 8d &= 58
\end{aligned}
$$

Subtract the first equation from the second:
$$
\begin{aligned}
(u_1 + 8d) - (u_1 + 3d) &= 58 - 23 \\
5d &= 35
\end{aligned}
$$
Thus
$$
\boxed{d = 7}
$$

---

**(a) Method 2 — Finding \(d\) by expressing \(u_9\) in terms of \(u_4\)**  

<div style="text-align:center; margin:0.5rem 0.75rem;">
  <img src="/diagrams/qb/aa-sl/p007-aasl-t1-seq-diagram1.svg"
       alt="Diagram showing the terms \(u_4\) to \(u_9\) with five steps of size \(d\) between \(u_4\) and \(u_9\)"
       style="max-width:70%; height:auto;" />
</div>

From the diagram above, to go from \(u_4\) to \(u_9\) we add the common difference \(d\) five times.  

This gives the relation
$$
u_9 = u_4 + 5d
$$

Substituting \(u_4 = 23\) and \(u_9 = 58\), we obtain
$$
\begin{aligned}
23 + 5d &= 58 \\
5d &= 35
\end{aligned}
$$

This confirms that
$$
\boxed{d = 7}
$$

---

**(b) Find the first term \(u_1\)**  

Using again the general-term formula of an arithmetic sequence,
$$
u_n = u_1 + (n-1)d
$$

With \(n = 4\), \(u_4 = 23\), and \(d = 7\), we obtain
$$
\begin{aligned}
23 &= u_1 + (4-1)(7) \\
23 &= u_1 + 21
\end{aligned}
$$

Subtracting 21 from both sides, we get
$$
\boxed{u_1 = 2}
$$

---

**(c) Find the sum of the first 25 terms \(S_{25}\)**  

Using the sum formula for the first \(n\) terms of an arithmetic sequence (IB Formula Booklet, SL 1.2)
$$
S_n = \frac{n}{2}\bigl[2u_1 + (n-1)d\bigr]
$$

With \(n = 25\), \(u_1 = 2\), and \(d = 7\), we obtain
$$
S_{25}
= \frac{25}{2}\bigl[2\cdot 2 + (25-1)\cdot 7\bigr].
$$

Evaluating the expression,
$$
S_{25} = 2150.
$$

Therefore, the sum of the first 25 terms of the sequence is
$$
\boxed{S_{25} = 2150}.
$$

  `,
};

export default problem_xxx;
