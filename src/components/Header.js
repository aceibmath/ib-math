// src/components/Header.js
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase/config";
import LogoBrand from "@/components/brand/LogoBrand";

export default function Header() {
  const { user, logout } = useAuth();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [dropdownAlign, setDropdownAlign] = useState("center");
  const buttonRefs = useRef({});
  const [firstName, setFirstName] = useState("");
  const [entitlements, setEntitlements] = useState(null);

  const [showMobile, setShowMobile] = useState(false);
  const [mobileStage, setMobileStage] = useState("root");
  const menus = ["Students", "Teachers"]; // ✅

  useEffect(() => {
    if (user?.displayName) setFirstName(user.displayName.split(" ")[0]);
  }, [user]);

  useEffect(() => {
    setEntitlements(null);
  }, [user]);

  const getHeaderH = () => {
    if (typeof window === "undefined") return 96;
    const v = getComputedStyle(document.documentElement).getPropertyValue("--app-header-h");
    const n = parseInt(v, 10);
    return Number.isFinite(n) ? n : 96;
  };

  const computeTopFromHeader = () => getHeaderH();

  const toggleDropdown = (menu) => {
    if (openDropdown === menu) {
      setOpenDropdown(null);
      return;
    }
    const rect = buttonRefs.current[menu]?.getBoundingClientRect();
    if (rect) {
      setDropdownPosition({
        top: computeTopFromHeader(),
        left: rect.left + rect.width / 2,
      });
      setDropdownAlign("center");
    }
    setOpenDropdown(menu);
  };

  const toggleUserDropdown = () => {
    if (openDropdown === "user") {
      setOpenDropdown(null);
      return;
    }
    const rect = buttonRefs.current["user"]?.getBoundingClientRect();
    if (rect) {
      const RIGHT_BUFFER = 16;
      const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
      setDropdownPosition({
        top: computeTopFromHeader(),
        left: vw - RIGHT_BUFFER,
      });
      setDropdownAlign("right");
    }
    setOpenDropdown("user");
  };

  useEffect(() => {
    const close = () => setOpenDropdown(null);
    window.addEventListener("scroll", close, { passive: true });
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("scroll", close);
      window.removeEventListener("resize", close);
    };
  }, []);

  const getIdToken = async () => {
    try {
      const t1 = await user?.getIdToken?.(true);
      if (t1) return t1;
    } catch {}
    try {
      const t2 = await auth?.currentUser?.getIdToken?.(true);
      if (t2) return t2;
    } catch {}
    return null;
  };

  useEffect(() => {
    const need = openDropdown === "Students" || openDropdown === "Teachers";
    if (!need) return;
    (async () => {
      try {
        const idToken = await getIdToken();
        const r = await fetch(`/api/entitlements/summary?ts=${Date.now()}`, {
          credentials: "include",
          cache: "no-store",
          headers: idToken ? { Authorization: `Bearer ${idToken}` } : {},
        });
        if (r.ok) setEntitlements(await r.json());
      } catch {}
    })();
  }, [openDropdown, user]);

  const studentsCols = [
    { head: "Math AA SL", key: "AA_SL", items: ["Questionbank", "Past Papers", "Prediction Exams", "Flashcards"] },
    { head: "Math AA HL", key: "AA_HL", items: ["Questionbank", "Past Papers", "Prediction Exams", "Flashcards"] },
    { head: "Math AI SL", key: "AI_SL", items: ["Questionbank", "Past Papers", "Prediction Exams", "Flashcards"] },
    { head: "Math AI HL", key: "AI_HL", items: ["Questionbank", "Past Papers", "Prediction Exams", "Flashcards"] },
  ];

  const educatorsCols = [
    { head: "Math AA SL", key: "AA_SL", items: ["Teacher Lessons", "Assessments", "Questionbank", "Past Papers", "Prediction Exams", "Flashcards"] },
    { head: "Math AA HL", key: "AA_HL", items: ["Teacher Lessons", "Assessments", "Questionbank", "Past Papers", "Prediction Exams", "Flashcards"] },
    { head: "Math AI SL", key: "AI_SL", items: ["Teacher Lessons", "Assessments", "Questionbank", "Past Papers", "Prediction Exams", "Flashcards"] },
    { head: "Math AI HL", key: "AI_HL", items: ["Teacher Lessons", "Assessments", "Questionbank", "Past Papers", "Prediction Exams", "Flashcards"] },
  ];

  const LABEL_TO_FOLDER = {
    Questionbank: "questionbank",
    "Past Papers": "past-papers",
    "Prediction Exams": "prediction-exams",
    Flashcards: "flashcards",
    "Teacher Lessons": "teacher-lessons",
    Assessments: "Assessments",
  };

  const handleNavigate = () => {
    setOpenDropdown(null);
    setShowMobile(false);
  };

  const hrefFor = (courseKey, itemLabel, audience) => {
    const aud = audience === "educator" ? "teacher" : "student";
    if (!itemLabel) return { pathname: `/${courseKey}`, query: { aud } };
    const seg = LABEL_TO_FOLDER[itemLabel] || itemLabel;
    return { pathname: `/${courseKey}/${seg}`, query: { aud } };
  };

  const renderBadge = (audience, courseKey) => {
    const tier = entitlements?.[audience]?.[courseKey] === "premium" ? "premium" : "free";
    return (
      <span className={`ent-badge ${tier === "premium" ? "badge-premium" : "badge-free"}`}>
        {tier === "premium" ? "Premium" : "Free"}
      </span>
    );
  };

  // 🔸 fundal gradient pe coloană (variabile din globals.css)
  const columnBgForIndex = (i) => {
    switch (i) {
      case 0:
        return { background: "linear-gradient(to bottom, var(--aa-sl-header-start), var(--aa-sl-header-end))" };
      case 1:
        return { background: "linear-gradient(to bottom, var(--aa-hl-header-start), var(--aa-hl-header-end))" };
      case 2:
        return { background: "linear-gradient(to bottom, var(--ai-sl-header-start), var(--ai-sl-header-end))" };
      case 3:
      default:
        return { background: "linear-gradient(to bottom, var(--ai-hl-header-start), var(--ai-hl-header-end))" };
    }
  };

 const renderMegaMenu = (cols, audience) => (
  <div
    className="header-mega"
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, minmax(160px, 1fr))",
      gap: "24px",
      padding: "12px 24px",
      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    }}
  >

      {cols.map((col, idx) => (
        <div
          key={col.head}
          style={{
            ...columnBgForIndex(idx),
            borderRadius: "12px",
            border: "1px solid rgba(209,213,219,0.6)",
            padding: "12px",
          }}
        >
          <div style={{ marginBottom: 8 }}>{renderBadge(audience, col.key)}</div>
          <Link
            href={hrefFor(col.key, null, audience)}
            className="mega-head"
            onClick={handleNavigate}
            prefetch={false}
            style={{ color: "#0f172a", fontWeight: 500 }} // ⬅️ fără textDecoration aici
          >
            {col.head}
          </Link>
          <ul style={{ listStyle: "none", margin: "10px 0 0 0", padding: 0 }}>
            {col.items.map((txt) => (
              <li key={txt} style={{ margin: "6px 0" }}>
                <Link
                  href={hrefFor(col.key, txt, audience)}
                  className="mega-item"
                  onClick={handleNavigate}
                  prefetch={false}
                  style={{ color: "#0f172a" }} // ⬅️ fără textDecoration aici
                >
                  {txt}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <style jsx>{`
        .mega-head,
        .mega-item {
          text-decoration: none;
          font-weight: 400;
        }
        .mega-head:hover,
        .mega-item:hover {
          text-decoration: underline; /* ✅ subliniere la hover */
        }
      `}</style>
    </div>
  );

  useEffect(() => {
    if (showMobile) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = prev);
    }
  }, [showMobile]);

  return (
    <header
      className="fixed-top bg-white border-bottom shadow-sm"
      style={{ zIndex: 2000, height: "var(--app-header-h)", boxSizing: "border-box" }}
    >
      <div
        className="container d-flex align-items-center justify-content-between position-relative"
        style={{ height: "100%" }}
      >
        {/* Logo + Brand */}
        <div className="d-flex align-items-center" style={{ minWidth: "200px" }}>
          <Link href="/" className="d-flex align-items-center" style={{ textDecoration: "none" }} prefetch={false}>
            <img src="/logo.png" alt="Logo" height="35" />
          </Link>
          <Link
            href="/"
            className="brandmark-link d-none d-lg-inline-flex"
            style={{ textDecoration: "none", marginLeft: "6px" }}
            prefetch={false}
          >
            <LogoBrand sizeRem={1.6} underline innerGap={2} wordGap={0} />
          </Link>
        </div>

        {/* Navigation (desktop) */}
        <nav
          className="d-none d-lg-flex align-items-center position-absolute start-50 translate-middle-x"
          style={{ gap: 28 }}
        >
          {menus.map((menu) => (
            <div key={menu} className="position-relative">
              <button
                ref={(el) => (buttonRefs.current[menu] = el)}
                className={`btn text-dark px-3 py-1 d-flex align-items-center ${
                  openDropdown === menu ? "bg-light border rounded-pill" : ""
                }`}
                onClick={() => toggleDropdown(menu)}
                style={{ border: "none", fontWeight: 600 }}
                aria-haspopup="true"
                aria-expanded={openDropdown === menu}
              >
                {menu} {openDropdown === menu ? <IoChevronUp size={14} /> : <IoChevronDown size={14} />}
              </button>
            </div>
          ))}
        </nav>

        {/* Right side */}
        <div className="d-flex align-items-center gap-3">
          {!user ? (
            <Link
              href="/membership"
              className="btn btn-danger rounded-pill px-3 py-1 d-none d-lg-inline-block"
              style={{ fontSize: ".85rem", fontWeight: 500 }}
              prefetch={false}
            >
              <span className="d-none d-xl-inline">Get full access</span>
              <span className="d-inline d-xl-none">Go premium</span>
            </Link>
          ) : (
            <Link
              href="/membership"
              className="btn btn-danger rounded-pill px-3 py-1 d-none d-lg-inline-block"
              style={{ fontSize: ".85rem", fontWeight: 500 }}
              prefetch={false}
            >
              Premium
            </Link>
          )}

          <div
            ref={(el) => (buttonRefs.current["user"] = el)}
            className={`p-1 d-none d-lg-block ${openDropdown === "user" ? "bg-light border rounded-pill" : ""}`}
            style={{ cursor: "pointer" }}
            onClick={toggleUserDropdown}
            aria-haspopup="true"
            aria-expanded={openDropdown === "user"}
          >
            {!user ? (
              <FaUserCircle size={32} className="text-dark" />
            ) : (
              <span className="fw-normal text-dark">
                <span style={{ color: "#d61919", fontWeight: 600 }}>{firstName}</span>{" "}
                <IoChevronDown size={14} style={{ verticalAlign: "middle" }} />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Dropdowns */}
      {openDropdown && (
        <div
          className="dropdown-animation bg-white shadow rounded p-2 d-none d-lg-block"
          style={{
            position: "fixed",
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            transform: dropdownAlign === "right" ? "translateX(-100%)" : "translateX(-50%)",
            zIndex: 4000,
            minWidth: openDropdown === "Students" || openDropdown === "Teachers" ? "820px" : "150px",
            maxWidth: "min(94vw, 1060px)",
          }}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <div
            aria-hidden="true"
            style={{ position: "absolute", top: -8, left: 0, right: 0, height: 8, background: "transparent" }}
          />
          {openDropdown === "user"
            ? !user
              ? (
                <>
                  <Link href="/login" className="custom-dropdown-link">Login</Link>
                  <Link href="/register" className="custom-dropdown-link">Register</Link>
                </>
              )
              : (
                <>
                  <Link href="/account" className="custom-dropdown-link">Account</Link>
                  <button
                    onClick={logout}
                    className="custom-dropdown-link text-danger"
                    style={{ border: "none", background: "transparent" }}
                  >
                    Logout
                  </button>
                </>
              )
            : openDropdown === "Students"
            ? renderMegaMenu(studentsCols, "student")
            : openDropdown === "Teachers"
            ? renderMegaMenu(educatorsCols, "educator")
            : null}
        </div>
      )}
    </header>
  );
}
