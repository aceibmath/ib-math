// src/data/questionbank/aa-sl/sequences-and-series/p005-aasl-t1-seq.js


const problem_xxx = {
  //  IDENTITATE & ÎNCADRARE 
  id: "QB-AA-SL-SEQ-025",                 // ex: QB-AA-SL-SEQ-025 (UNIQ)
  code: "QB · AA SL · Number & Algebra · Sequences · XXX", // titlu uman
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

An infinite geometric series is given by

$$
\sum_{k=1}^{\infty} 5(3 - 2x)^k.
$$

<div class="q">
  <span class="q-text">(a) Write down the common ratio of the series in terms of <span class="math-inline">x</span>.</span>
  <span class="marks">[1]</span>
</div>

<div class="q">
  <span class="q-text">(b) Find the values of <span class="math-inline">x</span> for which the series has a finite sum.</span>
  <span class="marks">[3]</span>
</div>

<div class="q">
  <span class="q-text">(c) When <span class="math-inline">x = 1.3</span>, find</span>
</div>

<div class="q">
  <span class="q-text">(i) the sum of the series.</span>
</div>

<div class="q">
  <span class="q-text">(ii) the minimum number of terms needed to give a sum which exceeds <span class="math-inline">3.3</span>.</span>
  <span class="marks">[4]</span>
</div>

  `,

 solution_md: String.raw`

An infinite geometric series is given by

$$
\sum_{k=1}^{\infty} 5(3 - 2x)^k
$$

<div class="q">
  <span class="q-text">(a) Write down the common ratio of the series in terms of <span class="math-inline">x</span>.</span>
  <span class="marks">[1]</span>
</div>

<div class="q">
  <span class="q-text">(b) Find the values of <span class="math-inline">x</span> for which the series has a finite sum.</span>
  <span class="marks">[3]</span>
</div>

<div class="q">
  <span class="q-text">(c) When <span class="math-inline">x = 1.3</span>, find</span>
</div>

<div class="q">
  <span class="q-text">(i) the sum of the series.</span>
</div>

<div class="q">
  <span class="q-text">(ii) the minimum number of terms needed to give a sum which exceeds 3.3.</span>
  <span class="marks">[4]</span>
</div>

  `,

  solution_md: String.raw`

An infinite geometric series is given by

$$
\sum_{k=1}^{\infty} 5(3 - 2x)^k
$$

<div class="q">
  <span class="q-text">(a) Write down the common ratio of the series in terms of <span class="math-inline">x</span>.</span>
  <span class="marks">[1]</span>
</div>

<div class="q">
  <span class="q-text">(b) Find the values of <span class="math-inline">x</span> for which the series has a finite sum.</span>
  <span class="marks">[3]</span>
</div>

<div class="q">
  <span class="q-text">(c) When <span class="math-inline">x = 1.3</span>, find</span>
</div>

<div class="q">
  <span class="q-text">(i) the sum of the series.</span>
</div>

<div class="q">
  <span class="q-text">(ii) the minimum number of terms needed to give a sum which exceeds 3.3.</span>
  <span class="marks">[4]</span>
</div>

  `,

  solution_md: String.raw`

**Markscheme**

We are given an infinite geometric series:

$$
\sum_{k=1}^{\infty} 5(3 - 2x)^k
$$

---

**(a) Write down the common ratio in terms of \(x\).**

In a geometric series, the expression being raised to the power \(k\) gives the common ratio.

Therefore,

$$
\boxed{r = 3 - 2x} \tag{1}
$$

---

**(b) Find the values of \(x\) for which the series has a finite sum.**

A geometric series has a finite sum when

$$
|r| < 1
$$

Substituting (1), we obtain

$$
|3 - 2x| < 1
$$

This inequality becomes

$$
-1 < 3 - 2x < 1
$$

Subtracting 3 from each part,

$$
-4 < -2x < -2
$$

Dividing by \(-2\) (which reverses both inequalities), we obtain

$$
1 < x < 2
$$

Therefore,

$$
\boxed{1 < x < 2}
$$

---

**(c) When \(x = 1.3\), find:**

**(i) the sum of the series.**

Substituting \(x = 1.3\) into (1), we obtain

$$
r = 3 - 2(1.3) = 0.4
$$

The first term is

$$
u_1 = 5r = 5(0.4) = 2
$$

Using the sum to infinity formula for a geometric series (IB Formula Booklet, SL 1.8),

$$
S_\infty = \frac{u_1}{1 - r}
$$

we obtain

$$
S_\infty = \frac{2}{1 - 0.4} = \frac{2}{0.6} = \frac{10}{3}
$$

Therefore,

$$
\boxed{S_\infty = \frac{10}{3}}
$$

**(ii) the minimum number of terms needed to give a sum which exceeds 3.3.**

Using the sum of the first \(n\) terms of a geometric series (IB Formula Booklet, SL 1.2),

$$
S_n = \frac{u_1(1 - r^{\,n})}{1 - r}
$$

we substitute \(u_1 = 2\) and \(r = 0.4\) to obtain

$$
S_n = \frac{2(1 - 0.4^{\,n})}{0.6} = \frac{10}{3}\,(1 - 0.4^{\,n})
$$

We require

$$
\frac{10}{3}(1 - 0.4^{\,n}) > 3.3
$$

Dividing both sides by \(\frac{10}{3}\), we obtain

$$
1 - 0.4^{\,n} > 0.99
$$

Subtracting 1,

$$
-0.4^{\,n} > -0.01
$$

Multiplying both sides by \(-1\) reverses the inequality:

$$
0.4^{\,n} < 0.01
$$

Taking natural logarithms:

$$
n \ln(0.4) < \ln(0.01)
$$

Since \(\ln(0.4) < 0\), dividing by this negative value reverses the inequality:

$$
n > \frac{\ln(0.01)}{\ln(0.4)}
$$

Evaluating gives

$$
n > 5.02
$$

Therefore, the least integer satisfying the condition is

$$
\boxed{n = 6}
$$

  `,
};

export default problem_xxx;
