// src/components/questionbank/WorkedSolutionPanel.jsx
"use client";

import MdMath from "@/components/md/MdMath";

export default function WorkedSolutionPanel({
  open = false,
  onClose = () => {},
  problem = null,
  title = "Worked solution",
}) {
  if (!open) return null;

  const sol = problem?.solution_md ?? problem?.solution ?? "";

  return (
    <div className="qbPanelInner">
      <div className="qbRightHeader">
        <div className="qbRightTitle">
          <span className="qbRightBadge">Solution</span>
          <span className="qbRightText">{title}</span>
        </div>
        <button
          type="button"
          className="qbCloseBtn"
          onClick={onClose}
          aria-label="Close worked solution"
          title="Close"
        >
          ✕
        </button>
      </div>

      <div className="qbRightBody">
        {sol ? (
          <section className="qbSection">
            <div className="qbMd"><MdMath>{sol}</MdMath></div>
          </section>
        ) : (
          <p className="qbEmpty">No worked solution provided.</p>
        )}
      </div>
    </div>
  );
}
