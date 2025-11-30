// src/data/questionbank/aa-sl/sequences-and-series/p005-aasl-t1-seq.js


const problem_xxx = {
  //  IDENTITATE & ÎNCADRARE 
  id: "QB-AA-SL-SEQ-022",                 // ex: QB-AA-SL-SEQ-022 (UNIQ)
  code: "QB · AA SL · Number & Algebra · Sequences · 022", // titlu uman
  topic: "Number & Algebra",
  subtopic: "Sequences & Series",

  // meta opționale (pentru past papers / analytics)
  marks: "6",                             // lasă "x" și înlocuiești când e cazul
  year: "",                               // folosit la past papers / prediction
  sourcePage: "",                         // ex: "AA SL Questionbank  Sequences & Series  p.12"
  // sourceRef: "",                       // opțional: referință liberă (ex: "May 2021 TZ2 P1 Q3")

  //  CALCULATOR (alege o singură variantă și șterge restul) 
  gdc: "GDC",                      // scrie "GDC" sau "NO GDC" (sau șterge dacă folosești alta)
  // technology: "GDC/NO GDC",
  // calculator: true,                    // true => CALCULATOR, false => NO CALCULATOR

  //  DIFFICULTY 
  difficulty: "Easy",         // păstrează una și șterge restul

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

The third term, \(u_3\), of a geometric sequence is \(48\). The fourth term, \(u_4\), is \(32\).

<div class="q">
  <span class="q-text">(a) Find the common ratio of the sequence, <span class="math-inline">r</span>.</span>
  <span class="marks">[2]</span>
</div>

<div class="q">
  <span class="q-text">(b) Find the first term of the sequence, <span class="math-inline">u_1</span>.</span>
  <span class="marks">[2]</span>
</div>

<div class="q">
  <span class="q-text">(c) Calculate the sum of the first 10 terms of the sequence.</span>
  <span class="marks">[2]</span>
</div>

  `,

 solution_md: String.raw`

**Markscheme**

From the information provided, we are told that the third and fourth terms of a geometric sequence are \(u_3 = 48\) and \(u_4 = 32\).

---

**(a) Find the common ratio, \(r\).**

In a geometric sequence, the ratio between consecutive terms is constant:

$$
r = \frac{u_4}{u_3}
$$

Substituting the known values, we obtain

$$
r = \frac{32}{48} = \frac{2}{3}
$$

Therefore,

$$
\boxed{r = \frac{2}{3}}
$$

---

**(b) Find the first term, \(u_1\).**

Using the general-term formula for a geometric sequence (IB Formula Booklet, SL 1.2),

$$
u_n = u_1 r^{\,n-1}
$$

we write

$$
u_3 = u_1 r^{2}
$$

Substituting \(u_3 = 48\) and \(r = \frac{2}{3}\),

$$
48 = u_1 \left(\frac{2}{3}\right)^2
$$

Simplifying the square:

$$
48 = u_1 \left(\frac{4}{9}\right)
$$

Multiplying both sides by \(\frac{9}{4}\), we obtain

$$

u_1 = 48 \left(\frac{9}{4}\right) 
$$

Therefore,

$$
\boxed{u_1 = 108}
$$

---

**(c) Calculate the sum of the first 10 terms.**

Using the sum of the first \(n\) terms of a geometric sequence (IB Formula Booklet, SL 1.2),

$$
S_n = u_1 \,\frac{1 - r^{\,n}}{1 - r}
$$

and substituting \(n = 10\), \(u_1 = 108\), and \(r = \frac{2}{3}\), we obtain

$$
\begin{aligned}
S_{10} &= 108 \,\frac{1 - \left(\frac{2}{3}\right)^{10}}{1 - \frac{2}{3}}\\
\end{aligned}
$$

Therefore,

$$
\boxed{S_{10} \approx 318}
$$

  `,
};

export default problem_xxx;
