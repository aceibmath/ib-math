// src/data/questionbank/aa-hl/index.js
// Dataset-ul de probleme pentru AA HL Questionbank.
// Poți lăsa deocamdată gol și adaugi treptat item-urile.
// Structura unui item (exemplu):
// {
//   id: "AAHL-T1-S01-Q001",
//   subtopics: ["Sequences & Series"], // sau subtopic: "Sequences & Series"
//   statement_md: "Enunțul problemei... cu LaTeX dacă vrei.",
//   solution_md: "Rezolvarea (markscheme)...",
//   technology: "GDC",                // sau "No GDC"
//   difficulty: "Medium",             // "Easy" | "Medium" | "Hard"
//   hasVideo: false,
//   hasIA: false
// }
import sequences_and_series_hl from "./sequences-and-series";
const DATA = [
  ...sequences_and_series_hl,
  // ...exponents_and_logs_hl,
  // ...binomial_theorem_hl,
  // etc.
];
export default DATA;
