// src/data/questionbank/aa-sl/sequences-and-series/p005-aasl-t1-seq.js


const problem_xxx = {
  //  IDENTITATE & ÎNCADRARE 
  id: "QB-AA-SL-SEQ-027",                 // ex: QB-AA-SL-SEQ-027 (UNIQ)
  code: "QB · AA SL · Number & Algebra · Sequences · 027", // titlu uman
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
  <span class="q-text">The first term of an arithmetic sequence is <span class="math-inline">u_1 = 0</span> and the common difference <span class="math-inline">d = 12</span>.</span>
</div>

<div class="q">
  <span class="q-text">(a) Find the <span class="math-inline">n</span>-th term of the arithmetic sequence, <span class="math-inline">u_n</span>.</span>
  <span class="marks">[1]</span>
</div>

<br>

<div class="q">
  <span class="q-text">The first term of a geometric sequence is 6. The 6th term of the geometric sequence is equal to the 17th term of the arithmetic sequence given above.</span>
</div>

<div class="q">
  <span class="q-text">(b) Find the <span class="math-inline">n</span>-th term of the geometric sequence, <span class="math-inline">v_n</span>.</span>
  <span class="marks">[2]</span>
</div>

<br>

<div class="q">
  <span class="q-text">The <span class="math-inline">n</span>-th term of the arithmetic sequence, <span class="math-inline">u_n</span>, is equal to the <span class="math-inline">n</span>-th term of the geometric sequence <span class="math-inline">v_n</span>.</span>
</div>

<div class="q">
  <span class="q-text">(c) Find the possible value of <span class="math-inline">n</span>.</span>
  <span class="marks">[3]</span>
</div>

  `,

 solution_md: String.raw`

**Markscheme**

From the information provided, we are told that an arithmetic sequence has first term \(u_1 = 0\) and common difference \(d = 12\).

We are also given a geometric sequence with first term 6, related to the arithmetic sequence in several ways.

---

**(a) Find the \(n\)-th term of the arithmetic sequence, \(u_n\).**

Using the general-term formula for an arithmetic sequence (IB Formula Booklet, SL 1.2),

$$
u_n = u_1 + (n-1)d
$$

we substitute \(u_1 = 0\) and \(d = 12\) to obtain

$$
u_n = 0 + (n-1) \cdot 12
$$

Therefore,

$$
\boxed{u_n = 12(n-1)} \tag{1}
$$

---

**(b) Find the \(n\)-th term of the geometric sequence, \(v_n\).**

We are told that the 6th term of the geometric sequence is equal to the 17th term of the arithmetic sequence:

$$
v_{6} = u_{17}
$$

Using the general-term formula for a geometric sequence (IB Formula Booklet, SL 1.2),

$$
v_n = v_1 r^{n-1}
$$

with \(n = 6\) and \(v_1 = 6\), we get:

$$
v_6 = 6r^{5}
$$

Using (1) with \(n = 17\), we obtain

$$
u_{17} = 12(17 - 1) = 12(16) = 192
$$

From the condition \(v_6 = u_{17}\), we obtain

$$
6r^{5} = 192
$$

Dividing both sides by 6, we obtain

$$
r^{5} = 32
$$

Taking the fifth root gives

$$
r = 2
$$

Therefore, the \(n\)-th term of the geometric sequence is

$$
v_n = 6 \cdot 2^{n-1}
$$

Hence,

$$
\boxed{v_n = 6 \cdot 2^{n-1}} \tag{2}
$$

---

**(c) Find the possible value of \(n\).**

We are told that the \(n\)-th terms of the two sequences are equal:

$$
u_n = v_n
$$

Using (1) and (2), we obtain

$$
12(n-1) = 6 \cdot 2^{n-1}
$$

Dividing both sides by 6, we obtain

$$
2(n-1) = 2^{n-1}
$$

Let \(y = 2(x-1)\) and \(y = 2^{x-1}\).

<div class="diagram" style="text-align: center;">
  <img src="/diagrams/qb/aa-sl/seq/p027-aasl-t1-seq.png"
       alt="Graph showing intersections at (2,2) and (3,4)"
       style="width: 60%; max-width: 500px;">
</div>

From the graph, we observe that the intersections occur at

$$
(2, 2) \quad \text{and} \quad (3, 4)
$$

This means that the equation \(2(x-1) = 2^{x-1}\) has solutions

$$
x = 2 \quad \text{and} \quad x = 3
$$

In the context of this problem, \(x\) represents the term number \(n\).

Since \(n\) must be a positive integer, the possible values of \(n\) are

$$
\boxed{n = 2 \text{ or } n = 3}
$$


  `,
};

export default problem_xxx;
