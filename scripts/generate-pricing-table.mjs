#!/usr/bin/env node
/**
 * Generate a full pricing table (months 1..24) for all products,
 * using piecewise-linear interpolation between the anchors at 1, 12, 24 months.
 *
 * Output: public/pricing-table.json
 *
 * NOTE:
 * - Valorile de la ancore (1, 12, 24) sunt în EUR (brut). Le poți ajusta mai jos.
 * - Calculul se face în cenți pentru acuratețe, apoi se scrie JSON-ul final.
 */

import fs from "node:fs";
import path from "node:path";

/** === CONFIG: ancorele per produs (EUR, total) ===
 *  Single Student:  1→29,  12→99,  24→149
 *  Suite Student:   1→59,  12→199, 24→299
 *  Single Teacher:  1→129, 12→199, 24→249
 *  Suite Teacher:   1→159, 12→299, 24→399
 */
const ANCHORS_EUR = {
  aa_sl:            { 1: 29,  12:  99, 24: 149 },
  aa_hl:            { 1: 29,  12:  99, 24: 149 },
  ai_sl:            { 1: 29,  12:  99, 24: 149 },
  ai_hl:            { 1: 29,  12:  99, 24: 149 },
  suite:            { 1: 59,  12: 199, 24: 299 },

  teacher_aa_sl:    { 1: 129, 12: 199, 24: 249 },
  teacher_aa_hl:    { 1: 129, 12: 199, 24: 249 },
  teacher_ai_sl:    { 1: 129, 12: 199, 24: 249 },
  teacher_ai_hl:    { 1: 129, 12: 199, 24: 249 },
  teacher_suite:    { 1: 159, 12: 299, 24: 399 },
};

const CURRENCY = "eur";

/** Interpolare liniară între (m1, v1) și (m2, v2) */
function lerp(m, m1, v1, m2, v2) {
  return v1 + (v2 - v1) * ((m - m1) / (m2 - m1));
}

/** Construiește rândurile 1..24 pentru un produs, întorcând cenți (int) */
function buildRowsCents(anchor) {
  const p1  = Math.round(anchor[1]  * 100);
  const p12 = Math.round(anchor[12] * 100);
  const p24 = Math.round(anchor[24] * 100);

  const rows = {};
  for (let m = 1; m <= 24; m += 1) {
    let totalCents;
    if (m <= 12) {
      totalCents = Math.round(lerp(m, 1, p1, 12, p12));
    } else {
      totalCents = Math.round(lerp(m, 12, p12, 24, p24));
    }
    const perMonthCents = Math.round(totalCents / m);
    rows[String(m)] = {
      total_cents: totalCents,
      per_month_cents: perMonthCents,
    };
  }
  return rows;
}

/** Construcția întregului tabel */
function buildTable() {
  const prices = {};
  Object.entries(ANCHORS_EUR).forEach(([base, anchor]) => {
    prices[base] = buildRowsCents(anchor);
  });

  const out = {
    meta: {
      currency: CURRENCY,
      generated_at: new Date().toISOString(),
      formula: "piecewise_linear",
      anchors_months: [1, 12, 24],
      notes:
        "Totals rounded to nearest cent; per_month_cents = total_cents / months (rounded).",
    },
    prices,
  };
  return out;
}

function main() {
  const table = buildTable();
  const outDir = path.join(process.cwd(), "public");
  const outPath = path.join(outDir, "pricing-table.json");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(table, null, 2), "utf8");
  console.log(`✔ pricing-table.json written to ${outPath}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
