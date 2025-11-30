// AI SL — Teacher Lessons: topics + sections (SL only)
// Fiecare item din contentItems = 1 bullet din specificații.
// Formule LaTeX inline: \\( ... \\). 3 lecții placeholder / secțiune.

function lessons3(prefix) {
  return [
    { id: `${prefix}.1`, title: `Lesson ${prefix}.1` },
    { id: `${prefix}.2`, title: `Lesson ${prefix}.2` },
    { id: `${prefix}.3`, title: `Lesson ${prefix}.3` },
  ];
}

export const topics = [
  // ────────────────────────────────────────────────────────────────────────────
  // Topic 1 — Number & Algebra
  // ────────────────────────────────────────────────────────────────────────────
  {
    key: "number-and-algebra",
    ordinal: 1,
    label: "Number & Algebra",
    sections: [
      { id: "1.1", level: "SL", contentItems: [
        "Operations with numbers in the form \\( a\\times10^{k} \\) where \\( 1\\le a<10 \\) and \\( k \\) is an integer.",
      ], lessons: lessons3("1.1") },
      { id: "1.2", level: "SL", contentItems: [
        "Arithmetic sequences and series.",
        "Use of the formulae for the \\( n \\)th term and the sum of the first \\( n \\) terms of the sequence.",
        "Use of sigma notation for sums of arithmetic sequences.",
        "Applications of the skills above.",
        "Analysis, interpretation and prediction where a model is not perfectly arithmetic in real life.",
      ], lessons: lessons3("1.2") },
      { id: "1.3", level: "SL", contentItems: [
        "Geometric sequences and series.",
        "Use of the formulae for the \\( n \\)th term and the sum of the first \\( n \\) terms of the sequence.",
        "Use of sigma notation for the sums of geometric sequences.",
        "Applications.",
      ], lessons: lessons3("1.3") },
      { id: "1.4", level: "SL", contentItems: [
        "Compound interest.",
        "Simple modelling of growth and decay.",
        "Use of logarithms to solve exponential equations.",
      ], lessons: lessons3("1.4") },
      { id: "1.5", level: "SL", contentItems: [
        "Exponents.",
        "Laws of exponents.",
        "Logarithms as inverses of exponential functions.",
        "Change of base.",
      ], lessons: lessons3("1.5") },
      { id: "1.6", level: "SL", contentItems: [
        "Upper and lower bounds.",
        "Estimation.",
      ], lessons: lessons3("1.6") },
      { id: "1.7", level: "SL", contentItems: [
        "Amortization and annuities using technology.",
      ], lessons: lessons3("1.7") },
      { id: "1.8", level: "SL", contentItems: [
        "Use technology to solve systems of linear equations in up to 3 variables.",
        "Use technology to solve polynomial equations.",
      ], lessons: lessons3("1.8") },
    ],
  },

  // 
  // Topic 2  Functions
  // 
  {
    key: "functions",
    ordinal: 2,
    label: "Functions",
    sections: [
      { id: "2.1", level: "SL", contentItems: [
        "Different forms of the equation of a straight line.",
        "Gradient; intercepts.",
        "Lines with gradients \\(m_1\\) and \\(m_2\\).",
        "Parallel lines \\(m_1=m_2\\).",
        "Perpendicular lines \\(m_1\\times m_2=-1\\).",
      ], lessons: lessons3("2.1") },
      { id: "2.2", level: "SL", contentItems: [
        "Concept of function.",
        "Domain and range.",
        "Function notation.",
        "The graph of a function.",
        "Vertical line test.",
        "Composite functions \\((f\\circ g)(x)=f(g(x))\\).",
        "Inverse function \\(f^{-1}(x)\\).",
        "Use of technology to find inverse functions.",
      ], lessons: lessons3("2.2") },
      { id: "2.3", level: "SL", contentItems: [
        "Linear, quadratic, cubic, exponential, logarithmic, and absolute value functions.",
        "Graphs of these functions.",
        "Effect of transformations on graphs of functions: translations, reflections, stretches, and compressions.",
        "Recognition of common functions and their graphs.",
        "Identification of key features from a graph.",
      ], lessons: lessons3("2.3") },
      { id: "2.4", level: "SL", contentItems: [
        "Equations involving functions.",
        "Solving graphically and using technology.",
        "Intersection points of two functions.",
      ], lessons: lessons3("2.4") },
      { id: "2.5", level: "SL", contentItems: [
        "Modelling with linear, quadratic, exponential and power functions.",
        "Use of logarithms to determine parameters.",
        "Determination of parameters using regression.",
      ], lessons: lessons3("2.5") },
      { id: "2.6", level: "SL", contentItems: [
        "The concept of a mathematical model.",
        "The modelling process.",
        "Choosing an appropriate model.",
        "Using technology to determine the model.",
        "Validity and limitations of the model.",
      ], lessons: lessons3("2.6") },
    ],
  },

  // 
  // Topic 3  Geometry & Trigonometry
  // 
  {
    key: "geometry-and-trigonometry",
    ordinal: 3,
    label: "Geometry & Trigonometry",
    sections: [
      { id: "3.1", level: "SL", contentItems: [
        "Perimeter, area and volume.",
        "Pythagoras theorem.",
        "Similarity and congruence.",
        "Scale factors.",
      ], lessons: lessons3("3.1") },
      { id: "3.2", level: "SL", contentItems: [
        "Trigonometric ratios in right-angled triangles.",
        "Sine rule.",
        "Cosine rule.",
        "Area of a triangle \\(\\tfrac{1}{2}ab\\sin C\\).",
      ], lessons: lessons3("3.2") },
      { id: "3.3", level: "SL", contentItems: [
        "Equation of a circle.",
        "Intersection of a line and a circle.",
        "Tangents to circles.",
      ], lessons: lessons3("3.3") },
      { id: "3.4", level: "SL", contentItems: [
        "Vectors in two and three dimensions.",
        "Representation, magnitude and direction.",
        "Components.",
        "Scalar product.",
        "Vector product.",
      ], lessons: lessons3("3.4") },
      { id: "3.5", level: "SL", contentItems: [
        "Equations of lines in 2D and 3D.",
        "Angle between lines.",
        "Shortest distance.",
      ], lessons: lessons3("3.5") },
      { id: "3.6", level: "SL", contentItems: [
        "Bearings.",
        "Navigation problems.",
      ], lessons: lessons3("3.6") },
    ],
  },

  // 
  // Topic 4  Statistics & Probability
  // 
  {
    key: "statistics-and-probability",
    ordinal: 4,
    label: "Statistics & Probability",
    sections: [
      { id: "4.1", level: "SL", contentItems: [
        "Concepts of population, sample, random sample, discrete and continuous data.",
        "Reliability of data sources and bias in sampling.",
        "Interpretation of outliers.",
        "Sampling techniques and their effectiveness.",
      ], lessons: lessons3("4.1") },
      { id: "4.2", level: "SL", contentItems: [
        "Presentation of data: frequency distributions, histograms, cumulative frequency graphs.",
        "Median, quartiles, percentiles, range, interquartile range.",
        "Box and whisker diagrams.",
        "Comparison of distributions.",
      ], lessons: lessons3("4.2") },
      { id: "4.3", level: "SL", contentItems: [
        "Measures of central tendency (mean, median, mode).",
        "Estimation of mean from grouped data.",
        "Measures of dispersion (interquartile range, standard deviation, variance).",
        "Effect of constant changes on data.",
      ], lessons: lessons3("4.3") },
      { id: "4.4", level: "SL", contentItems: [
        "Linear correlation of bivariate data.",
        "Pearsons productmoment correlation coefficient.",
        "Scatter diagrams.",
        "Equation of regression line of \\(y\\) on \\(x\\).",
        "Prediction and interpretation.",
      ], lessons: lessons3("4.4") },
      { id: "4.5", level: "SL", contentItems: [
        "Concepts of trial, outcome, equally likely outcomes, relative frequency, sample space and event.",
        "Complementary events and expected number of occurrences.",
      ], lessons: lessons3("4.5") },
      { id: "4.6", level: "SL", contentItems: [
        "Venn diagrams, tree diagrams, sample space diagrams, tables of outcomes.",
        "Combined events, mutually exclusive events, conditional probability, independent events.",
      ], lessons: lessons3("4.6") },
      { id: "4.7", level: "SL", contentItems: [
        "Discrete random variables and their probability distributions.",
        "Expected value and applications.",
      ], lessons: lessons3("4.7") },
      { id: "4.8", level: "SL", contentItems: [
        "Binomial distribution.",
        "Mean and variance.",
        "Conditions for binomial model.",
      ], lessons: lessons3("4.8") },
      { id: "4.9", level: "SL", contentItems: [
        "Normal distribution and its properties.",
        "Normal probability and inverse normal calculations.",
      ], lessons: lessons3("4.9") },
      { id: "4.10", level: "SL", contentItems: [
        "Correlation: Pearsons and Spearmans correlation coefficients.",
      ], lessons: lessons3("4.10") },
      { id: "4.11", level: "SL", contentItems: [
        "Hypothesis testing: null and alternative hypotheses, significance level, \\(p\\)-values.",
        "Chi-squared test for independence.",
        "Chi-squared goodness of fit test.",
        "\\(t\\)-test (two-sample, unpaired).",
      ], lessons: lessons3("4.11") },
    ],
  },

  // 
  // Topic 5  Calculus
  // 
  {
    key: "calculus",
    ordinal: 5,
    label: "Calculus",
    sections: [
      { id: "5.1", level: "SL", contentItems: [
        "Concept of a limit.",
        "Derivative as gradient function and rate of change.",
        "Notation \\(\\tfrac{dy}{dx}, f'(x), \\tfrac{dV}{dr}, \\tfrac{ds}{dt}\\).",
      ], lessons: lessons3("5.1") },
      { id: "5.2", level: "SL", contentItems: [
        "Increasing and decreasing functions.",
        "Graphical interpretation of \\(f'(x)>0, f'(x)=0, f'(x)<0\\).",
      ], lessons: lessons3("5.2") },
      { id: "5.3", level: "SL", contentItems: [
        "Derivative of \\(f(x)=a x^{n}\\) is \\(f'(x)=anx^{n-1}\\).",
        "Derivative of polynomials.",
      ], lessons: lessons3("5.3") },
      { id: "5.4", level: "SL", contentItems: [
        "Tangents and normals at a given point.",
      ], lessons: lessons3("5.4") },
      { id: "5.5", level: "SL", contentItems: [
        "Integration as anti-differentiation of polynomials.",
        "Definite integrals using technology.",
        "Area under curve and the \\(x\\)-axis.",
      ], lessons: lessons3("5.5") },
      { id: "5.6", level: "SL", contentItems: [
        "Values of \\(x\\) where gradient = 0.",
        "Local maximum and minimum points.",
      ], lessons: lessons3("5.6") },
      { id: "5.7", level: "SL", contentItems: [
        "Optimisation problems.",
      ], lessons: lessons3("5.7") },
      { id: "5.8", level: "SL", contentItems: [
        "Approximating areas using trapezoidal rule.",
      ], lessons: lessons3("5.8") },
    ],
  },
];
