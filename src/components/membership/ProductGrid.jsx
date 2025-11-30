// src/components/membership/ProductGrid.jsx
"use client";

import ProductCard from "./ProductCard";

export default function ProductGrid({
  duration = 12,           // 1 | 3 | 6 | 12
  busy = false,
  onCheckout = () => {},   // (base: string) => void
  studentProducts,         // optional override: [{ id, base, title, bundle? }, ...]
  teacherProducts,         // optional override: [{ id, base, title, bundle? }, ...]
  studentFeatures,         // optional override: string[]
  teacherFeatures,         // optional override: string[]
}) {
  const DEFAULT_STUDENT = [
    { id: "aa_sl",    base: "aa_sl",    title: "IB Math A&A SL — Premium" },
    { id: "aa_hl",    base: "aa_hl",    title: "IB Math A&A HL — Premium" },
    { id: "ai_sl",    base: "ai_sl",    title: "IB Math A&I SL — Premium" },
    { id: "ai_hl",    base: "ai_hl",    title: "IB Math A&I HL — Premium" },
    { id: "suite",    base: "suite",    title: "Complete Learning Suite — Premium", bundle: true },
  ];

  const DEFAULT_TEACHER = [
    { id: "teacher_aa_sl", base: "teacher_aa_sl", title: "Teacher Pro — A&A SL" },
    { id: "teacher_aa_hl", base: "teacher_aa_hl", title: "Teacher Pro — A&A HL" },
    { id: "teacher_ai_sl", base: "teacher_ai_sl", title: "Teacher Pro — A&I SL" },
    { id: "teacher_ai_hl", base: "teacher_ai_hl", title: "Teacher Pro — A&I HL" },
    { id: "teacher_suite", base: "teacher_suite", title: "Teacher Pro — Complete Learning Suite", bundle: true },
  ];

  const students = Array.isArray(studentProducts) && studentProducts.length
    ? studentProducts
    : DEFAULT_STUDENT;

  const teachers = Array.isArray(teacherProducts) && teacherProducts.length
    ? teacherProducts
    : DEFAULT_TEACHER;

  return (
    <>
      {/* Row 1: Students (5) */}
      <div className="membership-grid">
        {students.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            teacher={false}
            duration={duration}
            busy={busy}
            onCheckout={onCheckout}
            features={studentFeatures}
          />
        ))}
      </div>

      {/* Row 2: Teacher Pro (5) */}
      <div className="membership-grid">
        {teachers.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            teacher
            duration={duration}
            busy={busy}
            onCheckout={onCheckout}
            features={teacherFeatures}
          />
        ))}
      </div>
    </>
  );
}
