// src/data/questionbank/aa-sl/sequences-and-series/p002-aasl-t1-seq.js

const problem_xxx = {
  // ——— IDENTITATE & ÎNCADRARE ———
  id: "QB-AA-SL-SEQ-002",
  code: "QB · AA SL · Number & Algebra · Sequences · 002",
  topic: "Number & Algebra",
  subtopic: "Sequences & Series",

  // meta
  marks: "4",
  year: "",
  sourcePage: "",

  // CALCULATOR / DIFICULTY
  gdc: "NO GDC",
  difficulty: "Medium",

  showCalc: true,
  showDifficulty: true,
  showVideo: false,
  hasVideo: false,
  showIA: true,
  hasIA: true,

  // ——— ENUNȚ (Markdown + LaTeX) ———
  statement_md: String.raw`
Three numbers are consecutive terms of an arithmetic sequence. The sum of the three numbers is 33 and their product is 1155.

Find the three numbers.

  `,

  // ——— SOLUȚIE (Markdown + LaTeX) ———
solution_md: String.raw`
**Markscheme**

We are told that the three numbers are consecutive terms of an arithmetic sequence,
so they have a constant common difference.

It is clearest to set the middle term as \(a\).  
Then the previous term is \(a - d\) and the next term is \(a + d\), so the three terms are:

$$
a - d,\quad a,\quad a + d
$$

---

**(a) Step 1: Use the sum of the numbers**

The sum of the three numbers is 33:

$$
(a - d) + a + (a + d) = 33
$$

The \(-d\) and \(+d\) cancel:

$$
3a = 33
$$

Dividing both sides by 3:

$$
a = 11
$$

So the three numbers become:

$$
11 - d,\quad 11,\quad 11 + d
$$

---

**Step 2: Use the product of the numbers**

The product is 1155:

$$
(11 - d)(11)(11 + d) = 1155
$$

Divide both sides by 11:

$$
(11 - d)(11 + d) = 105
$$

Recognise the difference of squares:

$$
121 - d^2 = 105
$$

---

**Step 3: Solve for \(d\)**

Subtracting 105 from both sides:

$$
121 - 105 = d^2
$$

So

$$
d^2 = 16
$$

The possible values of \(d\) are:

$$
d = 4 \quad \text{or} \quad d = -4
$$

---

**Step 4: Evaluate both cases**

Recall that the three terms are

$$
11 - d,\quad 11,\quad 11 + d
$$

Case 1: \(d = 4\)

$$
11 - 4 = 7,\quad 11,\quad 11 + 4 = 15
$$

A valid set of numbers is:

$$
\boxed{7,\; 11,\; 15}
$$

Case 2: \(d = -4\)

$$
11 - (-4) = 15,\quad 11,\quad 11 + (-4) = 7
$$

The numbers appear in reverse order:

$$
\boxed{15,\; 11,\; 7}
$$





`,

};

export default problem_xxx;
