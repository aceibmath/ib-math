// src/components/questionbank/SubtopicListAISL.jsx
"use client";

import { useState, useMemo } from "react";
import ProblemRowAISL from "@/components/questionbank/ProblemRowAISL";

export default function SubtopicListAISL({ subtopicLabel, allItems = [] }) {
  // o singură problemă activă (split / full ms)
  const [active, setActive] = useState({ id: null, mode: "statement" });

  const items = useMemo(() => allItems || [], [allItems]);

  const handleChangeMode = (id, nextMode) => {
    if (!nextMode || nextMode === "statement") {
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
          <ProblemRowAISL
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
