// src/data/flashcards/aa-hl/calculus/differentiation-aa-hl.js

export default [
  {
    id: "HL-D1",
    marks: 4,
    prompt:
      "Pentru \\(x>0\\), fie \\(f(x)=x^{x}\\). Determină derivata \\(f'(x)\\).",
    choices: [
      "\\(x^{x}\\,\\ln x\\)",
      "\\(x^{x}(\\ln x+1)\\)",
      "\\(x^{x-1}(1+\\ln x)\\)",
      "\\(x^{x}(\\tfrac{1}{x}+1)\\)",
    ],
    correctIndex: 1,
    solution: `
Log-diferențiere: \\(\\ln f(x)=x\\ln x\\).
Derivăm: \\(\\dfrac{f'(x)}{f(x)}=\\ln x+1\\).
Deci \\(f'(x)=f(x)(\\ln x+1)=\\boxed{x^{x}(\\ln x+1)}\\).`,
  },

  {
    id: "HL-D2",
    marks: 5,
    prompt:
      "Fie \\(y=e^{x}(x^2-4)\\). Determină abscisele punctelor staționare.",
    choices: [
      "\\(x=\\pm 2\\)",
      "\\(x=-1\\pm\\sqrt{5}\\)",
      "\\(x=0,\\;x=2\\)",
      "\\(x=-2,\\;x=1\\)",
    ],
    correctIndex: 1,
    solution: `
\\[
y'=e^{x}(x^2-4)+e^{x}\\cdot 2x = e^{x}(x^2+2x-4).
\\]
Puncte staționare: \\(y'=0\\) \\(\\Rightarrow\\) \\(x^2+2x-4=0\\).
\\[
x=\\frac{-2\\pm\\sqrt{4+16}}{2} = -1\\pm\\sqrt{5}.
\\]
Deci \\(\\boxed{x=-1\\pm\\sqrt{5}}\\).`,
  },
];
