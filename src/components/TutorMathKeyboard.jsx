// src/components/TutorMathKeyboard.jsx
"use client";

import { useEffect, useRef, useState } from "react";

export default function TutorMathKeyboard({
  open,
  onClose,
  onInsert,          // (latex) => void
  anchor = "inside", // stilizare; rămâne "inside"
  initialLatex = "",
}) {
  const [ready, setReady] = useState(false);
  const mfRef = useRef(null);
  const vkHostRef = useRef(null);

  // încarcă MathLive doar în client
  useEffect(() => {
    let mounted = true;
    if (!open) return;
    (async () => {
      try {
        if (typeof window === "undefined") return;
        const mod = await import("mathlive");
        // definește <math-field> custom element
        if (mounted) setReady(true);

        // așteaptă până se montează elementul în DOM
        setTimeout(() => {
          const mf = mfRef.current;
          if (!mf) return;
          // setări tastatură în container intern
          mf.setOptions?.({
            virtualKeyboardMode: "manual",
            virtualKeyboardContainer: vkHostRef.current,
            virtualKeyboardTheme: "material",
            sounds: "off",
          });
          if (initialLatex) mf.setValue?.(initialLatex);
        }, 0);
      } catch {
        setReady(true); // lăsăm măcar containerul
      }
    })();
    return () => { mounted = false; };
  }, [open, initialLatex]);

  if (!open) return null;

  return (
    <div className={`mk-wrap ${anchor === "inside" ? "mk-inside" : ""}`}>
      <div className="mk-header">
        <div>Math keyboard</div>
        <div className="mk-actions">
          <button
            className="mk-btn"
            onClick={() => {
              const mf = mfRef.current;
              if (!mf?.getValue) return;
              onInsert?.(mf.getValue("latex-expanded") || "");
            }}
          >
            Insert
          </button>
          <button className="mk-x" onClick={onClose} aria-label="Close">×</button>
        </div>
      </div>

      <div className="mk-body">
        {!ready ? (
          <div className="mk-loading">Loading math keyboard…</div>
        ) : (
          <>
            {/* câmpul WYSIWYG */}
            {/* eslint-disable-next-line react/no-unknown-property */}
            <math-field ref={mfRef} class="mk-field" aria-label="Math editor" />
            {/* container pentru tastatura virtuală (rămâne în interiorul ferestrei Tutor AI) */}
            <div ref={vkHostRef} className="mk-vk-host" />
          </>
        )}
      </div>

      <style jsx>{`
        .mk-wrap {
          position: absolute;
          left: 12px;
          right: 12px;
          bottom: 86px;
          background: #0f3d37;
          color: #fff;
          border-radius: 12px;
          overflow: hidden;
          z-index: 30;
          box-shadow: 0 10px 28px rgba(0,0,0,0.18);
        }
        .mk-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 12px;
          font-weight: 700;
        }
        .mk-actions { display: flex; gap: 8px; align-items: center; }
        .mk-btn {
          background: rgba(255,255,255,0.16);
          color: #fff;
          border: none;
          border-radius: 999px;
          padding: 6px 12px;
          font-weight: 600;
          cursor: pointer;
        }
        .mk-x {
          width: 34px; height: 34px;
          border-radius: 999px;
          border: none;
          background: rgba(255,255,255,0.16);
          color: #fff;
          font-size: 20px;
          cursor: pointer;
        }
        .mk-body { background: #ffffff; padding: 10px; }
        .mk-loading { color: #0f3d37; padding: 18px; }
        .mk-field {
          width: 100%;
          min-height: 140px;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 10px 12px;
        }
        .mk-vk-host {
          margin-top: 8px;
          border-top: 1px solid #eef2f2;
          padding-top: 6px;
        }
        @media (max-width: 520px) {
          .mk-wrap { left: 8px; right: 8px; bottom: 92px; }
        }
      `}</style>
    </div>
  );
}
