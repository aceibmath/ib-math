// src/app/(content)/AA_HL/page.js
export const metadata = { title: "AA HL | AceIBMath" };

import CourseTitleCardAAHL from "@/components/course-titles/CourseTitleCard-aa-hl";
import styles from "./page.module.css";

export default function Page({ searchParams }) {
  // aud=student | aud=teacher (default: student)
  const audience =
    (searchParams?.aud || "").toLowerCase() === "teacher" ? "teacher" : "student";

  // helper: atașează ?aud=... tuturor link-urilor din grilă
  const withAud = (path) => `${path}?aud=${audience}`;

  // Tag unic (roșu) per audiență
  const Tag = () => (
    <div className={styles.tags}>
      <span className={styles.tag}>
        {audience === "teacher" ? "#Teachers" : "#Students"}
      </span>
    </div>
  );

  // Definim cardurile; marcăm cele doar pentru profesori
  const cards = [
    { href: withAud("/AA_HL/questionbank"), title: "Questionbank", teachersOnly: false,
      icon: (
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" focusable="false">
          <rect x="3" y="3" width="7" height="7" rx="2"></rect>
          <rect x="14" y="3" width="7" height="7" rx="2"></rect>
          <rect x="3" y="14" width="7" height="7" rx="2"></rect>
          <path d="M15 18l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      ),
    },
    { href: withAud("/AA_HL/past-papers"), title: "Past Papers", teachersOnly: false,
      icon: (
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" focusable="false">
          <path d="M8 3h5l5 5v13a1 1 0 0 1-1 1H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path>
          <path d="M13 3v6h6"></path>
          <path d="M9 13h6M9 17h6"></path>
        </svg>
      ),
    },
    { href: withAud("/AA_HL/teacher-lessons"), title: "Teacher\nLessons", teachersOnly: true,
      icon: (
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" focusable="false">
          <rect x="3" y="4" width="18" height="12" rx="2"></rect>
          <path d="M8 20h8M12 16v4"></path>
        </svg>
      ),
    },
    { href: withAud("/AA_HL/prediction-exams"), title: "Prediction\nExams", teachersOnly: false,
      icon: (
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" focusable="false">
          <path d="M3 20h18"></path>
          <path d="M5 16l4-4 3 3 6-6"></path>
        </svg>
      ),
    },
    { href: withAud("/AA_HL/flashcards"), title: "Flashcards", teachersOnly: false,
      icon: (
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" focusable="false">
          <path d="M13 3L4 14h6l-1 7 9-11h-6l1-7z" strokeLinejoin="round"></path>
        </svg>
      ),
    },
    { href: withAud("/AA_HL/assessments"), title: "Assessments", teachersOnly: true,
      icon: (
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" focusable="false">
          <rect x="4" y="4" width="16" height="16" rx="3"></rect>
          <path d="M8 12l3 3 5-6" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      ),
    },
  ];

  const visibleCards =
    audience === "teacher" ? cards : cards.filter((c) => !c.teachersOnly);

  return (
    <div className={`course-theme-aa-hl ${styles.pageBg}`}>
      {/* HERO / TITLE CARD */}
      <div className={`mx-auto max-w-[1280px] px-4 md:px-6 ${styles.headerPad}`}>
        <div className={styles.hero}>
          <CourseTitleCardAAHL />
        </div>
      </div>

      {/* CARD GRID */}
      <div className={`${styles.wrap1200} ${styles.rows} ${styles.bottomPad}`}>
        {visibleCards.map(({ href, title, icon }) => (
          <a
            key={href}
            className={styles.card}
            href={href}
            aria-label={`Open ${title.replace("\n", " ")} for AA HL`}
          >
            <div className={styles.cardInner}>
              <div className={styles.top}>
                <div className={styles.badge}>{icon}</div>
                <Tag />
              </div>
              <h2 className={styles.title}>{title}</h2>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
