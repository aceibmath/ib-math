// src/components/questionbank/SubtopicList.jsx
"use client";

import { useState, useMemo } from "react";
import ProblemRow from "@/components/questionbank/ProblemRow";

/**
 * Props:
 *  - subtopicLabel: string
 *  - allItems: array of problems (din dataset)
 *  - (opțional) filtrele deja aplicate în afara acestei componente
 */
export default function SubtopicList({ subtopicLabel, allItems = [] }) {
  // starea globală: o singură problemă poate fi activă
  // active = { id: string, mode: "statement" | "split" | "mark" }
  const [active, setActive] = useState({ id: null, mode: "statement" });

  const items = useMemo(() => allItems || [], [allItems]);

  const handleChangeMode = (id, nextMode) => {
    if (!nextMode || nextMode === "statement") {
      // închidem tot (revenim la enunț pentru toate)
      setActive({ id: null, mode: "statement" });
      return;
    }
    // deschidem doar cardul acesta; dacă altul era deschis, se închide automat
    setActive({ id, mode: nextMode });
  };

  return (
    <div>
      {items.map((p, ix) => {
        const mode =
          active.id === p.id ? active.mode : "statement";

        return (
          <ProblemRow
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
