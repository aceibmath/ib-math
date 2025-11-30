// src/data/flashcards/aa-sl/number-algebra/sequences-series-aa-sl.js

// Format recomandat pentru fiecare întrebare:
// {
//   id: "Q1",
//   prompt: "Enunțul întrebării...",
//   marks: 6,                       // opțional
//   choices: ["A", "B", "C", "D"],  // 4 variante
//   correctIndex: 2,                // 0..3
//   solution: `Explicatie/markscheme (HTML sau text simplu)` // opțional
// }

export const sequencesSeries = [
  {
    id: "Q1",
    prompt:
      "Un șir geometric are al doilea termen 12 și al cincilea 324. (a) Găsește rația r și primul termen u₁.",
    marks: 6,
    choices: ["r = 2, u₁ = 6", "r = 3, u₁ = 4", "r = 4, u₁ = 3", "r = 6, u₁ = 2"],
    correctIndex: 1,
    solution:
      "u₂ = u₁·r = 12, u₅ = u₁·r⁴ = 324 ⇒ r³ = 27 ⇒ r = 3 și u₁ = 4.",
  },
  {
    id: "Q2",
    prompt:
      "Pentru șirul geometric de la Q1, găsește cel mai mic n astfel încât Sₙ > 10 000.",
    marks: 5,
    choices: ["n = 6", "n = 7", "n = 8", "n = 9"],
    correctIndex: 2,
    solution:
      "Sₙ = u₁(rⁿ−1)/(r−1) = 4(3ⁿ−1)/2 > 10 000 ⇒ 3ⁿ > 5 001 ⇒ n ≈ 7.6 ⇒ n = 8.",
  },

  // === Q3 nouă: unică întrebare, soluție lungă (forțează scrollbar) ===
  {
    id: "Q3",
    marks: 8,
    prompt:
      "Fie șirul (uₙ) definit de u₁ = 2 și uₙ₊₁ = uₙ + 3·2ⁿ pentru n ≥ 1. Găsește o formulă închisă pentru uₙ și calculează u₂₀ (răspunsuri exacte).",
    choices: [
      "uₙ = 3·2ⁿ − 4;  u₂₀ = 3 145 724",
      "uₙ = 3·2ⁿ + 4;  u₂₀ = 3 145 732",
      "uₙ = 2ⁿ⁺¹ + 3n; u₂₀ = 1 048 636",
      "uₙ = 3·2ⁿ⁻¹ − 4; u₂₀ = 1 572 860",
    ],
    correctIndex: 0,
    solution: `
**Idee:** Recurența \(u_{n+1}-u_n = 3\cdot 2^n\) este o ecuație liniară neomogenă de ordinul 1. Putem **suma** recurența (metoda telescopării) sau o putem rezolva ca pe o recurență liniară cu termen particular de forma \(A\cdot 2^n\). Mai jos sunt ambele abordări, pentru claritate.

---

### Metoda 1 — Telescopare (suma diferențelor)
Pentru \(n\ge 1\),
\[
u_{n+1}-u_n = 3\cdot 2^n.
\]
Sumăm pentru \(k=1,2,\dots,n-1\):
\[
\sum_{k=1}^{n-1}(u_{k+1}-u_k)
= u_n - u_1
= 3\sum_{k=1}^{\,n-1}2^k.
\]
Dar
\[
\sum_{k=1}^{\,n-1}2^k
= \bigg(\sum_{k=0}^{\,n-1}2^k\bigg) - 1
= (2^n-1) - 1
= 2^n - 2.
\]
Prin urmare
\[
u_n - u_1 = 3(2^n-2)
\quad\Longrightarrow\quad
u_n = u_1 + 3(2^n-2)
= 2 + 3\cdot 2^n - 6
= 3\cdot 2^n - 4.
\]

Valoare numerică:
\[
u_{20} = 3\cdot 2^{20} - 4
= 3\cdot 1\,048\,576 - 4
= 3\,145\,728 - 4
= \boxed{3\,145\,724}.
\]

---

### Metoda 2 — Recurență liniară (soluție particulară)
Căutăm o soluție de forma \(u_n = A\cdot 2^n + B\).
Atunci
\[
u_{n+1} = A\cdot 2^{n+1} + B
\quad\text{și}\quad
u_{n+1}-u_n
= A\cdot 2^{n+1} + B - (A\cdot 2^n + B)
= A\cdot 2^n.
\]
Impunem \(u_{n+1}-u_n = 3\cdot 2^n\) ⇒ \(A=3\).
Aplicăm condiția inițială \(u_1=2\):
\[
u_1 = 3\cdot 2^1 + B = 6 + B = 2
\quad\Rightarrow\quad
B = -4.
\]
Deci din nou \(u_n = 3\cdot 2^n - 4\).

---

### Verificare rapidă
Pentru \(n=1\), \(u_1 = 3\cdot 2 - 4 = 2\) ✔️.  
Pentru trecerea \(n\to n+1\):
\[
u_{n+1} - u_n
= (3\cdot 2^{n+1} - 4) - (3\cdot 2^n - 4)
= 3\cdot 2^n,
\]
deci recurența este satisfăcută.

---

### Observație
Formula arată că \(u_n\) crește **exponențial** (termenul \(\,3\cdot 2^n\)), iar \(-4\) doar translatează graficul; pentru \(n\) mare, \(-4\) devine neglijabil.  
Rezultatul corect din variante este:
\[
\boxed{u_n = 3\cdot 2^n - 4 \text{ și } u_{20} = 3\,145\,724.}
\]
    `,
  },

  // restul rămân placeholder (le vei completa ulterior)
  { id: "Q4", prompt: "…", choices: ["A", "B", "C", "D"], correctIndex: 1 },
  { id: "Q5", prompt: "…", choices: ["A", "B", "C", "D"], correctIndex: 2 },
  { id: "Q6", prompt: "…", choices: ["A", "B", "C", "D"], correctIndex: 3 },
  { id: "Q7", prompt: "…", choices: ["A", "B", "C", "D"], correctIndex: 0 },
  { id: "Q8", prompt: "…", choices: ["A", "B", "C", "D"], correctIndex: 1 },
  { id: "Q9", prompt: "…", choices: ["A", "B", "C", "D"], correctIndex: 2 },
  { id: "Q10", prompt: "…", choices: ["A", "B", "C", "D"], correctIndex: 3 },
  { id: "Q11", prompt: "…", choices: ["A", "B", "C", "D"], correctIndex: 0 },
  { id: "Q12", prompt: "…", choices: ["A", "B", "C", "D"], correctIndex: 1 },
  { id: "Q13", prompt: "…", choices: ["A", "B", "C", "D"], correctIndex: 2 },
  { id: "Q14", prompt: "…", choices: ["A", "B", "C", "D"], correctIndex: 3 },
  { id: "Q15", prompt: "…", choices: ["A", "B", "C", "D"], correctIndex: 0 },
  { id: "Q16", prompt: "…", choices: ["A", "B", "C", "D"], correctIndex: 1 },
  { id: "Q17", prompt: "…", choices: ["A", "B", "C", "D"], correctIndex: 2 },
  { id: "Q18", prompt: "…", choices: ["A", "B", "C", "D"], correctIndex: 3 },
  { id: "Q19", prompt: "…", choices: ["A", "B", "C", "D"], correctIndex: 1 },
  { id: "Q20", prompt: "…", choices: ["A", "B", "C", "D"], correctIndex: 2 },
];

export default sequencesSeries;
