// src/data/prediction-exams/aa-sl/2025/nov-set1-p1.js
export default {
  meta: {
    kind: "prediction",
    course: "AA SL",
    year: 2025,
    session: "November",
    set: 1,
    paper: 1,
    calculator: "NO CALCULATOR",
    title: "Mathematics AA SL — 2025 November Prediction — Set 1 · Paper 1",
  },

  // ACEEAȘI FORMĂ ca la Past Papers
  problems: [
    {
      id: "AA-SL-2025-NOV-SET1-P1-Q01",
      code: "Q1",
      gdc: "NO GDC",
      hasIA: false,
      hasVideo: false,
      statement_md: `
Consider the quadratic function \\(f(x)=x^2-5x+6\\).

1. Find the roots of \\(f\\).
2. Write \\(f(x)\\) in vertex form.
3. State the minimum value of \\(f\\) and the value of \\(x\\) at which it occurs.
      `,
      solution_md: `
**(a)** \\(x^2-5x+6=0\\Rightarrow (x-2)(x-3)=0\\Rightarrow x=2,3\\).

**(b)** Complete the square:
\\[
x^2-5x+6
= (x^2-5x+\\tfrac{25}{4}) + 6 - \\tfrac{25}{4}
= (x-\\tfrac{5}{2})^2 - \\tfrac{1}{4}.
\\]
Thus vertex form is \\(f(x)=(x-\\tfrac{5}{2})^2-\\tfrac{1}{4}\\).

**(c)** Minimum value is \\(-\\tfrac{1}{4}\\), attained at \\(x=\\tfrac{5}{2}\\).
      `,
    },

    {
      id: "AA-SL-2025-NOV-SET1-P1-Q02",
      code: "Q2",
      gdc: "NO GDC",
      hasIA: false,
      hasVideo: false,
      statement_md: `
A fair die is rolled twice. Let \\(S\\) be the sum of the two results.

1. Find \\(\\Pr(S\\ge 10)\\).
2. Find the expected value \\(\\mathbb{E}[S]\\).
      `,
      solution_md: `
**(a)** Outcomes with \\(S\\ge 10\\): \\(\\{(4,6),(5,5),(5,6),(6,4),(6,5),(6,6)\\}\\) → 6 outcomes from 36, so
\\(\\Pr(S\\ge 10)=\\tfrac{6}{36}=\\tfrac{1}{6}\\).

**(b)** For two fair dice, \\(\\mathbb{E}[S]=\\mathbb{E}[X_1]+\\mathbb{E}[X_2]=2\\cdot 3.5=7\\).
      `,
    },
  ],
};
