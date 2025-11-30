// src/components/problem/ProblemRowBase.jsx
"use client";

import { useEffect, useState } from "react";
import MdMath from "@/components/md/MdMath";
import styles from "./problemrow.module.css";
import { useAuth } from "@/context/AuthContext";

/**
 * ProblemRowBase = șablonul general de card pentru o întrebare IB.
 *
 * PROPS:
 * - index            (number)   -> indexul întrebării (0-based). Noi afișăm index+1 ca "Question X".
 * - statementMd      (string)   -> enunțul problemei (Markdown / LaTeX)
 * - solutionMd       (string)   -> markscheme-ul (Markdown / LaTeX)
 * - tech             (string)   -> "gdc", "no gdc", etc. => afiș pentru CALCULATOR / NO CALCULATOR
 * - difficulty       (string)   -> "Easy", "Medium", "Hard" etc. (optional)
 * - hasVideo         (bool)     -> dacă există video
 * - hasTutor         (bool)     -> dacă există Tutor IA
 * - hideCalcBadge    (bool)     -> dacă true, nu arătăm chip-ul CALCULATOR/NO CALCULATOR
 *
 * - themeClassHeader (string)   -> extra clase Tailwind pt. culoarea header-ului (bg/border/text).
 *                                  Ex: pentru AA SL putem lăsa "", pentru AA HL mov deschis etc.
 *
 * NOTE moduri de afișare:
 *  mode = 0 => doar problemă
 *  mode = 1 => split 50/50 problemă + markscheme
 *  mode = 2 => doar markscheme (full width)
 */

export default function ProblemRowBase({
  index = 0,
  statementMd = "",
  solutionMd = "",
  tech = "",
  difficulty = "",
  hasVideo = false,
  hasTutor = false,
  hideCalcBadge = false,
  themeClassHeader = "",
}) {
  const qNo = index + 1;

  // ===============================
  // PRENUMELE USERULUI (Tutor IA)
  // ===============================
  const { user } = useAuth();
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const fn = user?.displayName ? user.displayName.split(" ")[0] : "";
    setFirstName(fn || "");

    if (typeof window !== "undefined" && fn) {
      // salvăm prenumele și pe window / <body> / <meta> ca în Questionbank
      try {
        localStorage.setItem("ace:userName", fn);
      } catch {}
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

  // ===============================
  // MODE VIEW (Mark Scheme state)
  // ===============================
  // 0 = doar problemă; 1 = split 50/50; 2 = MS full
  const [mode, setMode] = useState(0);

  /**
   * Ascundem DOAR vizual scrollbarul global când suntem în split/full,
   * ca să nu avem două scrollbare (pagină + card). Identic cu Questionbank.
   */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const html = document.documentElement;
    const body = document.body;

    // injectăm o regulă <style> o singură dată
    let styleEl = document.getElementById("ace-hide-scroll-style");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "ace-hide-scroll-style";
      styleEl.textContent = `
        html.__aceHideScroll, body.__aceHideScroll {
          scrollbar-width: none;       /* Firefox */
          -ms-overflow-style: none;    /* IE/Edge legacy */
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

  /**
   * Când deschizi un Mark Scheme la altă problemă,
   * toate celelalte probleme trebuie să se închidă (mode=0).
   * Asta e exact comportamentul din Questionbank.
   */
  useEffect(() => {
    const handler = (e) => {
      if (e.detail?.source !== qNo) setMode(0);
    };
    window.addEventListener("ace:closeAllMarkschemes", handler);
    return () => window.removeEventListener("ace:closeAllMarkschemes", handler);
  }, [qNo]);

  // Helpers de schimbare view
  const openSplit = () => {
    // închidem celelalte probleme
    window.dispatchEvent(
      new CustomEvent("ace:closeAllMarkschemes", { detail: { source: qNo } })
    );

    setMode(1);

    // după ce React a pus mode=1 și DOM-ul se re-randează,
    // facem scroll la cardul curent ca în questionbank
    requestAnimationFrame(() => {
      document
        .getElementById(`q-${qNo}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const closeAll = () => setMode(0);
  const showFullMs = () => setMode(2);
  const backToSplit = () => setMode(1);

  // mapăm tehnologia permisă la textul chip-ului
  const mapTech = (val) => {
    const raw = (val || "").toString().trim().toLowerCase();
    if (raw === "gdc") return "CALCULATOR";
    if (raw === "no gdc" || raw === "nogdc" || raw === "no_gdc")
      return "NO CALCULATOR";
    return "NO CALCULATOR" === val
      ? "NO CALCULATOR"
      : "CALCULATOR / NO CALCULATOR";
  };

  // click pe Tutor IA chip
  const openTutor = () => {
    if (!hasTutor) return;

    const snippet = (solutionMd || "").replace(/\s+/g, " ").slice(0, 500);
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
          problemId: `Q-${qNo}`,
          problemTitle: `Question ${qNo}`,
          problemText: statementMd,
          markshemeSnippet: snippet,
          mode: currentMode,
          topicLabel: "Topic TBD",
          questionLabel: `Question ${qNo}`,
          problemNumber: qNo,
          topic: "Topic TBD",
          userName,
        },
      })
    );
  };

  return (
    <div id={`q-${qNo}`} className={styles.rowWrap}>
      <article
        className={`${styles.rowCard} ${
          mode !== 0 ? styles.rowCardActive : ""
        } ${mode !== 0 ? styles.cardActive : ""}`}
      >
        {/* ==============================
            HEADER
           ============================== */}
        <div
          className={`${styles.cardHeader} ${
            themeClassHeader ? themeClassHeader : ""
          }`}
        >
          {/* STÂNGA: "Question X" */}
          <div className={styles.headerLeft}>
            <span className={styles.qNumber}>Question {qNo}</span>
          </div>

          {/* CENTRU: Mark Scheme button / arrow controls */}
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

          {/* DREAPTA: chips CALCULATOR / difficulty / Video / Tutor IA */}
          <div className={styles.headerRight}>
            {!hideCalcBadge && (
              <span className={`${styles.metaChip} ${styles.metaOn}`}>
                {mapTech(tech)}
              </span>
            )}

            {!!difficulty && (
              <span className={`${styles.metaChip} ${styles.metaOn}`}>
                {difficulty}
              </span>
            )}

            {/* Video chip */}
            <span
              className={`${styles.metaChip} ${
                hasVideo ? styles.metaOn : styles.metaOff
              }`}
            >
              Video
            </span>

            {/* Tutor IA chip */}
            <span
              className={`${styles.metaChip} ${
                hasTutor ? styles.metaOn : styles.metaOff
              }`}
              onClick={hasTutor ? openTutor : undefined}
              style={{ cursor: hasTutor ? "pointer" : "default" }}
              title={hasTutor ? "Open Tutor IA" : "Not available"}
            >
              Tutor IA
            </span>
          </div>
        </div>

        {/* ==============================
            BODY
           ============================== */}
        <div className={styles.rowBodyContainer}>
          {mode === 0 && (
            <div className={styles.colOnly}>
              <div className={styles.rowStmt}>
                <MdMath>{statementMd}</MdMath>
              </div>
            </div>
          )}

          {mode === 1 && (
            <div className={`${styles.rowBodySplit} ${styles.splitScale}`}>
              <div className={styles.colSide}>
                <div className={styles.rowStmt}>
                  <MdMath>{statementMd}</MdMath>
                </div>
              </div>

              <div className={styles.verticalLine} />

              <div className={styles.colSide}>
                <div className={styles.markBody}>
                  <MdMath>{solutionMd}</MdMath>
                </div>
              </div>
            </div>
          )}

          {mode === 2 && (
            <div className={styles.colOnly}>
              <div className={styles.markBody}>
                <MdMath>{solutionMd}</MdMath>
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
