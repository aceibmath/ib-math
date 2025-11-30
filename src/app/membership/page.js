// src/app/membership/page.js
"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "../../firebase/config";
import ProductCard from "../../components/membership/ProductCard";
import "./membership.css";

/** === Config === */
const TITLES = {
  aa_sl: "SL Analysis & Approaches",
  aa_hl: "HL Analysis & Approaches",
  ai_sl: "SL Applications & Interpretation",
  ai_hl: "HL Applications & Interpretation",
  suite: "Complete Learning Suite",
  teacher_aa_sl: "SL Analysis & Approaches Teacher PRO",
  teacher_aa_hl: "HL Analysis & Approaches Teacher PRO",
  teacher_ai_sl: "SL Applications & Interpretation Teacher PRO",
  teacher_ai_hl: "HL Applications & Interpretation Teacher PRO",
  teacher_suite: "Complete Learning Suite Teacher PRO",
};

const STUDENT_SINGLES = ["aa_sl", "aa_hl", "ai_sl", "ai_hl"];
const TEACHER_SINGLES = ["teacher_aa_sl", "teacher_aa_hl", "teacher_ai_sl", "teacher_ai_hl"];

const FEATURES_STUDENT_4 = ["Question Bank", "Past Papers", "Prediction Exams", "Flashcards"];
const FEATURES_TEACHER_6 = [
  "Question Bank",
  "Past Papers",
  "Prediction Exams",
  "Flashcards",
  "Teacher Lessons",
  "Assessments",
];

const CARD_COLOR_CLASS = {
  aa_sl: "card-aa-sl",
  aa_hl: "card-aa-hl",
  ai_sl: "card-ai-sl",
  ai_hl: "card-ai-hl",
  suite: "card-suite",
  teacher_aa_sl: "card-t-aa-sl",
  teacher_aa_hl: "card-t-aa-hl",
  teacher_ai_sl: "card-t-ai-sl",
  teacher_ai_hl: "card-t-ai-hl",
  teacher_suite: "card-t-suite",
};

const CTA_BG = "#0f3d37";
const CTA_FG = "#ffffff";
const DRAWER_BORDER = "#9ca3af";

/** helper pentru formatare banner (fără liniuțe) */
function niceCourseLabel(courseId) {
  switch (courseId) {
    case "aa_sl":
      return "Analysis & Approaches Standard Level";
    case "aa_hl":
      return "Analysis & Approaches Higher Level";
    case "ai_sl":
      return "Applications & Interpretation Standard Level";
    case "ai_hl":
      return "Applications & Interpretation Higher Level";
    default:
      return "";
  }
}

/** format bani din cents */
const formatMoney = (cents, currency) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency }).format((cents ?? 0) / 100);

export default function MembershipPage() {
  const router = useRouter();
  const search = useSearchParams();

  // === URL state pentru single view ===
  const view = search.get("view"); // "single" | null
  const baseParam = search.get("base"); // una din cheile TITLES
  const monthsParam = Number(search.get("months") || "");
  const selectedText = search.get("selectedText") || null;

  // o singură sursă de adevăr pentru durată
  const [months, setMonths] = useState(12);

  // aplicăm months din URL dacă există
  useEffect(() => {
    if (Number.isFinite(monthsParam) && monthsParam >= 1 && monthsParam <= 24) {
      setMonths(monthsParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthsParam]);

  const isValidBase = useMemo(() => !!baseParam && !!TITLES[baseParam], [baseParam]);
  const isSingleMode = view === "single" && isValidBase;

  // pricing precomputat
  const [pricing, setPricing] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setErrorMsg("");
        const res = await fetch("/pricing-table.json", { cache: "no-store" });
        if (!res.ok) throw new Error("pricing-table.json not found");
        const data = await res.json();
        setPricing(data);
      } catch (e) {
        setErrorMsg(e.message || "Failed to load pricing.");
      }
    })();
  }, []);

  const currency = pricing?.meta?.currency || "eur";
  const unit = months === 1 ? "month" : "months";

  // helpers: pricing.prices[base][months] = { total_cents, per_month_cents }
  const priceFor = (base, m) => {
    const rec = pricing?.prices?.[base]?.[String(m)];
    if (!rec) return null;
    return { totalCents: rec.total_cents, perMonthCents: rec.per_month_cents };
  };

  const minTotalFor = (bases, m) => {
    let best = null;
    for (const b of bases) {
      const p = priceFor(b, m);
      if (p && (best === null || p.totalCents < best.totalCents)) best = p;
    }
    return best;
  };

  // când months se schimbă, sincronizăm URL-ul (fără Apply)
  useEffect(() => {
    const params = new URLSearchParams();
    if (view) params.set("view", view);
    if (baseParam) params.set("base", baseParam);
    if (selectedText) params.set("selectedText", selectedText);
    params.set("months", String(months));
    router.replace(`/membership?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [months]);

  // Banner text (folosește selectedText dacă există; altfel fallback dinamic)
  const bannerText = useMemo(() => {
  if (!isSingleMode) return null;
  if (selectedText) return selectedText;

  const isTeacher = String(baseParam || "").startsWith("teacher_");
  const isSuite = String(baseParam || "").includes("suite");
  const audience = isTeacher ? "Teachers" : "Students";
  const unit = months === 1 ? "month" : "months";
  const courseId = String(baseParam || "").replace(/^teacher_/, "");

  // 🟡 Complete Learning Suite (All Courses) — corectăm mesajul bannerului
  if (isSuite) {
    return `You selected ALL COURSES (Complete Learning Suite ${audience} course – ${months} ${unit} subscription)`;
  }

  // 🔹 Pentru restul cursurilor single
  return `You selected ${niceCourseLabel(courseId)} (${audience} course – ${months} ${unit} subscription)`;
}, [isSingleMode, selectedText, baseParam, months]);


  // Checkout (Stripe) – se cheamă DOAR din single view
  const handleCheckout = async (productBase) => {
    try {
      const u = auth.currentUser;
      const lookupKey = `${productBase}_${months}m`;

      // neautentificat → trimite la /join cu months (poate cere login)
      if (!u) {
        window.location.href = `/join?product=${encodeURIComponent(
          productBase
        )}&months=${encodeURIComponent(months)}`;
        return;
      }

      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lookupKey, uid: u.uid }),
      });
      const data = await res.json();
      if (res.ok && data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data?.error || "Checkout failed");
      }
    } catch (e) {
      alert(e.message || "Checkout failed");
    }
  };

  // Navigare în single view
  const goSingle = (base) => {
    const url = `/membership?view=single&base=${encodeURIComponent(base)}&months=${encodeURIComponent(months)}`;
    router.push(url);
  };

  // Picker pentru Single Course
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerRole, setPickerRole] = useState(null); // "student" | "teacher"
  const [pickerCourse, setPickerCourse] = useState(null); // "aa_sl" | "ai_hl" etc.

  const openPicker = (role) => {
    setPickerRole(role);
    setPickerCourse(null); // fără selecție inițial
    setPickerOpen(true);
  };
  const closePicker = () => setPickerOpen(false);

  // trimite mesajul final în URL (fără liniuță)
  const submitPicker = (selectionText) => {
    if (!pickerRole || !pickerCourse) return;
    const base = pickerRole === "teacher" ? `teacher_${pickerCourse}` : pickerCourse;

    const audience = pickerRole === "teacher" ? "Teachers" : "Students";
    const unitLocal = months === 1 ? "month" : "months";
    const fullMessage = `You selected ${selectionText} (${audience} course – ${months} ${unitLocal} subscription)`;

    setPickerOpen(false);
    const text = encodeURIComponent(fullMessage);
    router.push(`/membership?view=single&base=${base}&months=${months}&selectedText=${text}`);
  };

  const renderBaseCard = (base, opts = {}) => {
    const isTeacher = base.startsWith("teacher_");
    const isSuite = base.includes("suite");
    const courseTitle = TITLES[base];
    const subtitle = isSuite ? "All Courses" : "Single Course";
    const infoLine = isSuite
      ? isTeacher
        ? "Unlimited access to all Teacher courses"
        : "Unlimited access to all Student courses"
      : isTeacher
      ? "For a single Teacher course"
      : "For a single Student course";
    const features = isTeacher ? FEATURES_TEACHER_6 : FEATURES_STUDENT_4;

    const p = priceFor(base, months);
    const priceLabelOverride = p ? `${formatMoney(p.totalCents, currency)} / ${months} ${unit}` : null;

    return (
      <ProductCard
        key={base}
        className={`${CARD_COLOR_CLASS[base]} ${opts.extraClass || ""}`}
        product={{ base }}
        duration={months}
        busy={false}
        // Din grilă: mergem în single view (nu Stripe)
        onCheckout={() => goSingle(base)}
        priceCents={p?.totalCents ?? null}
        currency={currency}
        priceLabelOverride={priceLabelOverride}
        subtitle={subtitle}
        courseTitle={courseTitle}
        infoLine={infoLine}
        features={features}
        ctaLabel={opts.ctaLabel || undefined}
        useSingleBadge={opts.useSingleBadge || false}
        /* noi – opțiuni vizuale controlate din opts */
        titleOverride={opts.titleOverride || null}
        titleRed={!!opts.titleRed}
        hideSubline={!!opts.hideSubline}
      />
    );
  };

  const renderGridFour = () => {
    const minStud = minTotalFor(STUDENT_SINGLES, months);
    const minTeach = minTotalFor(TEACHER_SINGLES, months);

    const priceLabelStudents = minStud ? `${formatMoney(minStud.totalCents, currency)} / ${months} ${unit}` : null;
    const priceLabelTeachers = minTeach ? `${formatMoney(minTeach.totalCents, currency)} / ${months} ${unit}` : null;

    return (
      <div className="membership-grid">
        {/* Card 1 – Single Student → deschide picker, apoi single view */}
        <ProductCard
          key="single-student"
          className="card-aa-sl card-unified onecol"
          product={{ base: "single_student" }}
          duration={months}
          busy={false}
          onCheckout={() => openPicker("student")}
          priceCents={minStud?.totalCents ?? null}
          currency={currency}
          priceLabelOverride={priceLabelStudents}
          subtitle={"Single Course"}
          titleOverride="Students"
          titleRed
          hideSubline
          courseTitle="Single Course"
          infoLine="For a single Student course"
          features={FEATURES_STUDENT_4}
          useSingleBadge
        />

        {/* Card 2 – Single Teacher → picker, apoi single view */}
        <ProductCard
          key="single-teacher"
          className="card-t-aa-sl card-unified onecol"
          product={{ base: "single_teacher" }}
          duration={months}
          busy={false}
          onCheckout={() => openPicker("teacher")}
          priceCents={minTeach?.totalCents ?? null}
          currency={currency}
          priceLabelOverride={priceLabelTeachers}
          subtitle={"Single Course"}
          titleOverride="Teachers"
          titleRed
          hideSubline
          courseTitle="Single Course Teacher PRO"
          infoLine="For a single Teacher course"
          features={FEATURES_TEACHER_6}
          useSingleBadge
        />

        {/* Card 3 & 4 – Suite → direct în single view, nu Stripe */}
        {renderBaseCard("suite", {
          extraClass: "onecol",
          titleOverride: "Students",
          titleRed: true,
          hideSubline: true,
        })}
        {renderBaseCard("teacher_suite", {
          extraClass: "onecol",
          titleOverride: "Teachers",
          titleRed: true,
          hideSubline: true,
        })}
      </div>
    );
  };

  // Single view (card mărit) + Back link
  const renderSingle = () => {
    const base = baseParam;
    const isTeacher = base.startsWith("teacher_");
    const isSuite = base.includes("suite");
    const courseTitle = TITLES[base];
    const subtitle = isSuite ? "All Courses" : "Single Course";
    const features = isTeacher ? FEATURES_TEACHER_6 : FEATURES_STUDENT_4;

    const infoLine = isSuite
      ? isTeacher
        ? "Unlimited access to all Teacher courses"
        : "Unlimited access to all Student courses"
      : isTeacher
      ? "For a single Teacher course"
      : "For a single Student course";

    const p = priceFor(base, months);
    const priceLabelOverride = p ? `${formatMoney(p.totalCents, currency)} / ${months} ${unit}` : null;

    return (
      <>
        <div className="membership-grid" style={{ justifyContent: "center" }}>
          <ProductCard
            className={`${CARD_COLOR_CLASS[base]} single-enlarged`}
            product={{ base }}
            duration={months}
            busy={false}
            onCheckout={() => handleCheckout(base)}
            priceCents={p?.totalCents ?? null}
            currency={currency}
            priceLabelOverride={priceLabelOverride}
            subtitle={subtitle}
            courseTitle={courseTitle}
            infoLine={infoLine}
            features={features}
            useSingleBadge={!isSuite}
            ctaLabel="Go to payment"
          />
        </div>

        {/* Back to all plans */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 14 }}>
          <button
            type="button"
            className="back-link"
            onClick={() => router.push("/membership")}
            title="Back to all plans"
            style={{
              background: "transparent",
              border: "none",
              color: "#0f3d37",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            ← Back to all plans
          </button>
        </div>
      </>
    );
  };

  // progres pentru culoarea slider-ului (roșu stânga, gri dreapta)
  const percent = ((months - 1) / (24 - 1)) * 100;

  // —— control ușor pentru lățimea sliderului ——
  const sliderWidth = "min(380px, 36vw)";

  // ---- drag de pe eticheta "X months" ----
  const sliderRef = useRef(null);
  const draggingRef = useRef(false);

  const setFromClientX = (clientX) => {
    const el = sliderRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = (clientX - rect.left) / rect.width;
    const clamped = Math.min(1, Math.max(0, pct));
    const value = 1 + Math.round(clamped * (24 - 1));
    setMonths(value);
  };

  const onPointerMove = (e) => {
    if (!draggingRef.current) return;
    setFromClientX(e.clientX ?? (e.touches && e.touches[0]?.clientX));
  };

  const stopDrag = () => {
    draggingRef.current = false;
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", stopDrag);
    window.removeEventListener("touchmove", onPointerMove);
    window.removeEventListener("touchend", stopDrag);
  };

  const startDrag = (clientX) => {
    draggingRef.current = true;
    setFromClientX(clientX);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", stopDrag, { once: true });
    window.addEventListener("touchmove", onPointerMove, { passive: false });
    window.addEventListener("touchend", stopDrag, { once: true });
  };

  return (
    <div className="membership-page">
      <section className="hero" style={{ paddingTop: 0, paddingBottom: 12 }}>
        <div className="hero-inner" style={{ textAlign: "center" }}>
          {/* Headline (NUMAI în grilă) */}
          {!isSingleMode && (
            <p
              className="planbar-label"
              style={{
                fontWeight: 400,
                fontSize: 18,
                display: "block",
                lineHeight: 1.3,
                marginBottom: 8,
                color: "#0f3d37",
              }}
            >
              Use the <strong>slider</strong> to set your subscription duration, then choose a <strong>plan</strong>, and
              click <strong>Get Started</strong>.
            </p>
          )}

          {/* Banner în single view (selectedText sau fallback) */}
          {isSingleMode && bannerText && (
            <div
              style={{
                background: "#f9f9d0",
                color: "#0f3d37",
                padding: "6px 12px",
                borderRadius: 6,
                fontSize: 14.5,
                fontWeight: 500,
                marginBottom: 10,
                display: "inline-block",
              }}
            >
              {bannerText}
            </div>
          )}

          {/* Controls row: GROUP (months+slider) —— fără Apply */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 28,
              width: "100%",
              margin: "0 auto 10px",
              maxWidth: 980,
              transform: "translateX(-37px)", // aliniază cu cardul
            }}
          >
            {/* GROUP: months box + slider */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                flexWrap: "nowrap",
              }}
            >
              {/* months box (ascunsă) */}
              <div
                className="months-box"
                hidden
                aria-hidden="true"
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: 10,
                  padding: "6px 10px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#fff",
                  width: "fit-content",
                }}
              >
                <div style={{ fontSize: 14 }}>Duration (months)</div>
                <input
                  className="months-input show-spinners"
                  type="number"
                  min={1}
                  max={24}
                  value={months}
                  onChange={(e) => {
                    const v = Math.max(1, Math.min(24, Number(e.target.value || 1)));
                    setMonths(v);
                  }}
                  style={{
                    width: 60,
                    border: "none",
                    outline: "none",
                    fontSize: 14,
                    textAlign: "right",
                    padding: "4px 8px",
                    background: "transparent",
                  }}
                />
              </div>

              {/* SLIDER + cercul roșu + eticheta */}
              <div style={{ width: sliderWidth, minWidth: 180 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 14,
                    marginBottom: 4,
                  }}
                >
                  <span>1 month</span>
                  <span>24 months</span>
                </div>

                <div className="slider-wrap">
                  <input
                    className="plan-slider"
                    type="range"
                    min={1}
                    max={24}
                    step={1}
                    value={months}
                    onChange={(e) => setMonths(Number(e.target.value))}
                    style={{ "--progress": `${percent}%` }}
                    ref={sliderRef}
                  />

                  {/* cerc roșu exact pe capătul roșu */}
                  <div className="slider-dot" aria-hidden="true" style={{ left: `calc(${percent}% )` }} />

                  {/* eticheta sub bară (drag-able) */}
                  <div
                    className="slider-value"
                    aria-hidden="true"
                    style={{ left: `calc(${percent}% )` }}
                    onPointerDown={(e) => {
                      e.preventDefault();
                      startDrag(e.clientX);
                    }}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      const x = e.touches && e.touches[0]?.clientX;
                      if (x != null) startDrag(x);
                    }}
                  >
                    {months} {months === 1 ? "month" : "months"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {errorMsg ? (
            <p className="error center" style={{ marginTop: 10 }}>
              {errorMsg}
            </p>
          ) : null}
        </div>
      </section>

      {isSingleMode ? renderSingle() : renderGridFour()}

      {/* ===== Picker pentru Single Course ===== */}
      <PickerModal
        open={pickerOpen}
        role={pickerRole}
        course={pickerCourse}
        setCourse={setPickerCourse}
        onCancel={closePicker}
        onSubmit={submitPicker}
      />

      <style jsx global>{`
        .membership-grid .card-unified {
          min-height: 320px;
        }

        .course-card.single-enlarged {
          width: min(340px, 95vw) !important;
          margin-inline: auto !important;
          min-height: 320px !important;
          margin-top: -16px;
        }

        input[type="number"].show-spinners {
          appearance: auto;
          -moz-appearance: auto;
        }
        input[type="number"].show-spinners::-webkit-outer-spin-button,
        input[type="number"].show-spinners::-webkit-inner-spin-button {
          -webkit-appearance: inner-spin-button;
          opacity: 1;
        }

        /* ===== Slider fix: un singur input, dot perfect centrat ===== */
        .slider-wrap {
          position: relative;
          height: 22px; /* loc pt. track(4px) + dot(14px) */
        }

        .plan-slider {
          --track-h: 4px;
          -webkit-appearance: none;
          appearance: none;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 100%;
          height: var(--track-h);
          background: transparent;
          outline: none;
          -webkit-tap-highlight-color: transparent;
        }

        /* WebKit: roșu până la --progress, apoi gri */
        .plan-slider::-webkit-slider-runnable-track {
          height: var(--track-h);
          border-radius: 9999px;
          background: linear-gradient(
            to right,
            #e41f1f 0%,
            #e41f1f var(--progress),
            #d1d5db var(--progress),
            #d1d5db 100%
          );
        }

        /* Thumb invizibil dar „drag-able” și centrat */
        .plan-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: transparent;
          border: none;
          box-shadow: none;
          margin-top: calc((18px - var(--track-h)) / -2);
          cursor: pointer;
        }

        /* Firefox */
        .plan-slider::-moz-range-track {
          height: var(--track-h);
          border-radius: 9999px;
          background: #d1d5db;
        }
        .plan-slider::-moz-range-progress {
          height: var(--track-h);
          border-radius: 9999px;
          background: #e41f1f;
        }
        .plan-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: transparent;
          border: none;
          box-shadow: none;
          cursor: pointer;
        }

        .slider-dot {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #e41f1f;
          pointer-events: none;
          z-index: 1;
        }

        .slider-value {
          position: absolute;
          top: 22px;
          transform: translateX(-50%);
          font-size: 12px;
          color: #e41f1f;
          white-space: nowrap;
          pointer-events: auto; /* permite drag de pe etichetă */
          user-select: none;
          cursor: pointer; /* păstrăm aceeași mână ca pe slider */
        }
        .slider-value:active {
          cursor: pointer;
        }

        .back-link {
          font-size: 14.5px;
          text-decoration: none;
        }
        .back-link:hover {
          filter: brightness(0.85);
          text-decoration: none;
        }

        /* CTA mai mare în single */
        .course-card.single-enlarged .start-btn {
          font-size: 17px;
          padding: 1px 60px;
        }
      `}</style>
    </div>
  );
}

/** ===== Componentă modal simplă pentru alegerea cursului ===== */
function PickerModal({ open, role, course, setCourse, onCancel, onSubmit }) {
  if (!open) return null;
  const roleLabel = role === "teacher" ? "Teachers" : "Students";

  // text „Select a course” / label frumos pentru curs
  const labelFor = (id) => {
    switch (id) {
      case "aa_sl":
        return "Analysis & Approaches Standard Level";
      case "aa_hl":
        return "Analysis & Approaches Higher Level";
      case "ai_sl":
        return "Applications & Interpretation Standard Level";
      case "ai_hl":
        return "Applications & Interpretation Higher Level";
      default:
        return null;
    }
  };
  const selectionText = labelFor(course);

  const R = (id, label) => (
    <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <input type="radio" name="picker-course" checked={course === id} onChange={() => setCourse(id)} />
      <span>{label}</span>
    </label>
  );

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onCancel}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,.35)",
          zIndex: 9998,
        }}
      />
      <aside
        role="dialog"
        aria-modal="true"
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          padding: 16,
        }}
      >
        <div
          className="membership-drawer"
          style={{
            width: "min(460px, 92vw)",
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 10px 40px rgba(0,0,0,.25)",
            maxHeight: "calc(100vh - 140px)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "16px 18px", color: "#0f3d37" }}>
            <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 2 }}>Choose your course</div>
            <div style={{ color: "#d11f2a", fontSize: 14, marginBottom: 8 }}>{roleLabel}</div>

            {/* Hint dinamic */}
            <div className="picker-hint" aria-live="polite" style={{ color: "#6b7280", fontSize: 13.5, marginBottom: 10 }}>
              {selectionText ? `You have selected ${selectionText}.` : "Select a course."}
            </div>

            <div
              style={{
                border: `1px solid ${DRAWER_BORDER}`,
                borderRadius: 12,
                padding: 12,
                display: "grid",
                gap: 8,
                marginBottom: 12,
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 500 }}>Analysis & Approaches</div>
              <div style={{ display: "flex", gap: 18 }}>
                {R("aa_sl", "Standard Level")}
                {R("aa_hl", "Higher Level")}
              </div>
            </div>

            <div
              style={{
                border: `1px solid ${DRAWER_BORDER}`,
                borderRadius: 12,
                padding: 12,
                display: "grid",
                gap: 8,
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 500 }}>Applications & Interpretation</div>
              <div style={{ display: "flex", gap: 18 }}>
                {R("ai_sl", "Standard Level")}
                {R("ai_hl", "Higher Level")}
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 16 }}>
              <button className="planbar-tab" onClick={onCancel} style={{ color: "#0f3d37" }}>
                Cancel
              </button>
              <button
                className="planbar-tab active"
                onClick={() => {
                  if (!selectionText) return;
                  onSubmit(selectionText);
                }}
                disabled={!course}
                aria-disabled={!course}
                style={{
                  background: !course ? "#9ca3af" : "#0f3d37",
                  color: "#ffffff",
                  borderColor: "transparent",
                  opacity: !course ? 0.7 : 1,
                  cursor: !course ? "not-allowed" : "pointer",
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
