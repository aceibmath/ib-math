// src/components/questionbank/RightPaneOverlay.jsx
"use client";

export default function RightPaneOverlay({ open = false, onClick = () => {} }) {
  if (!open) return null;
  return (
    <div
      className="qbOverlay"
      onClick={onClick}
      aria-label="Overlay (click to close)"
      role="presentation"
    />
  );
}
