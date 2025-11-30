// src/components/questionbank/ProblemRow.jsx
"use client";

import { useEffect, useState } from "react";
import MdMath from "@/components/md/MdMath";
import styles from "@/app/(content)/AA_SL/questionbank/questionbank.module.css";
import { useAuth } from "../../context/AuthContext";

// iconițe custom
import IconCalculator from "@/components/icons/IconCalculator";
import IconCalculatorOff from "@/components/icons/IconCalculatorOff";
import IconDocument from "@/components/icons/IconDocument";
import IconTutor from "@/components/icons/IconTutor";
import IconStar from "@/components/icons/IconStar";
import IconEye from "@/components/icons/IconEye";

export default function ProblemRow({
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
      try {
        localStorage.setItem("ace:userName", fn);
      } catch {}
      window.__USER_NAME = fn;
      document.body.dataset.userName = fn;
      const metaSel = document.querySelector('meta[name="user-name"]');
      if (metaSel) metaSel.setAttribute("content", fn);
      else {
        const m = document.createElement("meta");
        m.setAttribute("name", "user-name");
        m.setAttribute("content", fn);
        document.head.appendChild(m);
      }
    }
  }, [user]);

  // 0 = doar enunț; 1 = split 50/50; 2 = MS full
  const [mode, setMode] = useState(0);

  // modal pentru preview DOAR enunț (ochi)
  const [showStatementModal, setShowStatementModal] = useState(false);

  // ───────── modal pentru Formula Booklet (PDF) ─────────
  const [showFbModal, setShowFbModal] = useState(false);
  const [fbPage, setFbPage] = useState(1);

  // alegem PDF-ul: AA sau AI (dacă în viitor problema e de tip AI)
  const fbFile =
    (p.course &&
      typeof p.course === "string" &&
      p.course.toLowerCase().includes("ai")) ||
    (p.family &&
      typeof p.family === "string" &&
      p.family.toLowerCase().includes("ai"))
      ? "/formula-booklets/ai-fb.pdf"
      : "/formula-booklets/aa-fb.pdf";

  // 🔒 Blocăm scroll-ul paginii când Markscheme este deschis (mode = 1 sau 2)
useEffect(() => {
  const html = document.documentElement;
  const body = document.body;

  if (mode !== 0) {
    // Blochează scroll-ul paginii principale
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
  } else {
    // Deblochează scroll-ul paginii
    html.style.overflow = "";
    body.style.overflow = "";
  }

  // Curățare (siguranță)
  return () => {
    html.style.overflow = "";
    body.style.overflow = "";
  };
}, [mode]);

  useEffect(() => {
    const handler = (e) => {
      if (e.detail?.source !== qNo) setMode(0);
    };
    window.addEventListener("ace:closeAllMarkschemes", handler);
    return () =>
      window.removeEventListener("ace:closeAllMarkschemes", handler);
  }, [qNo]);

  const openSplit = () => {
    window.dispatchEvent(
      new CustomEvent("ace:closeAllMarkschemes", { detail: { source: qNo } })
    );
    setMode(1);
    requestAnimationFrame(() =>
      document
        .getElementById(`q-${qNo}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    );
  };
  const closeAll = () => setMode(0);
  const showFullMs = () => setMode(2);
  const backToSplit = () => setMode(1);

  /** ───────── Control CALCULATOR chip ───────── */
  const mapTech = (val, calculatorBool) => {
    if (typeof calculatorBool === "boolean") {
      return calculatorBool ? "CALCULATOR" : "NO CALCULATOR";
    }
    const raw = (val || "").toString().trim().toLowerCase();
    if (!raw) return null;
    if (raw === "gdc") return "CALCULATOR";
    if (raw === "no gdc" || raw === "nogdc" || raw === "no_gdc")
      return "NO CALCULATOR";
    if (raw === "calculator") return "CALCULATOR";
    if (raw === "no calculator") return "NO CALCULATOR";
    return null;
  };

  const stmt = p.statement_md ?? p.statement ?? "";
  const sol = p.solution_md ?? p.solution ?? "";

  const techLabel = mapTech(p.technology ?? p.gdc, p.calculator);

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
          topicLabel: "Sequences & Series",
          questionLabel: `Question ${qNo}`,
          problemNumber: qNo,
          topic: "Sequences & Series",
          userName,
        },
      })
    );
  };

  // Flag-uri opționale pe problemă:
  const want = {
    calc: p.showCalc !== false,
    diff: p.showDifficulty !== false,
    video: p.showVideo !== false,
    ia: p.showIA !== false,
  };

  // maximum marks
  const maxMarks =
    (typeof p.marks === "number" && p.marks > 0 && p.marks) ||
    (typeof p.marks === "string" && p.marks.trim()) ||
    null;

  // difficulty → câte steluțe umplute
  const diffRaw = (p.difficulty || "").toString().toLowerCase();
  let starsFilled = 0;
  if (diffRaw.startsWith("easy")) starsFilled = 1;
  else if (diffRaw.startsWith("medium")) starsFilled = 2;
  else if (diffRaw.startsWith("hard")) starsFilled = 3;

  return (
    <div id={`q-${qNo}`} className={styles.rowWrap}>
      <article
        className={`${styles.rowCard} ${
          mode ? styles.rowCardActive : ""
        } ${mode ? styles.cardActive : ""}`}
      >
        {/* ------- HEADER ------- */}
        <div className={styles.cardHeader}>
          {/* STÂNGA – Question + Max Mark + Calc + Difficulty */}
          <div className={styles.headerLeft}>
            <span className={styles.qNumber}>
              Question {qNo}
              {maxMarks && (
                <span className={styles.maxMark}>
                  {" "}
                  [Maximum Mark: {maxMarks}]
                </span>
              )}
            </span>

            {/* CALC / NO CALC – doar icon, informativ */}
            {!hideCalcBadge && want.calc && techLabel && (
              <span
                className={styles.metaInfoIcon}
                title={
                  techLabel === "CALCULATOR" ? "Calculator" : "No Calculator"
                }
              >
                {techLabel === "CALCULATOR" ? (
                  <IconCalculator className={styles.metaIconCalc} />
                ) : (
                  <IconCalculatorOff className={styles.metaIconCalc} />
                )}
              </span>
            )}

            {/* DIFFICULTY – 3 steluțe + text Easy/Medium/Hard */}
            {want.diff && p.difficulty && (
              <span className={styles.metaInfoIcon} title="Difficulty">
                <span className={styles.starsGroup}>
                  {[1, 2, 3].map((n) => (
                    <IconStar
                      key={n}
                      filled={n <= starsFilled}
                      className={styles.metaIconSmall}
                    />
                  ))}
                </span>
                <span className={styles.metaLabel}>{p.difficulty}</span>
              </span>
            )}
          </div>

          {/* CENTRU – Mark Scheme */}
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
  className={styles.closeTextBtn}
  onClick={closeAll}
  title="Close Mark Scheme"
  aria-label="Close Mark Scheme"
>
  Close
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
  className={styles.closeTextBtn}
  onClick={closeAll}
  title="Close Mark Scheme"
  aria-label="Close Mark Scheme"
>
  Close
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

          {/* DREAPTA – Eye + Formula Booklet + Tutor IA (active) */}
          <div className={styles.headerRight}>
            {/* VIEW (ochi) – preview enunț */}
            <button
              type="button"
              className={styles.metaIconBtn}
              onClick={() => setShowStatementModal(true)}
              title="View question"
            >
              <IconEye className={styles.metaIconRight} />
            </button>

            {/* FORMULA BOOKLET / FB – deschide PDF în modal */}
            <button
              type="button"
              className={styles.metaIconBtn}
              title="Formula Booklet"
              onClick={() => {
                setFbPage(1);
                setShowFbModal(true);
              }}
            >
              <IconDocument className={styles.metaIconRight} />
            </button>

            {/* TUTOR IA – buton text „Tutor IA”, fără tooltip */}
            {want.ia && (
              <button
                type="button"
                className={`${styles.tutorBtn} ${
                  p.hasIA ? styles.metaOn : styles.metaOff
                }`}
                onClick={p.hasIA ? openTutor : undefined}
                style={{ cursor: p.hasIA ? "pointer" : "default" }}
              >
                <span className={styles.metaLabel}>Tutor IA</span>
              </button>
            )}
          </div>
        </div>

        {/* ------- BODY ------- */}
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

      {/* ------- MODAL PREVIEW ENUNȚ (Eye) ------- */}
      {showStatementModal && (
        <div
          className={styles.qbModalBackdrop}
          onClick={() => setShowStatementModal(false)}
        >
          <div
            className={styles.qbModal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.qbModalHeader}>
              <span>
                Question {qNo}
                {maxMarks && (
                  <span className={styles.maxMark}>
                    {" "}
                    [Maximum Mark: {maxMarks}]
                  </span>
                )}
              </span>
              <button
                type="button"
                className={styles.qbModalClose}
                onClick={() => setShowStatementModal(false)}
              >
                ×
              </button>
            </div>
            <div className={styles.qbModalBody}>
              <MdMath>{stmt}</MdMath>
            </div>
          </div>
        </div>
      )}

      {/* ------- MODAL FORMULA BOOKLET (PDF + săgeți) ------- */}
      {showFbModal && (
        <div
          className={styles.qbModalBackdrop}
          onClick={() => setShowFbModal(false)}
        >
          <div
            className={`${styles.qbModal} ${styles.qbModalFb}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.qbModalHeader}>
              {/* 1) titlu schimbat în "AA Formula Booklet" */}
              <span>AA Formula Booklet</span>

              {/* 2) butoane stânga/dreapta + indicator pagină */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button
                  type="button"
                  onClick={() =>
                    setFbPage((prev) => (prev > 1 ? prev - 1 : prev))
                  }
                  style={{
                    border: "1px solid #0F766E",
                    borderRadius: 999,
                    padding: "2px 10px",
                    background: "#fff",
                    cursor: fbPage > 1 ? "pointer" : "default",
                    opacity: fbPage > 1 ? 1 : 0.4,
                  }}
                >
                  ←
                </button>
                <span style={{ fontSize: "0.8rem", color: "#0f172a" }}>
                  Page {fbPage}
                </span>
                <button
                  type="button"
                  onClick={() => setFbPage((prev) => prev + 1)}
                  style={{
                    border: "1px solid #0F766E",
                    borderRadius: 999,
                    padding: "2px 10px",
                    background: "#fff",
                    cursor: "pointer",
                  }}
                >
                  →
                </button>
              </div>

              <button
                type="button"
                className={styles.qbModalClose}
                onClick={() => setShowFbModal(false)}
              >
                ×
              </button>
            </div>
            <div className={styles.qbModalBody}>
              {/* 3) navpanes=1 pentru a deschide document outline în stânga */}
              <iframe
  key={fbPage}
  src={`${fbFile}#page=${fbPage}&zoom=page-fit&navpanes=1&pagemode=bookmarks`}
  style={{
    width: "100%",
    height: "70vh",
    border: "none",
  }}
/>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
