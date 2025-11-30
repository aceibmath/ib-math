// src/components/questionbank/ProblemRowAAHL.jsx
"use client";

import { useEffect, useState } from "react";
import MdMath from "@/components/md/MdMath";
import styles from "@/app/(content)/AI_SL/questionbank/questionbank-aisl.module.css";
import { useAuth } from "../../context/AuthContext";

export default function ProblemRowAAHL({
  p: pProp,
  problem,
  item,
  index = 0,
  hideCalcBadge = false,
  ...rest
}) {
  const p = pProp ?? problem ?? item ?? {};
  const qNo = index + 1;

  const { user } = useAuth();
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const fn = user?.displayName ? user.displayName.split(" ")[0] : "";
    setFirstName(fn || "");
    if (typeof window !== "undefined" && fn) {
      try { localStorage.setItem("ace:userName", fn); } catch {}
      window.__USER_NAME = fn;
      document.body.dataset.userName = fn;

      const metaSel = document.querySelector('meta[name="user-name"]');
      if (metaSel) {
        metaSel.setAttribute("content", fn);
      } else {
        const m = document.createElement("meta");
        m.setAttribute("name", "user-name");
        m.setAttribute("content", fn);
        document.head.appendChild(m);
      }
    }
  }, [user]);

  // 0 = doar enunț; 1 = split 50/50; 2 = MS full
  const [mode, setMode] = useState(0);

  // ascunde scroll bar global când e split/full MS (exact ca în ProblemRow.jsx)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const html = document.documentElement;
    const body = document.body;

    let styleEl = document.getElementById("ace-hide-scroll-style");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "ace-hide-scroll-style";
      styleEl.textContent = `
        html.__aceHideScroll, body.__aceHideScroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        html.__aceHideScroll::-webkit-scrollbar,
        body.__aceHideScroll::-webkit-scrollbar {
          width: 0 !important;
          height: 0 !important;
        }
      `;
      document.head.appendChild(styleEl);
    }

    if (mode !== 0) {
      html.classList.add("__aceHideScroll");
      body.classList.add("__aceHideScroll");
    } else {
      html.classList.remove("__aceHideScroll");
      body.classList.remove("__aceHideScroll");
    }

    return () => {
      html.classList.remove("__aceHideScroll");
      body.classList.remove("__aceHideScroll");
    };
  }, [mode]);

  // când deschizi Mark Scheme la altă întrebare, se închide aici
  useEffect(() => {
    const handler = (e) => {
      if (e.detail?.source !== qNo) setMode(0);
    };
    window.addEventListener("ace:closeAllMarkschemes", handler);
    return () => window.removeEventListener("ace:closeAllMarkschemes", handler);
  }, [qNo]);

  const openSplit = () => {
    window.dispatchEvent(
      new CustomEvent("ace:closeAllMarkschemes", { detail: { source: qNo } })
    );
    setMode(1);
    requestAnimationFrame(() => {
      document
        .getElementById(`q-${qNo}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const closeAll = () => setMode(0);
  const showFullMs = () => setMode(2);
  const backToSplit = () => setMode(1);

  const mapTech = (val) => {
    const raw = (val || "").toString().trim().toLowerCase();
    if (raw === "gdc") return "CALCULATOR";
    if (raw === "no gdc" || raw === "nogdc" || raw === "no_gdc")
      return "NO CALCULATOR";
    return "CALCULATOR / NO CALCULATOR";
  };

  const stmt = p.statement_md ?? p.statement ?? "";
  const sol = p.solution_md ?? p.solution ?? "";

  const openTutor = () => {
    if (!p?.hasIA) return;
    const snippet = (sol || "").replace(/\s+/g, " ").slice(0, 500);
    const currentMode = mode === 0 ? "problem" : "ms";
    const userName =
      firstName ||
      (typeof window !== "undefined" &&
        (localStorage.getItem("ace:userName") ||
          window.__USER_NAME ||
          document
            .querySelector('meta[name="user-name"]')
            ?.getAttribute("content") ||
          document.body?.dataset?.userName)) ||
      "User";

    window.dispatchEvent(
      new CustomEvent("ace:tutor-open", {
        detail: {
          problemId: p.id || `Q-${qNo}`,
          problemTitle: p.code || `Question ${qNo}`,
          problemText: stmt,
          markshemeSnippet: snippet,
          mode: currentMode,
          topicLabel: "AI SL Questionbank",
          questionLabel: `Question ${qNo}`,
          problemNumber: qNo,
          topic: "AI SL",
          userName,
        },
      })
    );
  };

  return (
    <div id={`q-${qNo}`} className={styles.rowWrap}>
      <article
        className={`${styles.rowCard} ${
          mode ? styles.rowCardActive : ""
        } ${mode ? styles.cardActive : ""}`}
      >
        {/* -------- HEADER mov -------- */}
        <div className={styles.cardHeader}>
          <div className={styles.headerLeft}>
            <span className={styles.qNumber}>Question {qNo}</span>
          </div>

          <div className={styles.headerCenter}>
            {mode === 0 && (
              <button className={styles.markBtnCenter} onClick={openSplit}>
                Mark Scheme
              </button>
            )}

            {mode === 1 && (
              <div className={styles.centerControls}>
                <button
                  className={styles.arrowBtn}
                  onClick={showFullMs}
                  title="Mark Scheme – full width"
                >
                  ←
                </button>
                <button
                  className={styles.closeBtn}
                  onClick={closeAll}
                  title="Close Mark Scheme"
                  aria-label="Close Mark Scheme"
                >
                  ×
                </button>
                <button
                  className={styles.arrowBtn}
                  onClick={closeAll}
                  title={`Question ${qNo} – full width`}
                >
                  →
                </button>
              </div>
            )}

            {mode === 2 && (
              <div className={styles.centerControls}>
                <button
                  className={`${styles.arrowBtn} ${styles.arrowDisabled}`}
                  disabled
                  title="Mark Scheme – full width"
                >
                  ←
                </button>
                <button
                  className={styles.closeBtn}
                  onClick={closeAll}
                  title="Close Mark Scheme"
                  aria-label="Close Mark Scheme"
                >
                  ×
                </button>
                <button
                  className={styles.arrowBtn}
                  onClick={backToSplit}
                  title={`Question ${qNo} – Mark Scheme`}
                >
                  →
                </button>
              </div>
            )}
          </div>

          <div className={styles.headerRight}>
            {!hideCalcBadge && (
              <span className={`${styles.metaChip} ${styles.metaOn}`}>
                {mapTech(p.technology || p.gdc)}
              </span>
            )}

            {p.difficulty && (
              <span className={`${styles.metaChip} ${styles.metaOn}`}>
                {p.difficulty}
              </span>
            )}

            <span
              className={`${styles.metaChip} ${
                p.hasVideo ? styles.metaOn : styles.metaOff
              }`}
            >
              Video
            </span>

            <span
              className={`${styles.metaChip} ${
                p.hasIA ? styles.metaOn : styles.metaOff
              }`}
              onClick={p.hasIA ? openTutor : undefined}
              style={{ cursor: p.hasIA ? "pointer" : "default" }}
              title={p.hasIA ? "Open Tutor IA" : "Not available"}
            >
              Tutor IA
            </span>
          </div>
        </div>

        {/* -------- BODY -------- */}
        <div className={styles.rowBodyContainer}>
          {mode === 0 && (
            <div className={styles.colOnly}>
              <div className={styles.rowStmt}>
                <MdMath>{stmt}</MdMath>
              </div>
            </div>
          )}

          {mode === 1 && (
            <div className={`${styles.rowBodySplit} ${styles.splitScale}`}>
              <div className={styles.colSide}>
                <div className={styles.rowStmt}>
                  <MdMath>{stmt}</MdMath>
                </div>
              </div>

              <div className={styles.verticalLine} />

              <div className={styles.colSide}>
                <div className={styles.markBody}>
                  <MdMath>{sol}</MdMath>
                </div>
              </div>
            </div>
          )}

          {mode === 2 && (
            <div className={styles.colOnly}>
              <div className={styles.markBody}>
                <MdMath>{sol}</MdMath>
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
