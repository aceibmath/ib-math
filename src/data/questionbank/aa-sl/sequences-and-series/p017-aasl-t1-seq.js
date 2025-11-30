// src/data/questionbank/aa-sl/sequences-and-series/p005-aasl-t1-seq.js
// Completează câmpurile și șterge variantele pe care nu le folosești.

const problem_xxx = {
  // ——— IDENTITATE & ÎNCADRARE ———
  id: "QB-AA-SL-SEQ-017",                 // ex: QB-AA-SL-SEQ-001 (UNIQ)
  code: "QB · AA SL · Number & Algebra · Sequences · 017", // titlu uman
  topic: "Number & Algebra",
  subtopic: "Sequences & Series",

  // meta opționale (pentru past papers / analytics)
  marks: "6",                             // lasă "x" și înlocuiești când e cazul
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

The first terms of an arithmetic sequence are  

$$
\frac{1}{\log_3 x},\quad 
\frac{1}{\log_9 x},\quad 
\frac{1}{\log_{27} x},\quad 
\frac{1}{\log_{81} x},\ \ldots
$$

Find \(x\) if the sum of the first 10 terms of the sequence is equal to 55.


  `,

 solution_md: String.raw`

**Markscheme**

We are given the arithmetic sequence  
$$
\frac{1}{\log_3 x}, \quad \frac{1}{\log_9 x}, \quad \frac{1}{\log_{27} x}, \quad \frac{1}{\log_{81} x}, \quad \ldots
$$

Recall that \(\frac{1}{\log_a b} = \log_b a\), so
$$
\begin{aligned}
u_1 &= \frac{1}{\log_3 x} = \log_x 3 \\
u_2 &= \frac{1}{\log_9 x} = \log_x 9 = \log_x 3^2 = 2\log_x 3 \\
u_3 &= \frac{1}{\log_{27} x} = \log_x 27 = \log_x 3^3 = 3\log_x 3 \\
u_4 &= \frac{1}{\log_{81} x} = \log_x 81 = \log_x 3^4 = 4\log_x 3
\end{aligned}
$$

We observe that the sequence can be written as
$$
\log_x 3,\quad 2\log_x 3,\quad 3\log_x 3,\quad 4\log_x 3,\quad \ldots
$$

Let \(a = \log_x 3\). Then the sequence becomes
$$
a,\quad 2a,\quad 3a,\quad 4a,\quad \ldots
$$

This is an arithmetic sequence with first term \(u_1 = a\) and common difference \(d = a\).

---

Using the general-term formula for an arithmetic sequence (IB Formula Booklet, SL 1.2)
$$
u_n = u_1 + (n-1)d
$$
with \(n = 10\), we obtain

$$
\begin{aligned}
u_{10} &= a + (10-1)a\\
&= a + 9a\\
&= 10a
\end{aligned}
$$

Therefore, the 10th term is  
$$
u_{10} = 10a
$$

---

Using the sum formula for an arithmetic sequence (IB Formula Booklet, SL 1.2),
$$
S_n = \frac{n}{2}(u_1 + u_n)
$$
with \(n = 10\), we get
$$
\begin{aligned}
S_{10} &= \frac{10}{2}(a + 10a) \\
&= 5(11a) \\
&= 55a
\end{aligned}
$$

We are told that \(S_{10} = 55\), so  
$$
55a = 55
$$

Dividing both sides by 55 gives  
$$
a = 1
$$

Since \(a = \log_x 3\), we have  
$$
\log_x 3 = 1
$$

Therefore,  
$$
\boxed{x = 3}
$$

  `,
};

export default problem_xxx;
