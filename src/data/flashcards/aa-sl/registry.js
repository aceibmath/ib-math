// src/data/flashcards/aa-sl/registry.js

// === Number & Algebra
import sequencesSeries from "./number-algebra/sequences-series-aa-sl.js";
import binomialTheorem from "./number-algebra/binomial-theorem-aa-sl.js";

// === Functions
import propertiesoffunctions from "./functions/properties-of-functions-aa-sl.js";
import quadratics from "./functions/quadratics-aa-sl.js";
import rationalFunctions from "./functions/rational-functions-aa-sl.js";
import transformations from "./functions/transformations-aa-sl.js"; 

// === Geometry & Trigonometry
import geometryShapes from "./geometry-trigonometry/geometry-shapes-aa-sl.js";
import trigonometricFunctions from "./geometry-trigonometry/trigonometric-functions-aa-sl.js";

// === Statistics & Probability
import statistics from "./statistics-probability/statistics-aa-sl.js";
import probability from "./statistics-probability/probability-aa-sl.js";
import distributions from "./statistics-probability/distributions-aa-sl.js";

// === Calculus
import differentiation from "./calculus/differentiation-aa-sl.js";
import integration from "./calculus/integration-aa-sl.js";
import kinematics from "./calculus/kinematics-aa-sl.js";

export const REGISTRY = {
  "Number & Algebra": {
    "Sequences & Series": sequencesSeries,
    "Binomial Theorem": binomialTheorem,
  },

  "Functions": {
    "Properties of Functions": propertiesoffunctions,
    "Quadratics": quadratics,
    "Rational Functions": rationalFunctions,
    "Transformations": transformations,              // nou adăugat
  },

  "Geometry & Trigonometry": {
    "Geometry & Shapes": geometryShapes,
    "Trigonometric Functions": trigonometricFunctions,
  },

  "Statistics & Probability": {
    "Statistics": statistics,
    "Probability": probability,
    "Distributions": distributions,
  },

  "Calculus": {
    "Differentiation": differentiation,
    "Integration": integration,
    "Kinematics": kinematics,
  },
};

/**
 * Returnează array-ul de întrebări pentru (topic, subtopic).
 * Acceptă atât formatul `[]` (array direct), cât și `{ questions: [] }`.
 */
export function getDatasetFor(topic, subtopic) {
  const ds = REGISTRY?.[topic]?.[subtopic];
  if (!ds) return [];
  if (Array.isArray(ds)) return ds;
  if (ds && Array.isArray(ds.questions)) return ds.questions;
  return [];
}
