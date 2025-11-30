// src/data/questionbank/aa-sl/sequences-and-series/p004-aasl-t1-seq.js

const problem_xxx = {
  // ——— IDENTITATE & ÎNCADRARE ———
  id: "QB-AA-SL-SEQ-004",                 // ex: QB-AA-SL-SEQ-004 (UNIQ)
  code: "QB · AA SL · Number & Algebra · Sequences · 004", // titlu uman
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

  showVideo: false,
  hasVideo: false,

  showIA: true,
  hasIA: true,

  // ——— CONȚINUT ———
statement_md: String.raw`
The first term of an arithmetic series is \( -5 \) and the fourth term is \( 13 \).
The sum of the series is \( 220 \).

Find the number of terms in the series.
  `,

   solution_md: String.raw`
**Markscheme**

We recall the formula for the general term of an arithmetic sequence (IB Formula Booklet, SL 1.2):
$$
u_n = u_1 + (n-1)d.
$$

We are told that
$$
u_1 = -5, \qquad u_4 = 13.
$$

---

**(a) Step 1 — Use the fourth term to find the common difference**

For the fourth term:
$$
u_4 = u_1 + 3d.
$$

Substitute the known values:
$$
\begin{aligned}
13 &= -5 + 3d \\
13 + 5 &= 3d \\
18 &= 3d \\
d &= 6
\end{aligned}
$$

Thus
$$
\boxed{u_1 = -5,\qquad d = 6} 
$$

---

**(b) Step 1 — Write the formula for the sum of the first \(n\) terms**

Substitute \(u_1 = -5\) and \(d = 6\) into the sum formula:
$$
S_n = \frac{n}{2}\bigl(2(-5) + 6(n-1)\bigr).
$$

Simplify:
$$
\begin{aligned}
S_n &= \frac{n}{2}(-10 + 6n - 6) \\
    &= \frac{n}{2}(6n - 16)
\end{aligned}
$$

Thus
$$
S_n = n(3n - 8).
$$

---

**Step 2 — Form the equation using the given condition**

We are told that
$$
S_n = 220.
$$

So
$$
\begin{aligned}
n(3n - 8) &= 220 \\
3n^2 - 8n - 220 &= 0
\end{aligned}
$$

---

**Step 3 — Solve the quadratic equation**

Using the quadratic formula:
$$
n = \frac{8 \pm \sqrt{(-8)^2 - 4\cdot 3 \cdot (-220)}}{6}
$$

Compute the discriminant:
$$
\begin{aligned}
64 + 2640 &= 2704
\end{aligned}
$$

Thus
$$
n = \frac{8 \pm \sqrt{2704}}{6}
     = \frac{8 \pm 52}{6}.
$$

So
$$
n = 10, \qquad n = -\frac{22}{3}.
$$

---

**Step 4 — Choose the valid value**

The number of terms must be a positive integer, so we reject
$$
n = -\frac{22}{3}.
$$

Thus
$$
\boxed{n = 10}.
$$


  `,
};

export default problem_xxx;
