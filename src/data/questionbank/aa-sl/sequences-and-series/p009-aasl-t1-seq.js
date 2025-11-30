// src/data/questionbank/aa-sl/sequences-and-series/p005-aasl-t1-seq.js
// Completează câmpurile și șterge variantele pe care nu le folosești.

const problem_xxx = {
  // ——— IDENTITATE & ÎNCADRARE ———
  id: "QB-AA-SL-SEQ-009",                 // ex: QB-AA-SL-SEQ--009 (UNIQ)
  code: "QB · AA SL · Number & Algebra · Sequences · 009", // titlu uman
  topic: "Number & Algebra",
  subtopic: "Sequences & Series",

  // meta opționale (pentru past papers / analytics)
  marks: "8",                             // lasă "x" și înlocuiești când e cazul
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

We are given that the sum of the first \(n\) terms of a sequence is
$$
S_n = 4n^2 + n. \tag{1}
$$

Using the relation between partial sums and terms, we have
$$
u_n = S_n - S_{n-1}. \tag{2}
$$
**Proof of (2):**
By definition of partial sums,
$$
\begin{aligned}
S_n &= u_1 + u_2 + \cdots + u_{n-1} + u_n\\
S_{n-1} &= u_1 + u_2 + \cdots + u_{n-1}
\end{aligned}
$$
Subtracting the second equation from the first, we obtain
$$
S_n - S_{n-1} = u_n
$$
which confirms formula \((2)\).

---

**(a) Find \(u_4\)**

Substituting \(n = 4\) into (1), we get
$$
S_4 = 4\cdot 4^2 + 4 = 68
$$

Substituting \(n = 3\) into (1), we get
$$
S_3 = 4\cdot 3^2 + 3 = 39
$$

Substituting \(S_3 = 39\) and \(S_4 = 68\) into (1), we get,

$$
\begin{aligned}
u_4 &= S_4 - S_3\\
&= 68 - 39 = 29\\
&= 29
\end{aligned}
$$








Therefore,
$$
\boxed{u_4 = 29}.
$$

---

**(b) Find an expression for \(u_n\), the \(n^{\text{th}}\) term of the sequence.**

Using formula \((2)\) together with \((1)\),
$$
\begin{aligned}
S_n &= 4n^2 + n,\\
S_{n-1} &= 4(n-1)^2 + (n-1) \\
       &= 4(n^2 - 2n + 1) + n - 1 \\
       &= 4n^2 - 8n + 4 + n - 1 \\
       &= 4n^2 - 7n + 3.
\end{aligned}
$$

Therefore
$$
\begin{aligned}
u_n &= S_n - S_{n-1} \\
    &= (4n^2 + n) - (4n^2 - 7n + 3) \\
    &= 8n - 3.
\end{aligned}
$$

Thus the general term is
$$
\boxed{u_n = 8n - 3}.
$$

---

**(c) Show that the sequence is arithmetic.**

From part (b), the \(n^{\text{th}}\) term is
$$
u_n = 8n - 3.
$$

Then
$$
\begin{aligned}
u_{n+1} - u_n
&= \bigl[8(n+1) - 3\bigr] - (8n - 3) \\
&= (8n + 8 - 3) - (8n - 3) \\
&= 8.
\end{aligned}
$$

The difference \(u_{n+1} - u_n\) is the constant \(8\), so the sequence has a constant common difference.

Therefore, the sequence is arithmetic.


  `,
};

export default problem_xxx;
