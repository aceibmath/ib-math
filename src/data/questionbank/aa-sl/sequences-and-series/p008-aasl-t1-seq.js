// src/data/questionbank/aa-sl/sequences-and-series/p005-aasl-t1-seq.js
// Completează câmpurile și șterge variantele pe care nu le folosești.

const problem_xxx = {
  // ——— IDENTITATE & ÎNCADRARE ———
  id: "QB-AA-SL-SEQ-008",                 // ex: QB-AA-SL-SEQ-008 (UNIQ)
  code: "QB · AA SL · Number & Algebra · Sequences · 008", // titlu uman
  topic: "Number & Algebra",
  subtopic: "Sequences & Series",

  // meta opționale (pentru past papers / analytics)
  marks: "x",                             // lasă "x" și înlocuiești când e cazul
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

A theatre has 25 rows of seats. There are 11 seats in the first row, 13 seats in the second row, and each successive row contains two more seats than the previous row.

<div class="q">
  <span class="q-text">(a) Calculate the number of seats in the 25<sup>th</sup> row.</span>
  <span class="marks">[2]</span>
</div>

<div class="q">
  <span class="q-text">(b) Calculate the total number of seats.</span>
  <span class="marks">[2]</span>
</div>

  `,

 solution_md: String.raw`

**Markscheme**

We model the numbers of seats per row as an arithmetic sequence.

Let \(u_1\) be the number of seats in the first row and \(d\) the common difference.

From the question:  
- the first row has \(u_1 = 11\) seats,  
- the second row has \(u_2 = 13\) seats,  
- the third row has \(u_3 = 15\) seats,  
- each row has two more seats than the previous one, so \(d = 2\),  
- there are \(n = 25\) rows in total.

---

**(a) Calculate the number of seats in the \(25^{\text{th}}\) row**

Using the general-term formula of an arithmetic sequence (IB Formula Booklet, SL 1.2),
$$
u_n = u_1 + (n-1)d
$$

Substituting \(u_1 = 11\), \(n = 25\), and \(d = 2\), we obtain
$$
u_{25} = 11 + (25 - 1)\cdot 2
$$

Therefore, the total number of seats in the \(25^{\text{th}}\) row is  
$$
\boxed{u_{25} = 59}
$$


---

**(b) Calculate the total number of seats**

Using the sum formula for the first \(n\) terms of an arithmetic sequence (IB Formula Booklet, SL 1.2),
$$
S_n = \frac{n}{2}\bigl[2u_1 + (n-1)d\bigr]
$$

Substituting \(n = 25\), \(u_1 = 11\), \(d = 2\), we obtain
$$
S_{25}
= \frac{25}{2}\bigl[2\cdot 11 + (25-1)\cdot 2\bigr]
$$

Evaluating the expression,
$$
S_{25} = 875.
$$

Therefore, the total number of seats in the theatre is
$$
\boxed{S_{25} = 875}.
$$


  `,
};

export default problem_xxx;
