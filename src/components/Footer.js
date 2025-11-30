// src/components/Footer.jsx
"use client";

import { useEffect, useRef } from "react";

export default function Footer() {
  const ref = useRef(null);

  // Actualizează --footer-h cu înălțimea reală a footerului
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const setH = () => {
      const h = el.offsetHeight || 0;
      document.documentElement.style.setProperty("--footer-h", `${h}px`);
    };

    setH();
    const ro = "ResizeObserver" in window ? new ResizeObserver(setH) : null;
    ro?.observe?.(el);

    window.addEventListener("resize", setH);
    return () => {
      window.removeEventListener("resize", setH);
      ro?.disconnect?.();
    };
  }, []);

  return (
    <footer ref={ref} className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Coloana 1 (8 produse) */}
          <ul className="footer-list">
            <li>AA SL Students</li>
            <li>AA HL Students</li>
            <li>AI SL Students</li>
            <li>AI HL Students</li>
            <li>AA SL Teachers PRO</li>
            <li>AA HL Teachers PRO</li>
            <li>AI SL Teachers PRO</li>
            <li>AI HL Teachers PRO</li>
          </ul>

          {/* Coloana 2 (6 produse) */}
          <ul className="footer-list">
            <li>About</li>
            <li>Premium</li>
            <li>Pricing</li>
            <li>FAQs</li>
            <li>Privacy Policy</li>
            <li>Terms &amp; Conditions</li>
          </ul>

          {/* Coloana 3 (4 produse) */}
          <ul className="footer-list">
            <li>Youtube</li>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>TikTok</li>
          </ul>

          {/* Coloana 4 (1 produs) */}
          <ul className="footer-list">
            <li>Contact Us</li>
          </ul>
        </div>

        <hr className="footer-sep" />

        <div className="footer-brand">
          {/* Dacă ai o versiune cu fundal transparent (preferabil SVG), o poți folosi aici */}
          <img src="/logo-email.png" alt="AceIBMath logo" />
          <div className="copyright">Copyright - aceibmath 2025</div>
        </div>
      </div>

      {/* Fallback pt. --footer-gap (folosit în layout) */}
      <style jsx global>{`
        :root {
          --footer-gap: 24px;
        }
      `}</style>

      <style jsx>{`
        .site-footer {
          background: #f4f6f7;
          padding: 32px 0 24px;
          color: #1f2937;
        }

        /* Grilă centrată și mai „strânsă” între coloane */
        .footer-grid {
          display: grid;
          /* Lățimi fixe pentru coloană (arată „aliniat”) dar responsive */
          grid-template-columns: repeat(4, 240px);
          justify-content: center; /* <- centrează întregul bloc de coloane */
          column-gap: 36px; /* mai apropiate între ele */
          row-gap: 8px;
          max-width: 1100px; /* limitează lățimea blocului pentru a sta frumos în centru */
          margin: 0 auto;
        }

        .footer-list {
          list-style: none;
          padding: 0;
          margin: 0;
          font-size: 20px;
          line-height: 1.6;
        }
        .footer-list li {
          margin: 8px 0;
          color: #1f2937;
        }

        .footer-sep {
          border: 0;
          border-top: 1px solid #c9d1d7; /* puțin mai închis decât fundalul */
          margin: 24px 0 16px;
        }

        .footer-brand {
          text-align: center;
        }
        .footer-brand img {
          width: 48px;
          height: 48px;
          object-fit: contain;
          display: inline-block;
          margin-bottom: 8px;
        }
        .copyright {
          font-size: 16px;
          color: #374151;
        }

        /* Breakpoints pentru responsive */
        @media (max-width: 1200px) {
          .footer-grid {
            grid-template-columns: repeat(4, 220px);
            column-gap: 28px;
          }
        }
        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            column-gap: 24px;
            max-width: 680px;
          }
        }
        @media (max-width: 576px) {
          .footer-grid {
            grid-template-columns: 1fr;
            max-width: 420px;
            column-gap: 0;
          }
          .footer-list {
            margin-bottom: 8px;
          }
        }
      `}</style>
    </footer>
  );
}
