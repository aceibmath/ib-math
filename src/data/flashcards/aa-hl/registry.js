/* src/data/flashcards/aa-hl/registry.js */

/* ---------- Topic 1: Number & Algebra ---------- */
import sequencesAndSeries from "./number-algebra/sequences-series-aa-hl.js";
import binomialTheorem from "./number-algebra/binomial-theorem-aa-hl.js";
import countingPrinciples from "./number-algebra/counting-principles-aa-hl.js";
import complexNumbers from "./number-algebra/complex-numbers-aa-hl.js";

/* ---------- Topic 2: Functions ---------- */
import propertiesoffunctions from "./functions/properties-of-functions-aa-hl.js";
import quadratics from "./functions/quadratics-aa-hl.js";
import rationalFunctions from "./functions/rational-functions-aa-hl.js";
import transformations from "./functions/transformations-aa-hl.js";

/* ---------- Topic 3: Geometry & Trigonometry ---------- */
import geometryShapes from "./geometry-trigonometry/geometry-shapes-aa-hl.js";
import trigonometricFunctions from "./geometry-trigonometry/trigonometric-functions-aa-hl.js";
import vectors from "./geometry-trigonometry/vectors-aa-hl.js";

/* ---------- Topic 4: Statistics & Probability ---------- */
import statistics from "./statistics-probability/statistics-aa-hl.js";
import probability from "./statistics-probability/probability-aa-hl.js";
import distributions from "./statistics-probability/distributions-aa-hl.js";

/* ---------- Topic 5: Calculus ---------- */
import differentiation from "./calculus/differentiation-aa-hl.js";
import integration from "./calculus/integration-aa-hl.js";

import differentialEquations from "./calculus/differential-equations-aa-hl.js";
import maclaurinSeries from "./calculus/maclaurin-series-aa-hl.js";


export const REGISTRY = {
  "Number & Algebra": {
    "Sequences & Series": sequencesAndSeries,
   
    "Binomial Theorem": binomialTheorem,
    "Counting Principles": countingPrinciples,
    "Complex Numbers": complexNumbers,
  },

  "Functions": {
    // redenumit: Introducing → Properties
    "Properties of Functions": propertiesoffunctions,
    "Quadratics": quadratics,
    "Rational Functions": rationalFunctions,
    "Transformations": transformations,
  },

  "Geometry & Trigonometry": {
    "Geometry & Shapes": geometryShapes,
    "Trigonometric Functions": trigonometricFunctions,
    "Vectors": vectors,
  },

  "Statistics & Probability": {
    "Statistics": statistics,
    "Probability": probability,
    "Distributions": distributions,
  },

  "Calculus": {
    "Differentiation": differentiation,
    "Integration": integration,
    "Differential Equations": differentialEquations,
    "Maclaurin Series": maclaurinSeries,
    // "Kinematics": kinematics,           // removed
    // "L'Hôpital's rule": lhopitalsRule, // removed
  },
};

/** întoarce lista de întrebări pentru (topic, subtopic).
 *  acceptă fie array direct [], fie { questions: [] }
 */
export function getDatasetFor(topic, subtopic) {
  const ds = REGISTRY?.[topic]?.[subtopic];
  if (!ds) return [];
  if (Array.isArray(ds)) return ds;
  if (ds && Array.isArray(ds.questions)) return ds.questions;
  return [];
}
