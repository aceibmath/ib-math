// src/data/questionbank/aa-sl/sequences-and-series/p005-aasl-t1-seq.js

const problem_xxx = {
  // ——— IDENTITATE & ÎNCADRARE ———
  id: "QB-AA-SL-SEQ-020",                 // ex: QB-AA-SL-SEQ-020 (UNIQ)
  code: "QB · AA SL · Number & Algebra · Sequences · 020", // titlu uman
  topic: "Number & Algebra",
  subtopic: "Sequences & Series",

  // meta opționale (pentru past papers / analytics)
  marks: "7",                             // lasă "x" și înlocuiești când e cazul
  year: "",                               // folosit la past papers / prediction
  sourcePage: "",                         // ex: "AA SL Questionbank · Sequences & Series · p.12"
  // sourceRef: "",                       // opțional: referință liberă (ex: "May 2021 TZ2 P1 Q3")

  // ——— CALCULATOR (alege o singură variantă și șterge restul) ———
  gdc: "NO GDC",                      // scrie "GDC" sau "NO GDC" (sau șterge dacă folosești alta)
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

The sum of the first \(n\) terms of a sequence \(\{u_n\}\) is given by  

$$
S_n = 4n^2 - n,
$$

where \(n \in \mathbb{Z}^+\).

<div class="q">
  <span class="q-text">(a) Write down the value of <span class="math-inline">u_1</span>.</span>
  <span class="marks">[1]</span>
</div>

<div class="q">
  <span class="q-text">(b) Find the value of <span class="math-inline">u_5</span>.</span>
  <span class="marks">[2]</span>
</div>

<div class="q">
  <span class="q-text">(c) Prove that <span class="math-inline">\{u_n\}</span> is an arithmetic sequence, stating clearly its common difference.</span>
  <span class="marks">[4]</span>
</div>

  `,

 solution_md: String.raw`

The sum of the first \(n\) terms of a sequence \(\{u_n\}\) is given by

$$
S_n = 4n^2 - n,
$$

where \(n \in \mathbb{Z}^+\).

<div class="q">
  <span class="q-text">(a) Write down the value of <span class="math-inline">u_1</span>.</span>
  <span class="marks">[1]</span>
</div>

<div class="q">
  <span class="q-text">(b) Find the value of <span class="math-inline">u_5</span>.</span>
  <span class="marks">[2]</span>
</div>

<div class="q">
  <span class="q-text">(c) Prove that <span class="math-inline">\{u_n\}</span> is an arithmetic sequence, stating clearly its common difference.</span>
  <span class="marks">[4]</span>
</div>

`,

solution_md: String.raw`

**Markscheme**

We are given the sum formula for the first \(n\) terms:

$$
S_n = 4n^2 - n \tag{1}
$$

where \(n \in \mathbb{Z}^+\).

---

**(a) Write down the value of \(u_1\).**

The first term \(u_1\) is equal to the sum of the first term only, so:

$$
u_1 = S_1
$$

Substituting \(n = 1\) into (1), we obtain:

$$
S_1 = 4(1)^2 - 1 = 4 - 1 = 3
$$

Therefore,

$$
\boxed{u_1 = 3}
$$

---

**(b) Find the value of \(u_5\).**

We first establish a general relationship between \(u_n\) and \(S_n\).

By definition, the sum \(S_n\) can be written as:

$$
S_n = u_1 + u_2 + \cdots + u_{n-1} + u_n
$$

This can be rewritten as:

$$
S_n = (u_1 + u_2 + \cdots + u_{n-1}) + u_n
$$

We recognize that the expression in the parentheses is simply \(S_{n-1}\), so:

$$
S_n = S_{n-1} + u_n
$$

Rearranging, we obtain:

$$
u_n = S_n - S_{n-1} \tag{2}
$$

This relationship holds for \(n \geq 2\).

For \(u_5\), substituting \(n=5\) into (2), we obtain:

$$
u_5 = S_5 - S_4
$$

First, we calculate \(S_5\) using (1):

$$
S_5 = 4(5)^2 - 5 = 4(25) - 5 = 100 - 5 = 95
$$

Next, we calculate \(S_4\) using (1):

$$
S_4 = 4(4)^2 - 4 = 4(16) - 4 = 64 - 4 = 60
$$

Therefore:

$$
u_5 = 95 - 60 = 35
$$

Thus,

$$
\boxed{u_5 = 35}
$$

---

**(c) Prove that \(\{u_n\}\) is an arithmetic sequence, stating clearly its common difference.**

To prove that \(\{u_n\}\) is arithmetic, we need to show that the difference between consecutive terms is constant.

For \(n \geq 2\), using (2):

$$
u_n = S_n - S_{n-1}
$$

Substituting the expression for \(S_n\) from (1):

$$
u_n = (4n^2 - n) - [4(n-1)^2 - (n-1)]
$$

Expanding \((n-1)^2\):

$$
(n-1)^2 = n^2 - 2n + 1
$$

So:

$$
\begin{aligned}
4(n-1)^2 - (n-1) &= 4(n^2 - 2n + 1) - n + 1 \\
&= 4n^2 - 8n + 4 - n + 1 \\
&= 4n^2 - 9n + 5
\end{aligned}
$$

Therefore:

$$
\begin{aligned}
u_n &= (4n^2 - n) - (4n^2 - 9n + 5) \\
&= 4n^2 - n - 4n^2 + 9n - 5 \\
&= 8n - 5
\end{aligned}
$$

This gives us a formula for the general term, valid for \(n \geq 2\):

$$
u_n = 8n - 5 \tag{3}
$$

This result is consistent with part (a), since for \(n = 1\):

$$
u_1 = 8(1) - 5 = 3 \quad \checkmark
$$

Now we find the common difference by calculating \(u_{n+1} - u_n\).

Using (3):

$$
u_{n+1} = 8(n+1) - 5 = 8n + 8 - 5 = 8n + 3
$$

Therefore:

$$
u_{n+1} - u_n = (8n + 3) - (8n - 5) = 8n + 3 - 8n + 5 = 8
$$

Since the difference between consecutive terms is constant and equal to 8, we conclude that \(\{u_n\}\) is an arithmetic sequence with common difference \(d = 8\).

Therefore,

$$
\boxed{\{u_n\} \text{ is arithmetic with } d = 8}
$$

`,
};

export default problem_xxx;
