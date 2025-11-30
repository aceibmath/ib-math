// src/data/flashcards/ai-hl/registry.js

/* ---------- Topic 1: Number & Algebra ---------- */
import numberSkills from "./number-algebra/number-skills-ai-hl.js";
import sequencesAndSeries from "./number-algebra/sequences-series-ai-hl.js";
import complexNumbers from "./number-algebra/complex-numbers-ai-hl.js";

/* ---------- Topic 2: Functions ---------- */
import linearEquations from "./functions/linear-equations-ai-hl.js";
import propertiesOfFunctions from "./functions/properties-of-functions-ai-hl.js";
import transformations from "./functions/transformations-ai-hl.js";

/* ---------- Topic 3: Geometry & Trigonometry ---------- */
import trigonometry from "./geometry-trigonometry/trigonometry-ai-hl.js";
import voronoiDiagrams from "./geometry-trigonometry/voronoi-diagrams-ai-hl.js";
import trigonometricFunctions from "./geometry-trigonometry/trigonometric-functions-ai-hl.js";
import vectors from "./geometry-trigonometry/vectors-ai-hl.js";

/* ---------- Topic 4: Statistics & Probability ---------- */
import univariateStatistics from "./statistics-probability/univariate-statistics-ai-hl.js";
import bivariateStatistics from "./statistics-probability/bivariate-statistics-ai-hl.js";
import probability from "./statistics-probability/probability-ai-hl.js";
import distributions from "./statistics-probability/distributions-ai-hl.js";

/* ---------- Topic 5: Calculus ---------- */
import differentiation from "./calculus/differentiation-ai-hl.js";
import integration from "./calculus/integration-ai-hl.js";

export const REGISTRY = {
  "Number & Algebra": {
    "Number Skills": numberSkills,
    "Sequences & Series": sequencesAndSeries,
    "Complex Numbers": complexNumbers,
  },

  "Functions": {
    "Linear Equations": linearEquations,
    "Properties of Functions": propertiesOfFunctions,
    "Transformations": transformations,
  },

  "Geometry & Trigonometry": {
    "Trigonometry": trigonometry,
    "Voronoi Diagrams": voronoiDiagrams,
    "Trigonometric Functions": trigonometricFunctions,
    "Vectors": vectors,
  },

  "Statistics & Probability": {
    "Univariate Statistics": univariateStatistics,
    "Bivariate Statistics": bivariateStatistics,
    "Probability": probability,
    "Distributions": distributions,
  },

  "Calculus": {
    "Differentiation": differentiation,
    "Integration": integration,
  },
};

/**
 * Întoarce lista de întrebări pentru (topic, subtopic).
 * Acceptă atât export implicit [], cât și { questions: [] }.
 */
export function getDatasetFor(topic, subtopic) {
  const ds = REGISTRY?.[topic]?.[subtopic];
  if (!ds) return [];
  if (Array.isArray(ds)) return ds;
  if (ds && Array.isArray(ds.questions)) return ds.questions;
  return [];
}
