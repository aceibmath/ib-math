// src/components/membership/DurationSelector.jsx
"use client";

import { useMemo, useCallback } from "react";

const DEFAULT_OPTIONS = [1, 3, 6, 12];

export default function DurationSelector({
  value = 12,
  onChange = () => {},
  options = DEFAULT_OPTIONS,
  disabled = false,
}) {
  // Asigurăm doar opțiunile valide și ordonate
  const opts = useMemo(
    () => [...options].filter((n) => [1, 3, 6, 12].includes(n)).sort((a, b) => a - b),
    [options]
  );

  const labelFor = (m) => (m === 1 ? "1 month" : `${m} months`);

  const handleKey = useCallback(
    (e, idx) => {
      if (disabled) return;
      let nextIdx = idx;
      if (e.key === "ArrowRight") nextIdx = (idx + 1) % opts.length;
      if (e.key === "ArrowLeft") nextIdx = (idx - 1 + opts.length) % opts.length;
      if (e.key === "Home") nextIdx = 0;
      if (e.key === "End") nextIdx = opts.length - 1;
      if (nextIdx !== idx) {
        e.preventDefault();
        onChange(opts[nextIdx]);
      }
    },
    [opts, onChange, disabled]
  );

  return (
    <div className="duration-tabs" role="tablist" aria-label="Billing duration">
      {opts.map((m, idx) => {
        const active = value === m;
        return (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={active}
            className={`duration-tab ${active ? "active" : ""}`}
            onClick={() => onChange(m)}
            onKeyDown={(e) => handleKey(e, idx)}
            disabled={disabled}
            title={labelFor(m)}
          >
            {labelFor(m)}
          </button>
        );
      })}
    </div>
  );
}
