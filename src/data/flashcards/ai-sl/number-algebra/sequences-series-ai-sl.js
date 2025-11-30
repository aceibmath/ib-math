export const sequencesSeriesAISL = [
  {
    id: "Q1",
    prompt: "Arithmetic: u₁=4, d=3. What is u₅?",
    choices: ["13", "16", "19", "25"],
    correctIndex: 1,
    solution: "u = u + 4d = 4 + 12 = 16.",
  },
  {
    id: "Q2",
    prompt: "Geometric: u=2, r=1/2. What is S?",
    choices: ["1.875", "2", "3.75", "4"],
    correctIndex: 2,
    solution: "S = 2 + 1 + 0.5 + 0.25 = 3.75.",
  },
];
export default sequencesSeriesAISL;
