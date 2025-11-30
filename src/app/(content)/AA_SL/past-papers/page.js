// server component
export const metadata = {
  title: "AA SL Past Papers",
};

import PageHeader from "@/components/ui/PageHeader";
import PastPapersTitleCard from "@/components/pastpapers/PastPapersTitleCard";
import PastPapersClient from "./PastPapersClient";
import { INDEX as AA_SL_INDEX } from "@/data/past-papers/aa-sl/index.js";
import { INDEX as MATH_SL_OLD_INDEX } from "@/data/past-papers/old/math-sl/index.js";

/* ---------- helperi ca să scoatem anii corect, indiferent de format ---------- */
function uniq(nums) { return [...new Set(nums)]; }
function fromString(s) { const m = String(s).match(/\b(20\d{2})\b/); return m ? Number(m[1]) : null; }
function extractYears(idx) {
  if (!idx) return [];
  if (Array.isArray(idx)) {
    const arr = idx.flatMap((v) => {
      if (typeof v === "number") return [v];
      if (typeof v === "string") { const y = fromString(v); return y ? [y] : []; }
      if (v && typeof v === "object" && "year" in v) {
        const y = Number(v.year); return Number.isFinite(y) ? [y] : [];
      }
      if (v && typeof v === "object") {
        return Object.keys(v).map((k) => Number(k)).filter((n) => Number.isFinite(n));
      }
      return [];
    });
    return uniq(arr).filter((n) => n > 1900 && n < 2100).sort((a, b) => b - a);
  }
  if (typeof idx === "object") {
    const keys = Object.keys(idx);
    const kYears = keys.map((k) => Number(k)).filter((n) => Number.isFinite(n) && n > 1900 && n < 2100);
    if (kYears.length) return kYears.sort((a, b) => b - a);
    const sYears = keys.map(fromString).filter(Boolean);
    return uniq(sYears).sort((a, b) => b - a);
  }
  return [];
}
function rangeDesc(from, to) { const out = []; for (let y = from; y >= to; y--) out.push(y); return out; }

export default function Page() {
  const yearsNew =
    extractYears(AA_SL_INDEX).filter((y) => y >= 2021) || rangeDesc(2025, 2021);
  const finalYearsNew =
    yearsNew.length > 0 ? yearsNew.sort((a, b) => b - a) : rangeDesc(2025, 2021);

  const yearsOld =
    extractYears(MATH_SL_OLD_INDEX).filter((y) => y <= 2020 && y >= 2014) || rangeDesc(2020, 2014);
  const finalYearsOld =
    yearsOld.length > 0 ? yearsOld.sort((a, b) => b - a) : rangeDesc(2020, 2014);

  return (
    <PageHeader>
      <PastPapersTitleCard course="AA SL" theme="aa-sl" />


      {/* Card probleme */}
      <section>
        <PastPapersClient yearsNew={finalYearsNew} yearsOld={finalYearsOld} />
      </section>
    </PageHeader>
  );
}
