// src/data/questionbank/aa-sl/sequences-and-series/p005-aasl-t1-seq.js


const problem_xxx = {
  //  IDENTITATE & ÎNCADRARE 
  id: "QB-AA-SL-SEQ-024",                 // ex: QB-AA-SL-SEQ-024(UNIQ)
  code: "QB · AA SL · Number & Algebra · Sequences · 024", // titlu uman
  topic: "Number & Algebra",
  subtopic: "Sequences & Series",

  // meta opționale (pentru past papers / analytics)
  marks: "8",                             // lasă "x" și înlocuiești când e cazul
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



<div class="q">
  <span class="q-text">(a) Show that <span class="math-inline">(1 - r)(1 + r + r^2) = 1 - r^3</span>.</span>
  <span class="marks">[2]</span>
</div>

<div class="q">
  <span class="q-text">(b) A geometric sequence has first term <span class="math-inline">a</span>, common ratio <span class="math-inline">r</span>, and sum to infinity 35.</span>
</div>

<div class="q">
  <span class="q-text">A second geometric sequence has first term <span class="math-inline">a</span>, common ratio <span class="math-inline">r^3</span>, and sum to infinity 20.</span>
</div>

<div class="q">
  <span class="q-text">Find <span class="math-inline">r</span>.</span>
  <span class="marks">[6]</span>
</div>









  `,

 solution_md: String.raw`

**Markscheme**

---

**(a) Show that \((1 - r)(1 + r + r^2) = 1 - r^3\).**

Expanding the left-hand side:

$$
\begin{aligned}
(1 - r)(1 + r + r^2) &= 1(1 + r + r^2) - r(1 + r + r^2)\\
&= 1 + r + r^2 - r - r^2 - r^3\\
&= 1 - r^3
\end{aligned}
$$

Therefore,

$$
(1 - r)(1 + r + r^2) = 1 - r^3
$$

---

**(b) Find \(r\).**

From the information provided, we are told that we have two geometric sequences, each with first term \(a\):

- the first has common ratio \(r\) and sum to infinity \(35\);
- the second has common ratio \(r^3\) and sum to infinity \(20\).

Using the sum to infinity of a geometric sequence (IB Formula Booklet, SL 1.8),

$$
S_\infty = \frac{u_1}{1 - r}, \quad |r| < 1
$$

we write for the first sequence

$$
35 = \frac{a}{1 - r} \tag{1}
$$

and for the second sequence

$$
20 = \frac{a}{1 - r^3} \tag{2}
$$

Dividing (1) by (2), we obtain

$$
\frac{35}{20} = \frac{\frac{a}{1 - r}}{\frac{a}{1 - r^3}} = \frac{1 - r^3}{1 - r}
$$

From part (a), we know that \(1 - r^3 = (1 - r)(1 + r + r^2)\), so

$$
\frac{1 - r^3}{1 - r} = \frac{(1 - r)(1 + r + r^2)}{1 - r} = 1 + r + r^2
$$

Therefore,

$$
1 + r + r^2 = \frac{35}{20} = \frac{7}{4}
$$

Multiplying both sides by 4, we obtain

$$
4(1 + r + r^2) = 7
$$

Expanding:

$$
\begin{aligned}
4 + 4r + 4r^2 &= 7\\
4r^2 + 4r + 4 - 7 &= 0\\
4r^2 + 4r - 3 &= 0
\end{aligned}
$$

Using the quadratic formula (IB Formula Booklet, SL 2.7),

$$
\begin{aligned}
r &= \frac{-4 \pm \sqrt{16 - 4(4)(-3)}}{2(4)}\\
&= \frac{-4 \pm 8}{8}
\end{aligned}
$$

This gives two solutions:

$$
r = \frac{4}{8} = \frac{1}{2} \quad \text{or} \quad r = \frac{-12}{8} = -\frac{3}{2}
$$

For the sum to infinity to exist, we require \(|r| < 1\).

Hence \(r = -\frac{3}{2}\) is not valid, and we deduce that

$$
\boxed{r = \frac{1}{2}}
$$

  `,
};

export default problem_xxx;
