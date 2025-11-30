// src/data/flashcards/aa-hl/number-algebra/sequences-series-aa-hl.js

export default [
  {
    id: "HL-S1",
    marks: 5,
    prompt:
      "Consideră șirul geometric cu primul termen \\(u_1=3\\) și rația \\(r=\\sqrt{3}\\). Care este cel mai mic \\(n\\) astfel încât \\(u_n>1000\\)?",
    choices: ["n = 10", "n = 11", "n = 12", "n = 13"],
    correctIndex: 2,
    solution: `
Folosim \\(u_n=u_1 r^{n-1}=3(\\sqrt{3})^{\\,n-1}\\).
\\[
3(\\sqrt{3})^{\\,n-1}>1000
\\;\\Longleftrightarrow\\;
(\\sqrt{3})^{\\,n-1} > \\tfrac{1000}{3} \\approx 333.33.
\\]
Luăm logaritm natural: \\((n-1)\\ln(\\sqrt{3}) > \\ln(333.33)\\).
Cum \\(\\ln(\\sqrt{3}) = \\tfrac{1}{2}\\ln 3 \\approx 0.5493\\) și \\(\\ln(333.33) \\approx 5.810\\),
\\[
n-1 > \\frac{5.810}{0.5493} \\approx 10.58 \\;\\Rightarrow\\; n=\\boxed{12}.
\\]`,
  },

  {
    id: "HL-S2",
    marks: 4,
    prompt:
      "Găsește suma la infinit a progresiei geometrice cu \\(a=7\\) și \\(r=-\\tfrac{1}{3}\\) (dacă există).",
    choices: ["\\(\\dfrac{7}{4}\\)", "\\(\\dfrac{21}{4}\\)", "\\(\\dfrac{7}{2}\\)", "\\(\\dfrac{7}{3}\\)"],
    correctIndex: 1,
    solution: `
Pentru \\(|r|<1\\), \\(S_\\infty = \\dfrac{a}{1-r}\\).
Aici \\(a=7\\), \\(r=-\\tfrac{1}{3}\\) \\(\\Rightarrow\\)
\\[
S_\\infty = \\frac{7}{1-(-1/3)} = \\frac{7}{1+1/3} = \\frac{7}{4/3} = \\boxed{\\tfrac{21}{4}}.
\\]`,
  },
];
