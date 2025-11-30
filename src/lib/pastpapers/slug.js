// parsează "aa-sl-2024-may-tz1-p1" -> obiect util + titluri
export function parsePaperSlug(slug) {
  const parts = slug.split("-");
  const isSpecimen = parts.includes("specimen");
  const family = parts.slice(0, 2).join("-"); // "aa-sl", "ai-hl", etc.

  let year = null, session = null, tz = null, paper = null;
  if (isSpecimen) {
    session = "Specimen"; year = null; tz = "TZ0";
    paper = Number(parts[parts.length - 1].replace("p", ""));
  } else {
    year = Number(parts[2]);
    session = parts[3] === "may" ? "May" : "November";
    tz = parts[4].toUpperCase();
    paper = Number(parts[5].replace("p", ""));
  }

  const courseMap = {
    "aa-sl": "AA SL", "aa-hl": "AA HL",
    "ai-sl": "AI SL", "ai-hl": "AI HL",
    "math-sl": "Math SL", "math-hl": "Math HL", "math-studies": "Math Studies",
  };

  return {
    slug, family, course: courseMap[family] || family.toUpperCase(),
    year, session, tz, paper,
    title: isSpecimen ? `Specimen ${tz} · Paper ${paper}` : `${year} ${session} ${tz} · Paper ${paper}`,
  };
}
