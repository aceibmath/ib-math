// src/components/TutorUploadArea.jsx
"use client";

import { useRef, useState } from "react";

export default function TutorUploadArea({
  open,
  onClose,
  onPick,
  title = "Drag & Drop or upload your answer here",
}) {
  const inputRef = useRef(null);
  const [drag, setDrag] = useState(false);

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDrag(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) onPick?.(file);
  };

  const onChoose = (e) => {
    const file = e.target?.files?.[0];
    if (file) onPick?.(file);
    if (inputRef.current) inputRef.current.value = "";
  };

  if (!open) return null;

  return (
    <div className="tu-overlay" onClick={onClose}>
      <div
        className={`tu-card ${drag ? "is-drag" : ""}`}
        onClick={(e) => e.stopPropagation()}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={onDrop}
        role="dialog"
        aria-modal="true"
      >
        <button className="tu-close" onClick={onClose} aria-label="Close">×</button>
        <div className="tu-illustration" aria-hidden />
        <div className="tu-title">{title}</div>

        <div className="tu-actions">
          <button
            className="tu-upload"
            onClick={() => inputRef.current?.click()}
            type="button"
          >
            Upload
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={onChoose}
          />
        </div>
      </div>

      <style jsx>{`
        .tu-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15, 61, 55, 0.06);
          display: grid;
          place-items: center;
          z-index: 40;
        }
        .tu-card {
          width: min(720px, calc(100% - 24px));
          background: #fff;
          border: 1px dashed #c7d2d6;
          border-radius: 16px;
          padding: 24px;
          position: relative;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }
        .tu-card.is-drag {
          border-color: #0f3d37;
          background: #f1faf8;
        }
        .tu-close {
          position: absolute;
          right: 12px;
          top: 10px;
          width: 36px;
          height: 36px;
          border-radius: 999px;
          border: none;
          background: #e5ecea;
          color: #0f3d37;
          font-size: 22px;
          cursor: pointer;
        }
        .tu-illustration {
          width: 96px;
          height: 96px;
          margin: 0 auto 10px;
          background: radial-gradient(#e6eff0 40%, transparent 41%),
                      radial-gradient(#e6eff0 40%, transparent 41%);
          background-size: 48px 48px, 48px 48px;
          background-position: 0 0, 24px 24px;
          border-radius: 999px;
        }
        .tu-title {
          font-size: 18px;
          color: #123c36;
          margin-bottom: 14px;
        }
        .tu-actions { display: flex; justify-content: center; }
        .tu-upload {
          background: #0f3d37;
          color: #fff;
          border: none;
          border-radius: 999px;
          padding: 10px 22px;
          font-weight: 600;
          cursor: pointer;
        }
        .tu-upload:hover { opacity: 0.92; }
      `}</style>
    </div>
  );
}
