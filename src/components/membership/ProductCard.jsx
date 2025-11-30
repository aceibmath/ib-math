// src/components/membership/ProductCard.jsx
"use client";

function fmtCurrency(amount, currency = "eur") {
  if (amount == null) return null;
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: (currency || "eur").toUpperCase(),
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${amount} ${currency?.toUpperCase() || ""}`;
  }
}

export default function ProductCard({
  className = "",
  product,
  duration = 12,
  busy = false,
  onCheckout = () => {},
  features = [],
  priceCents = null,
  currency = "eur",
  subtitle = "",
  courseTitle = "",
  infoLine,
  ctaLabel = "Get Started",
  useSingleBadge = false,

  // control vizual pe grilă
  titleOverride = null,
  titleRed = false,
  hideSubline = false,

  // (opțional) dacă vrei să suprascrii textul perioadei; dacă nu, folosim `duration`
  priceLabelOverride = null,
}) {
  const total = priceCents != null ? priceCents / 100 : null;
  const perMonth = total != null && duration ? total / duration : null;

  const handleCheckout = (e) => {
    e?.stopPropagation?.();
    if (!busy && product?.base) onCheckout(product.base);
  };

  const isSingleView = /\bsingle-enlarged\b/.test(className);
  const effectiveCta = isSingleView ? (ctaLabel ?? "Get full access") : ctaLabel;

  const hasPro = / Teacher PRO$/.test(courseTitle);
  const titleMainOriginal = hasPro ? courseTitle.replace(/ Teacher PRO$/, "") : courseTitle;

  const isSuite = product?.base === "suite" || product?.base === "teacher_suite";
  const titleToShow = titleOverride ?? titleMainOriginal;

  // === perioadă: din slider (duration) cu pluralizare corectă ===
  let monthsText = `${duration} ${duration === 1 ? "month" : "months"}`;
  if (priceLabelOverride) {
    const m = priceLabelOverride.match(/(\d+)\s*(month|months)/i);
    if (m) monthsText = `${m[1]} ${Number(m[1]) === 1 ? "month" : "months"}`;
  }

  return (
    <article className={`course-card ${className} ${busy ? "disabled" : ""}`}>
      <div className="toprow">
        {isSuite ? (
          <span className="badge-suite">All Courses</span>
        ) : useSingleBadge ? (
          <span className="badge-single">Single Course</span>
        ) : (
          <div className="left-label">{subtitle}</div>
        )}
        <span className="badge-premium">Premium</span>
      </div>

      <div className="line-title">
        <div
          className="line-title-main"
          style={{
            // 👉 Mărimea titlului “Students” / “Teachers”
            fontSize: isSingleView ? 24 : 24,
            color: titleRed ? "var(--red-accent)" : undefined,
          }}
        >
          {titleToShow}
        </div>

      {!hideSubline &&
  (hasPro ? (
    <div
      className="line-title-sub pro"
      style={{
        fontSize: isSingleView ? 15 : 15,  // 🔹 mărimea textului
        fontWeight: 500,
        color: "var(--red-accent)",        // 🔴 culoare roșie
      }}
    >
      Teachers
    </div>
  ) : (
    <div
      className="line-title-sub student"
      style={{
        fontSize: isSingleView ? 15 : 15,  // 🔹 mărimea textului
        fontWeight: 500,
        color: "var(--red-accent)",        // 🔴 culoare roșie
      }}
    >
      Students
    </div>
  ))}

      </div>

      {/* ======== HEADER CU PREȚ ======== */}
      <header className="course-header">
        <div
          className="price-line"
          style={{
            display: "flex",
            alignItems: "baseline",
            whiteSpace: "nowrap",
            gap: 0, // 👈 fără spațiu între elemente
          }}
        >
          {/* --- PREȚUL --- */}
          <span
            className="price-amount"
            style={{
              fontSize: 21,   // 👈 mărimea prețului (ex: €199.00)
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            {total != null ? fmtCurrency(total, currency) : "—"}
          </span>

          {/* --- /MONTHS --- */}
          <span
            className="price-slash"
            style={{
              marginLeft: 2,  // 👈 spațiu între preț și “/12 months”
              fontSize: 13,   // 👈 mărimea textului “/12 months”
              fontWeight: 400,
              color: "#6b7280",
            }}
          >
            /{duration} {duration === 1 ? "month" : "months"}
          </span>

          {/* “Billed only once” a fost scos complet */}
        </div>

        {/* --- Textul mic “€X a month” --- */}
        <div
          className="price-sub"
          style={{
            marginTop: 2,   // 👈 distanța față de linia de sus
            fontSize: 13,   // 👈 mărimea textului “a month”
            color: "#0f3d37",
          }}
        >
          {perMonth != null ? `${fmtCurrency(perMonth, currency)} a month` : "—"}
        </div>
      </header>

      {/* ======== CTA (Butonul “Get Started”) ======== */}
      <div className="cta-row">
        <button type="button" className="start-btn" onClick={handleCheckout}>
          <b>{effectiveCta}</b>
        </button>
      </div>

      {infoLine ? <p className="info-line">{infoLine}</p> : null}

      {features?.length > 0 && (
        <section className="course-body">
          <ul className="feature-list">
            {features.map((f, idx) => (
              <li key={idx} className="feature-item">
                <span className="check" aria-hidden="true" /> {f}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ===============================================================
         🔧 STILURI CONTROL – DOAR PENTRU PAGINA CU 4 CARDURI (GRID)
         - Aici reglezi mărimea textului “Get Started”
         - Controlezi înălțimea, lățimea, marginile și forma butonului
         - Acestea NU afectează pagina cu 1 card (care are regula proprie)
        =============================================================== */}
      <style jsx global>{`
        .course-card:not(.single-enlarged) .start-btn {
          /* 🟢 Textul din buton (“Get Started”) */
          font-size: 16px;          /* ← mărești/scazi textul */

          /* 🟢 Înălțimea butonului (spațiu sus-jos) */
          padding-block: 6px;      /* ← mai mare = buton mai înalt */
          line-height: 1;

          /* 🟢 Lățimea butonului (spațiu stânga-dreapta) */
          padding-inline: 28px;     /* ← mai mare = buton mai lat */
          /* width: 100%;  ← opțional, face butonul full-width */

          /* 🟢 Opțional: dimensiuni minime & formă */
          min-width: 220px;         /* ← setează lățime minimă */
          border-radius: 9999px;    /* ← formă pastilă */
        }
      `}</style>
    </article>
  );
}
