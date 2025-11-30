// src/lib/products.js
// 🔁 LEGACY (compat): rămâne exportat ca să nu rupem importurile vechi.
// Nu mai folosim maparea PriceID → productKey; trecem pe lookup keys (ex: "aa_sl_12m").
export const PRICE_TO_PRODUCT = {};

/**
 * Noul model: lucrăm cu "base" + durată (luni) → lookupKey.
 * Exemplu: base="aa_sl", months=12  => lookupKey="aa_sl_12m"
 */

export const PRODUCT_BASES_STUDENT = [
  "aa_sl",
  "aa_hl",
  "ai_sl",
  "ai_hl",
  "suite",
];

export const PRODUCT_BASES_TEACHER = [
  "teacher_aa_sl",
  "teacher_aa_hl",
  "teacher_ai_sl",
  "teacher_ai_hl",
  "teacher_suite",
];

export const ALL_PRODUCT_BASES = [
  ...PRODUCT_BASES_STUDENT,
  ...PRODUCT_BASES_TEACHER,
];

// Etichete UI (poți ajusta liber textul din titluri)
export const PRODUCT_LABELS = {
  // Student
  aa_sl: "IB Math A&A SL — Premium",
  aa_hl: "IB Math A&A HL — Premium",
  ai_sl: "IB Math A&I SL — Premium",
  ai_hl: "IB Math A&I HL — Premium",
  suite: "Complete Learning Suite — Premium",

  // Teacher Pro
  teacher_aa_sl: "Teacher Pro — A&A SL",
  teacher_aa_hl: "Teacher Pro — A&A HL",
  teacher_ai_sl: "Teacher Pro — A&I SL",
  teacher_ai_hl: "Teacher Pro — A&I HL",
  teacher_suite: "Teacher Pro — Complete Learning Suite",
};

// Durate suportate în UI (luni → sufix lookup)
export const DURATION_SUFFIX = { 1: "1m", 3: "3m", 6: "6m", 12: "12m" };

/** Construiește lookupKey din base + months (ex: "aa_sl", 3) → "aa_sl_3m" */
export function buildLookupKey(base, months) {
  const suffix = DURATION_SUFFIX[months];
  if (!base || !suffix) {
    throw new Error(`Invalid lookup build: base="${base}", months="${months}"`);
  }
  return `${base}_${suffix}`;
}

/** Extrage { base, months } dintr-un lookupKey (ex: "teacher_ai_hl_6m") */
export function parseLookupKey(lookupKey) {
  if (typeof lookupKey !== "string") return { base: null, months: null };
  const m = lookupKey.match(/^(?<base>[a-z_]+)_(?<num>\d+)m$/i);
  if (!m?.groups) return { base: null, months: null };
  const base = m.groups.base;
  const months = Number(m.groups.num);
  return { base, months: Number.isFinite(months) ? months : null };
}

/** Heuristici simple pentru UI/filtering */
export function isTeacherBase(base) {
  return typeof base === "string" && base.startsWith("teacher_");
}
export function isStudentBase(base) {
  return typeof base === "string" && !isTeacherBase(base);
}

/**
 * (Optional) Fallback local pentru courseKeys, DOAR dacă lipsește metadata în Stripe.
 * Recomandat: să ne bazăm pe product.metadata.course_keys din Stripe.
 * Lasăm comentat ca exemplu; activează/ajustează doar dacă ai nevoie local.
 */
// export const COURSE_KEYS_FALLBACK = {
//   aa_sl: ["AA_SL"],
//   aa_hl: ["AA_HL"],
//   ai_sl: ["AI_SL"],
//   ai_hl: ["AI_HL"],
//   suite: ["AA_SL", "AA_HL", "AI_SL", "AI_HL"],
//   teacher_aa_sl: ["AA_SL"],
//   teacher_aa_hl: ["AA_HL"],
//   teacher_ai_sl: ["AI_SL"],
//   teacher_ai_hl: ["AI_HL"],
//   teacher_suite: ["AA_SL", "AA_HL", "AI_SL", "AI_HL"],
// };
