// src/components/questionbank/QuestionbankSplitClient.jsx
"use client";

import { useEffect, useState } from "react";
import WorkedSolutionPanel from "@/components/questionbank/WorkedSolutionPanel";
import SubtopicList from "@/components/questionbank/SubtopicList";
import "@/app/css/app/(content)/AA_SL/questionbank/page.css";

export default function ClientSplitShell({ items = [], subtopicLabel }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    function onOpen(e) {
      const { problem } = e.detail || {};
      if (!problem) return;
      // scoatem highlight anterior
      document.querySelectorAll(".qbCardSelected").forEach(el => el.classList.remove("qbCardSelected"));

      // marcăm cardul selectat
      const card = document.querySelector(`[data-qid="${problem.id}"]`);
      if (card) {
        card.classList.add("qbCardSelected");
        card.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      setSelected(problem);
      setOpen(true);
    }

    window.addEventListener("qb:open-solution", onOpen);
    return () => window.removeEventListener("qb:open-solution", onOpen);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
    document.querySelectorAll(".qbCardSelected").forEach(el => el.classList.remove("qbCardSelected"));
  };

  const title =
    selected && items?.length
      ? `Question ${items.findIndex(x => x.id === selected.id) + 1}`
      : "Worked solution";

  return (
    <div className={`qbFlexContainer ${open ? "qbFlexOpen" : ""}`}>
      <div className="qbLeftList">
        <SubtopicList subtopicLabel={subtopicLabel} allItems={items} />
      </div>

      {open && (
        <div className="qbRightPanelFlex">
          <WorkedSolutionPanel
            open={open}
            onClose={handleClose}
            problem={selected}
            title={title}
          />
        </div>
      )}
    </div>
  );
}
