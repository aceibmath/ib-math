// src/data/flashcards/ai-sl/registry.js

// Topic 1: Number & Algebra
import numberSkills from "./number-algebra/number-skills-ai-sl.js";          
import sequencesAndSeries from "./number-algebra/sequences-series-ai-sl.js";

// Topic 2: Functions
import linearEquations from "./functions/linear-equations-ai-sl.js"; 
import propertiesOfFunctions from "./functions/properties-of-functions-ai-sl.js"; 

// Topic 3: Geometry & Trigonometry
import trigonometry from "./geometry-trigonometry/trigonometry-ai-sl.js";
import voronoiDiagrams from "./geometry-trigonometry/voronoi-diagrams-ai-sl.js";

// Topic 4: Statistics & Probability
import univariateStatistics from "./statistics-probability/univariate-statistics-ai-sl.js"; // redenumit din statistics
import bivariateStatistics from "./statistics-probability/bivariate-statistics-ai-sl.js";   // nou
import probability from "./statistics-probability/probability-ai-sl.js";
import distributions from "./statistics-probability/distributions-ai-sl.js";               // nou

// Topic 5: Calculus
import differentiation from "./calculus/differentiation-ai-sl.js";
import integration from "./calculus/integration-ai-sl.js";

export const REGISTRY = {
  "Number & Algebra": {
    "Number Skills": numberSkills,
    "Sequences & Series": sequencesAndSeries,
  },

  "Functions": {
    "Linear Equations": linearEquations,
    "Properties of Functions": propertiesOfFunctions,
  },

  "Geometry & Trigonometry": {
    "Trigonometry": trigonometry,
    "Voronoi Diagrams": voronoiDiagrams,
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

export function getDatasetFor(topic, subtopic) {
  const ds = REGISTRY?.[topic]?.[subtopic];
  if (!ds) return [];
  if (Array.isArray(ds)) return ds;
  if (ds && Array.isArray(ds.questions)) return ds.questions;
  return [];
}
