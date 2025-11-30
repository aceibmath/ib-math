// src/components/pastpapers/PaperHeader.jsx
"use client";

import Link from "next/link";

export default function PaperHeader({
  meta,
  coursePath = "/AA_SL/past-papers", // ex: "/AA_SL/past-papers"
  courseLabel = "AA SL",             // ex: "AA SL", "AA HL", "AI SL", "AI HL"
  themeColor = "#0F766E",            // culoarea cursului (teal AA SL, mov AA HL, etc.)
}) {
  // courseRoot = "/AA_SL", "/AA_HL", etc.
  const courseRoot = coursePath.replace("/past-papers", "") || "/AA_SL";

  // bucăți extrase din meta
  const courseName = `Mathematics ${meta?.course ?? courseLabel}`;
  // ex "2024 May TZ1" (inclusiv TZ dacă există)
  const sessionBits = [
    meta?.year,
    meta?.session,
    meta?.tz ? meta.tz : null,
  ]
    .filter(Boolean)
    .join(" ");

  const paperBit = meta?.paper ? `Paper ${meta.paper}` : null;

  // calculator tag: "NO CALCULATOR" sau "CALCULATOR"
  const calcBit = meta?.calculator
    ? String(meta.calculator).toUpperCase()
    : null;

  // culoare text gri foarte închis (ai zis rgb(30 41 59))
  const darkTextColor = "rgb(30 41 59)";

  // helper pt bullet colorat în culoarea cursului
  const Bullet = () => (
    <span
      className="font-semibold mx-1"
      style={{ color: themeColor }}
      aria-hidden="true"
    >
      •
    </span>
  );

  return (
    <header className="mb-3">
      {/* === BREADCRUMB cu culoarea cursului === */}
      <nav
        aria-label="Breadcrumb"
        className="mb-4 md:mb-5 text-sm text-slate-600"
      >
        <ul className="flex flex-wrap items-center gap-2 list-none p-0 m-0">
          {/* Home */}
          <li>
            <Link
              href="/"
              className="hover:underline"
              style={{ color: themeColor }}
            >
              Home
            </Link>
          </li>

          <li aria-hidden="true" style={{ color: themeColor }}>
            ›››
          </li>

          {/* AA SL / AA HL / ... */}
          <li>
            <Link
              href={courseRoot}
              className="hover:underline"
              style={{ color: themeColor }}
            >
              {courseLabel}
            </Link>
          </li>

          <li aria-hidden="true" style={{ color: themeColor }}>
            ›››
          </li>

          {/* Past Papers */}
          <li>
            <Link
              href={coursePath}
              className="hover:underline"
              style={{ color: themeColor }}
            >
              Past Papers
            </Link>
          </li>
        </ul>
      </nav>

      {/* === TITLU EXAMEN ===
          layout:
          [Mathematics AA SL] • [2024 May TZ1] • [Paper 1] • [NO CALCULATOR]
          toate bucățile text sunt gri foarte închis
          bullet-urile sunt colorate în themeColor
      */}
      <h1 className="text-[20px] sm:text-[22px] md:text-[24px] leading-snug font-medium flex flex-wrap items-baseline">
        {/* 1. Numele cursului (gri închis, nu culoarea cursului) */}
        <span
          className="font-semibold"
          style={{ color: darkTextColor }}
        >
          {courseName}
        </span>

        {/* 2. sessionBits (ex. "2024 May TZ1") dacă există */}
        {sessionBits && (
          <>
            <Bullet />
            <span
              className="font-medium"
              style={{ color: darkTextColor }}
            >
              {sessionBits}
            </span>
          </>
        )}

        {/* 3. Paper X dacă există */}
        {paperBit && (
          <>
            <Bullet />
            <span
              className="font-medium"
              style={{ color: darkTextColor }}
            >
              {paperBit}
            </span>
          </>
        )}

        {/* 4. CALCULATOR / NO CALCULATOR dacă există */}
        {calcBit && (
          <>
            <Bullet />
            <span
              className="font-semibold uppercase tracking-tight"
              style={{ color: darkTextColor }}
            >
              {calcBit}
            </span>
          </>
        )}
      </h1>
    </header>
  );
}
