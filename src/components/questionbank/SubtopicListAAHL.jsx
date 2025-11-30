// src/components/questionbank/SubtopicListAAHL.jsx
"use client";

import ProblemRowAAHL from "@/components/questionbank/ProblemRowAAHL";

/**
 * Props:
 *  - subtopicLabel: string (ex. "Sequences & Series")
 *  - allItems: array of problems din datasetul AA HL
 *
 * Notă:
 *  - Spre deosebire de SubtopicList (AA SL), aici NU mai ținem un "active" global
 *    pentru că ProblemRowAAHL își gestionează singur starea (mode 0 / 1 / 2)
 *    și deja emite un CustomEvent pentru a închide celelalte carduri.
 */
export default function SubtopicListAAHL({ subtopicLabel, allItems = [] }) {
  return (
    <div>
      {allItems.map((p, ix) => (
        <ProblemRowAAHL
          key={p.id || ix}
          p={p}
          index={ix}
        />
      ))}
    </div>
  );
}
