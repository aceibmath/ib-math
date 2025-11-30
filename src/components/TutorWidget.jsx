// src/components/TutorWidget.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import TutorUploadArea from "./TutorUploadArea";
import TutorMathKeyboard from "./TutorMathKeyboard";
import MdMath from "@/components/md/MdMath";

export default function TutorWidget({ context, showFab = false }) {
  // panel
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // chat
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  // fără mesajul inițial – folosim intro-ul custom
  const [messages, setMessages] = useState([]);

  // input
  const [text, setText] = useState("");
  const [showMathPanel, setShowMathPanel] = useState(false);

  // upload
  const [showUpload, setShowUpload] = useState(false);
  const [pendingImage, setPendingImage] = useState(null); // { data, mime }

  // context
  const [ctx, setCtx] = useState(context || null);
  useEffect(() => setCtx(context || null), [context]);

  // deschidere globală
  useEffect(() => {
    const onOpen = (e) => {
      const d = e.detail || {};
      setCtx(d);
      setOpen(true);
      setExpanded(false);
      setErr("");
      setMessages([]); // reset conversația la deschidere
      setTimeout(() => initPositionAndSize(), 0);
    };
    if (typeof window !== "undefined") {
      window.addEventListener("ace:tutor-open", onOpen);
      return () => window.removeEventListener("ace:tutor-open", onOpen);
    }
  }, []);

  // KaTeX auto-render
  const panelRef = useRef(null);
  const previewRef = useRef(null);

  const ensureKatex = () =>
    new Promise((resolve) => {
      if (typeof window === "undefined") return resolve();
      if (!document.getElementById("katex-css")) {
        const link = document.createElement("link");
        link.id = "katex-css";
        link.rel = "stylesheet";
        link.href =
          "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css";
        document.head.appendChild(link);
      }
      const ready = () => window.renderMathInElement && resolve();
      const needJs = !document.getElementById("katex-js");
      const needAuto = !document.getElementById("katex-auto-js");
      if (needJs) {
        const s = document.createElement("script");
        s.id = "katex-js";
        s.src = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js";
        s.async = true;
        s.onload = ready;
        document.head.appendChild(s);
      }
      if (needAuto) {
        const s = document.createElement("script");
        s.id = "katex-auto-js";
        s.src =
          "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js";
        s.async = true;
        s.onload = ready;
        document.head.appendChild(s);
      }
      setTimeout(ready, 0);
    });

  const katexDelims = [
    { left: "$$", right: "$$", display: true },
    { left: "\\[", right: "\\]", display: true },
    { left: "$", right: "$", display: false },
    { left: "\\(", right: "\\)", display: false },
  ];

  const typeset = async () => {
    if (typeof window === "undefined") return;
    await ensureKatex();
    try {
      if (panelRef.current && window.renderMathInElement) {
        window.renderMathInElement(panelRef.current, {
          delimiters: katexDelims,
          throwOnError: false,
        });
      }
    } catch {}
  };
  useEffect(() => {
    typeset();
  }, [messages, open, expanded]);

  // previzualizare live pentru textarea
  const hasLatex = (s = "") => /\$[^$]+\$|\\\(|\\\)|\\\[|\\\]/.test(s || "");

  useEffect(() => {
    (async () => {
      if (!previewRef.current) return;
      if (!hasLatex(text)) {
        previewRef.current.innerHTML = "";
        previewRef.current.style.display = "none";
        return;
      }
      await ensureKatex();
      previewRef.current.textContent = text;
      previewRef.current.style.display = "block";
      try {
        window.renderMathInElement(previewRef.current, {
          delimiters: katexDelims,
          throwOnError: false,
        });
      } catch {}
    })();
  }, [text]);

  // auto-scroll la ultimul mesaj
  const listRef = useRef(null);
  const endRef = useRef(null);
  const scrollToBottom = (smooth = true) => {
    try {
      endRef.current?.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
        block: "end",
      });
    } catch {}
  };
  useEffect(() => {
    if (open) scrollToBottom(true);
  }, [messages, open, busy]);

  // ─────────────────────────────────────────────
  //  Normalizare LaTeX pentru răspunsul Tutor IA
  // ─────────────────────────────────────────────
  const normalizeTutorLatex = (s = "") => {
    return (
      s
        // 1) \( ... \)  ->  $...$
        .replace(/\\\(([\s\S]*?)\\\)/g, (_, inner) => `$${inner.trim()}$`)

        // 2) \[ ... \]  ->  $$...$$ pe rând separat
        .replace(/\\\[([\s\S]*?)\\\]/g, (_, inner) => `\n$$${inner.trim()}$$\n`)

        // 3) ( u_n ), ( a_2 ) etc.  ->  $u_n$, $a_2$
        .replace(/\(\s*([a-zA-Z])_([0-9n]+)\s*\)/g, (_, v, sub) => {
          return `$${v}_${sub}$`;
        })

        // 4) ( d ), ( n ), ( k ) etc.  ->  $d$, $n$, $k$
        .replace(/\(\s*([a-zA-Z])\s*\)/g, (_, v) => `$${v}$`)
    );
  };

  // SEND (acceptă override pentru preset)
  const send = async (contentOverride) => {
    const content = (
      (contentOverride !== undefined ? contentOverride : text) || ""
    ).trim();
    if (!content && !pendingImage) return;

    const newMessages = [...messages, { role: "user", content }];
    setMessages(newMessages);
    setText("");
    setBusy(true);
    setErr("");
    setTimeout(() => scrollToBottom(false), 0);

    const images = pendingImage ? [pendingImage] : [];
    setPendingImage(null);

    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          context: { ...ctx, images },
          messages: newMessages,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed");

      const rawMessage = data.message || "";
      const normalizedMessage = normalizeTutorLatex(rawMessage);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: normalizedMessage },
      ]);
      setTimeout(() => scrollToBottom(true), 30);
    } catch (e) {
      setErr(e.message || "Network error");
    } finally {
      setBusy(false);
    }
  };

  // textarea Enter
  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  /**
   * ── Poziționare și dimensiuni ──
   * La deschidere, panoul pornește la 5px de susul paginii (nu sub header)
   * și are înălțimea: window.innerHeight - 5px (BOTTOM_GAP).
   */
  const MIN_MARGIN = 5;
  const BOTTOM_GAP = 5; // 5px spațiu până jos
  const PANEL_W = 500;
  const RIGHT_MARGIN = 25;

  const [pos, setPos] = useState({ left: 0, top: 0 });
  const [size, setSize] = useState({ width: PANEL_W, height: 560 });

  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
  const heightForTop = (top) =>
    Math.max(
      360,
      (typeof window !== "undefined" ? window.innerHeight : 900) -
        top -
        BOTTOM_GAP
    );

  // init pe 5px de sus și înălțime până la jos - 5px
  const initPositionAndSize = () => {
    if (typeof window === "undefined") return;
    const top = 5; // nu depinde de header
    const left = clamp(
      window.innerWidth - PANEL_W - RIGHT_MARGIN,
      MIN_MARGIN,
      window.innerWidth - PANEL_W - MIN_MARGIN
    );
    setPos({ left, top });
    setSize({ width: PANEL_W, height: heightForTop(top) });
  };

  useEffect(() => {
    initPositionAndSize();
    if (typeof window !== "undefined") {
      const onResize = () => initPositionAndSize();
      window.addEventListener("resize", onResize);
      window.addEventListener("orientationchange", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
        window.removeEventListener("orientationchange", onResize);
      };
    }
  }, []);

  // recalculează și la scroll când panoul e deschis (păstrează top=5)
  useEffect(() => {
    if (!open) return;
    const onScroll = () => initPositionAndSize();
    window.addEventListener("scroll", onScroll, { passive: true });
    initPositionAndSize();
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // drag
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, left: 0, top: 0 });
  const onDragStart = (e) => {
    if (expanded) return;
    dragging.current = true;
    const p = "touches" in e ? e.touches[0] : e;
    dragStart.current = {
      x: p.clientX,
      y: p.clientY,
      left: pos.left,
      top: pos.top,
    };
    document.addEventListener("mousemove", onDragMove);
    document.addEventListener("mouseup", onDragEnd);
    document.addEventListener("touchmove", onDragMove, { passive: false });
    document.addEventListener("touchend", onDragEnd);
  };
  const onDragMove = (e) => {
    if (!dragging.current) return;
    const p = "touches" in e ? e.touches[0] : e;
    if ("touches" in e) e.preventDefault();
    const dx = p.clientX - dragStart.current.x;
    const dy = p.clientY - dragStart.current.y;
    const maxW =
      typeof window !== "undefined" ? window.innerWidth : size.width + 10;
    const maxH =
      typeof window !== "undefined" ? window.innerHeight : size.height + 10;
    const newLeft = clamp(
      dragStart.current.left + dx,
      MIN_MARGIN,
      maxW - size.width - MIN_MARGIN
    );
    const newTop = clamp(
      dragStart.current.top + dy,
      MIN_MARGIN,
      maxH - size.height - MIN_MARGIN
    );
    setPos({ left: newLeft, top: newTop });
    setSize((s) => ({ ...s, height: heightForTop(newTop) }));
  };
  const onDragEnd = () => {
    dragging.current = false;
    document.removeEventListener("mousemove", onDragMove);
    document.removeEventListener("mouseup", onDragEnd);
    document.removeEventListener("touchmove", onDragMove);
    document.removeEventListener("touchend", onDragEnd);
  };

  const INK = "var(--ink, #0f3d37)";

  // inserează latex în textarea
  const insertLatexIntoText = (latex) => {
    if (!latex) return;
    setText((t) => (t ? t + " $" + latex + "$ " : "$" + latex + "$ "));
    setShowMathPanel(false);
  };

  // transformă imaginea în base64 pentru API
  const handlePickedFile = async (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = String(reader.result || "");
      const [prefix, data] = base64.split(",");
      const mime =
        (prefix.match(/data:(.+);base64/) || [])[1] ||
        file.type ||
        "image/png";
      setPendingImage({ data, mime });
      setShowUpload(false);
    };
    reader.readAsDataURL(file);
  };

  // helper pentru afisarea doar a numărului întrebării
  const questionNumberText = (() => {
    if (ctx?.problemNumber != null) return String(ctx.problemNumber);
    const id = ctx?.problemId;
    if (id == null) return "1";
    const m = String(id).match(/\d+/);
    return m ? m[0] : "1";
  })();

  // numele utilizatorului (fallback „User” + mai multe surse)
  const userDisplayName =
    ctx?.userName ||
    (typeof window !== "undefined" &&
      (localStorage.getItem("ace:userName") ||
        window.__USER_NAME ||
        document
          .querySelector('meta[name="user-name"]')
          ?.getAttribute("content") ||
        document.body?.dataset?.userName)) ||
    "User";

  return (
    <>
      {showFab && !open && (
        <button
          className="tutor-bubble"
          onClick={() => {
            setOpen(true);
            setTimeout(() => initPositionAndSize(), 0);
          }}
        >
          ∑ Tutor
        </button>
      )}

      {open && (
        <div
          className={`tutor-panel ${expanded ? "is-expanded" : ""}`}
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          style={
            expanded
              ? undefined
              : {
                  left: `${pos.left}px`,
                  top: `${pos.top}px`,
                  width: `${size.width}px`,
                  height: `${size.height}px`,
                }
          }
        >
          <div
            className="tutor-header"
            onMouseDown={onDragStart}
            onTouchStart={onDragStart}
          >
            <div className="tutor-title">
              <strong className="title-strong">Tutor AI</strong>
              <span className="tutor-sub">
                <span className="dot" /> Connected ·{" "}
                {ctx?.topic || "Sequences & Series"} · Question{" "}
                {questionNumberText}
              </span>
            </div>
            <div className="tutor-actions">
              <button
                className="tutor-icon"
                onClick={() => setExpanded((v) => !v)}
                aria-label={expanded ? "Shrink" : "Expand"}
              >
                {expanded ? "▣" : "▢"}
              </button>
              <button
                className="tutor-icon"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="tutor-body">
            {/* INTRO custom – doar când nu există mesaje */}
            {messages.length === 0 && (
              <>
                <div className="speaker speaker-left">Tutor IA</div>

                {ctx?.mode === "ms" ? (
                  <>
                    <div className="bubble intro-bubble">
                      Let’s unpack the <strong>Mark Scheme</strong> for{" "}
                      <strong>Question {questionNumberText}</strong>.
                    </div>

                    <div className="qs-label">Quick Starters</div>
                    <div className="qs-row">
                      <button
                        className="preset"
                        onClick={() => send("Break it down step by step.")}
                      >
                        Break it down step by step.
                      </button>
                      <button
                        className="preset"
                        onClick={() =>
                          send("Quick overview of the method and marks.")
                        }
                      >
                        Quick overview of the method and marks.
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bubble intro-bubble">
                      Hi! I’m your IB Math tutor. Please, tell me where you’re
                      stuck and I’ll guide you step by step through{" "}
                      <strong>Question {questionNumberText}.</strong>
                    </div>

                    <div className="qs-label">Quick Starters</div>
                    <div className="qs-row">
                      <button
                        className="preset"
                        onClick={() => send("What’s a good first step?")}
                      >
                        What’s a good first step?
                      </button>
                      <button
                        className="preset"
                        onClick={() =>
                          send("Give me a hint to get started.")
                        }
                      >
                        Give me a hint to get started.
                      </button>
                    </div>
                  </>
                )}
              </>
            )}

            {/* mesaje */}
            <div className="tutor-messages" ref={listRef}>
              {messages.map((m, i) => {
                const isUser = m.role === "user";
                return (
                  <div key={i} className={`msg ${isUser ? "me" : "bot"}`}>
                    <div
                      className={`speaker ${
                        isUser ? "speaker-right" : "speaker-left"
                      }`}
                    >
                      {isUser ? userDisplayName : "Tutor IA"}
                    </div>
                    <div className="bubble">
                      <MdMath tight>{m.content}</MdMath>
                    </div>
                  </div>
                );
              })}

              <div ref={endRef} />
              {err ? <div className="error">⚠ {err}</div> : null}
            </div>

            {/* Drag & Drop */}
            <TutorUploadArea
              open={showUpload}
              onClose={() => setShowUpload(false)}
              onPick={handlePickedFile}
            />

            {/* Math keyboard – mic panel înăuntru */}
            <TutorMathKeyboard
              open={showMathPanel}
              onClose={() => setShowMathPanel(false)}
              onInsert={insertLatexIntoText}
              initialLatex=""
            />
          </div>

          {/* composer */}
          <div className="composer">
            <textarea
              className="composer-area"
              placeholder="Write a message…"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={onKey}
              disabled={busy}
            />

            {/* previzualizare live KaTeX */}
            <div
              ref={previewRef}
              className="composer-preview"
              style={{ display: "none" }}
              aria-live="polite"
            />

            <div className="composer-row">
              <button
                className="chip"
                type="button"
                onClick={() => setShowUpload(true)}
              >
                Upload image
              </button>

              <button
                className="chip"
                type="button"
                onClick={() => setShowMathPanel((v) => !v)}
              >
                Type Math
              </button>

              <button
                className="btn-send"
                onClick={() => send()}
                disabled={busy || (!text && !pendingImage)}
              >
                {busy ? "…" : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .tutor-bubble {
          position: fixed;
          right: 18px;
          bottom: 18px;
          z-index: 9999;
          border: 2px solid var(--ink, #0f3d37);
          background: #fff;
          color: var(--ink, #0f3d37);
          border-radius: 9999px;
          padding: 10px 16px;
          font-weight: 700;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
        }
        .tutor-bubble:hover {
          background: var(--ink, #0f3d37);
          color: #fff;
        }

        .tutor-panel {
          position: fixed;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.18);
          display: flex;
          flex-direction: column;
          z-index: 100000;
          overflow: hidden;
          user-select: none;
        }
        .tutor-panel.is-expanded {
          inset: 5px;
          border-radius: 18px;
        }

        .tutor-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          border-bottom: 1px solid #e8eeed;
          background: #0f3d37;
          color: #fff;
          cursor: move;
        }
        .title-strong {
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .tutor-title {
          display: flex;
          flex-direction: column;
        }
        .tutor-sub {
          font-size: 13px;
          font-weight: 600;
          color: #d1fae5;
        }
        .dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          background: #ef4444;
          border-radius: 999px;
          margin-right: 6px;
        }
        .tutor-actions .tutor-icon {
          border: none;
          background: transparent;
          font-size: 18px;
          padding: 6px;
          margin-left: 4px;
          cursor: pointer;
          color: #fff;
        }

        .tutor-body {
          padding: 10px 12px;
          overflow: auto;
          flex: 1;
          background: #fff;
          position: relative;
        }

        /* Intro + quick starters */
        .intro-bubble {
          background: #f3f4f6;
          border-color: #cbd5d1;
          color: var(--ink, #0f3d37);
          margin-bottom: 10px;
          max-width: 100%;
          width: 100%;
        }
        .qs-label {
          color: #e11d48; /* roșu */
          font-weight: 400; /* ne-bold */
          margin: 12px 6px 6px;
        }
        .qs-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 8px;
        }

        .preset {
          border: 1px solid #cbd5d1;
          background: #eef2f7;
          color: var(--ink, #0f3d37);
          border-radius: 999px;
          padding: 10px 14px;
          font-weight: 400; /* nebold */
        }
        .preset:hover {
          background: #e6eef6;
        }

        .tutor-messages {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .msg {
          display: flex;
          flex-direction: column;
          max-width: 100%;
        }
        .msg.me {
          align-items: flex-end;
        }
        .msg.bot {
          align-items: flex-start;
        }

        /* etichete – roșu, non-bold */
        .speaker {
          font-size: 14px;
          font-weight: 400;
          color: #e11d48;
          margin: 2px 6px 4px;
          opacity: 0.95;
        }
        .speaker-left {
          align-self: flex-start;
        }
        .speaker-right {
          align-self: flex-end;
        }

        .bubble {
          max-width: 92%;
          padding: 10px 12px;
          border-radius: 14px;
          border: 1px solid #e5e7eb;
          background: #fff;
          line-height: 1.45;
          white-space: pre-wrap;
          color: var(--ink, #0f3d37);
        }
        /* Bula utilizatorului: gri deschis + text închis */
        .msg.me .bubble {
          background: #f3f4f6;
          border-color: #cbd5d1;
          color: var(--ink, #0f3d37);
        }

        .bubble :global(.katex-display) {
          margin: 0.35rem 0;
        }
        .bubble :global(.katex) {
          font-size: 1.02em;
        }

        .error {
          color: #b91c1c;
          font-size: 13px;
        }

        /* composer */
        .composer {
          border-top: 1px solid #eef2f2;
          background: #fafafa;
          padding: 10px 8px;
        }
        .composer-area {
          width: 100%;
          min-height: 64px;
          max-height: 180px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 10px 12px;
          background: #fff;
          resize: vertical;
        }
        .composer-preview {
          margin-top: 8px;
          padding: 10px 12px;
          border: 1px dashed #d1d5db;
          border-radius: 10px;
          background: #fff;
          color: var(--ink, #0f3d37);
        }
        .composer-row {
          display: flex;
          gap: 8px;
          align-items: center;
          margin-top: 8px;
        }
        .chip {
          border: 1px solid #cbd5d1;
          background: #fff;
          color: #0f3d37;
          border-radius: 999px;
          padding: 8px 14px;
          font-weight: 500;
        }
        .chip:hover {
          background: #eef7f5;
        }
        .btn-send {
          margin-left: auto;
          border: none;
          background: #0f3d37;
          color: #fff;
          padding: 10px 18px;
          border-radius: 999px;
          font-weight: 600;
        }
        .btn-send:disabled {
          opacity: 0.6;
        }

        @media (max-width: 520px) {
          .tutor-panel {
            width: calc(100vw - 10px) !important;
            left: 5px !important;
          }
        }
      `}</style>
    </>
  );
}
