// src/components/questionbank/SubtopicListAIHL.jsx
"use client";

import { useState, useMemo } from "react";
import ProblemRowAIHL from "@/components/questionbank/ProblemRowAIHL";

export default function SubtopicListAIHL({ subtopicLabel, allItems = [] }) {
  // o singură întrebare activă la un moment dat
  const [active, setActive] = useState({ id: null, mode: "statement" });

  const items = useMemo(() => allItems || [], [allItems]);

  const handleChangeMode = (id, nextMode) => {
    if (!nextMode || nextMode === "statement") {
      // închidem tot
      setActive({ id: null, mode: "statement" });
      return;
    }
    setActive({ id, mode: nextMode });
  };

  return (
    <div>
      {items.map((p, ix) => {
        const mode = active.id === p.id ? active.mode : "statement";
        return (
          <ProblemRowAIHL
            key={p.id}
            p={p}
            index={ix}
            mode={mode}
            onChangeMode={(m) => handleChangeMode(p.id, m)}
          />
        );
      })}
    </div>
  );
}
