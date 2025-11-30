// src/data/questionbank/aa-sl/sequences-and-series/p005-aasl-t1-seq.js
// Completează câmpurile și șterge variantele pe care nu le folosești.

const problem_xxx = {
  // ——— IDENTITATE & ÎNCADRARE ———
  id: "QB-AA-SL-SEQ-011",                 // ex: QB-AA-SL-SEQ-011 (UNIQ)
  code: "QB · AA SL · Number & Algebra · Sequences · 011", // titlu uman
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

A 120 metre rope is cut into n pieces whose lengths form an arithmetic sequence with common difference d metres.<br>
The shortest and longest pieces are 2.8 m and 7.2 m respectively.


<div class="q">
  <span class="q-text">(a) Find the number of pieces, <span class="math-inline">n</span>.</span>
  <span class="marks">[3]</span>
</div>
<div class="q">
  <span class="q-text">(b) Find the common difference, <span class="math-inline">d</span>.</span>
  <span class="marks">[2]</span>
</div>

  `,

 solution_md: String.raw`

**Markscheme**

We model the lengths of the pieces as an arithmetic sequence. <br>
Let the first term be \(u_1\), the last term be \(u_n\), the common difference be \(d\), and the number of terms be \(n\).

From the information given:
- the total length of the rope is \(S_n = 120\) metres,
- the shortest piece has length \(u_1 = 2.8\) metres,
- the longest piece has length \(u_n = 7.2\) metres.

---

**(a) Find the number of pieces, \(n\).**

Using the sum formula for the first \(n\) terms of an arithmetic sequence (IB Formula Booklet, SL 1.2),
$$
S_n = \frac{n}{2}\bigl(u_1 + u_n\bigr)
$$

Substituting \(S_n = 120\), \(u_1 = 2.8\), and \(u_n = 7.2\), we obtain
$$
\begin{aligned}
120 &= \frac{n}{2}(2.8 + 7.2) \\
120 &= \frac{n}{2}(10) \\
120 &= 5n
\end{aligned}
$$
Dividing both sides by 5:
$$
n = 24
$$

Therefore, the rope is cut into
$$
\boxed{n = 24 \text{ pieces}}
$$

---

**(b) Find the common difference, \(d\).**

Using the general-term formula of an arithmetic sequence (IB Formula Booklet, SL 1.2),
$$
u_n = u_1 + (n-1)d
$$

Substituting \(u_n = 7.2\), \(u_1 = 2.8\), and \(n = 24\), we obtain


$$
\begin{aligned}
7.2 &= 2.8 + (24 - 1)d\\
7.2 &= 2.8 + 23d\\
7.2 - 2.8 &= 23d\\
4.4 &= 23d
\end{aligned}
$$
so,
$$
d = \frac{4.4}{23} \approx 0.191 (3 s.f.)
$$

Therefore, the common difference between successive piece lengths is
$$
\boxed{d \approx 0.191 \text{ metres}}
$$

  `,
};

export default problem_xxx;
