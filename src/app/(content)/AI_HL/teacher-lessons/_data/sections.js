// AI HL  Teacher Lessons: topics + sections (SL + HL)
// Fiecare item din contentItems = 1 bullet din poză/text.
// Formule LaTeX inline: \\( ... \\). 3 lecții placeholder / secțiune.

function lessons3(prefix) {
  return [
    { id: `${prefix}.1`, title: `Lesson ${prefix}.1` },
    { id: `${prefix}.2`, title: `Lesson ${prefix}.2` },
    { id: `${prefix}.3`, title: `Lesson ${prefix}.3` },
  ];
}

export const topics = [
  // 
  // Topic 1  Number & Algebra
  // 
  {
    key: "number-and-algebra",
    ordinal: 1,
    label: "Number & Algebra",
    sections: [
      { id: "1.1",  level: "SL", contentItems: [
        "Operations with numbers in the form \\( a\\times10^{k} \\) where \\( 1\\le a<10 \\) and \\( k \\) is an integer.",
      ], lessons: lessons3("1.1") },
      { id: "1.2",  level: "SL", contentItems: [
        "Arithmetic sequences and series.",
        "Use of the formulae for the \\( n \\)th term and the sum of the first \\( n \\) terms of the sequence.",
        "Use of sigma notation for sums of arithmetic sequences.",
        "Applications of the skills above.",
        "Analysis, interpretation and prediction where a model is not perfectly arithmetic in real life.",
      ], lessons: lessons3("1.2") },
      { id: "1.3",  level: "SL", contentItems: [
        "Geometric sequences and series.",
        "Use of the formulae for the \\( n \\)th term and the sum of the first \\( n \\) terms of the sequence.",
        "Use of sigma notation for the sums of geometric sequences.",
        "Applications.",
      ], lessons: lessons3("1.3") },
      { id: "1.4",  level: "SL", contentItems: [
        "Compound interest.",
        "Simple modelling of growth and decay.",
        "Use of logarithms to solve exponential equations.",
      ], lessons: lessons3("1.4") },
      { id: "1.5",  level: "SL", contentItems: [
        "Exponents.",
        "Laws of exponents.",
        "Logarithms as inverses of exponential functions.",
        "Change of base.",
      ], lessons: lessons3("1.5") },
      { id: "1.6",  level: "SL", contentItems: [
        "Upper and lower bounds.",
        "Estimation.",
      ], lessons: lessons3("1.6") },
      { id: "1.7",  level: "SL", contentItems: [
        "Amortization and annuities using technology.",
      ], lessons: lessons3("1.7") },
      { id: "1.8",  level: "SL", contentItems: [
        "Use technology to solve systems of linear equations in up to 3 variables.",
        "Use technology to solve polynomial equations.",
      ], lessons: lessons3("1.8") },

      { id: "1.9",  level: "HL", contentItems: [
        "Laws of logarithms \\(\\log_a(xy)=\\log_a x+\\log_a y\\), \\(\\log_a(x/y)=\\log_a x-\\log_a y\\), \\(\\log_a(x^{m})=m\\log_a x\\) for \\(a,x,y>0\\).",
      ], lessons: lessons3("1.9") },
      { id: "1.10", level: "HL", contentItems: [
        "Simplifying expressions, both numerically and algebraically, involving rational exponents.",
      ], lessons: lessons3("1.10") },
      { id: "1.11", level: "HL", contentItems: [
        "The sum of infinite geometric sequences.",
      ], lessons: lessons3("1.11") },
      { id: "1.12", level: "HL", contentItems: [
        "Complex numbers: the number \\( i \\) such that \\( i^{2}=-1 \\).",
        "Cartesian form \\( z=a+bi \\); the terms real part, imaginary part, conjugate, modulus and argument.",
        "Calculate sums, differences, products, quotients, by hand and with technology. Calculating powers of complex numbers, in Cartesian form, with technology.",
        "The complex plane.",
        "Complex numbers as solutions to quadratic equations of the form \\( ax^{2}+bx+c=0 \\), \\( a\\neq0 \\), with real coefficients where \\( b^{2}-4ac<0 \\).",
      ], lessons: lessons3("1.12") },
      { id: "1.13", level: "HL", contentItems: [
        "Modulusargument (polar) form \\( z=r(\\cos\\theta+i\\sin\\theta)=r\\,\\mathrm{cis}\\,\\theta \\).",
        "Exponential form \\( z=re^{i\\theta} \\).",
        "Conversion between Cartesian, polar and exponential forms, by hand and with technology.",
        "Calculate products, quotients and integer powers in polar or exponential forms.",
        "Adding sinusoidal functions with the same frequencies but different phase shift angles.",
      ], lessons: lessons3("1.13") },
      { id: "1.14", level: "HL", contentItems: [
        "Definition of a matrix.",
        "Algebra of matrices (equality; addition; subtraction; multiplication by a scalar).",
        "Multiplication of matrices.",
        "Properties (associativity, distributivity and non-commutativity).",
        "Identity and zero matrices.",
        "Determinants and inverses of \\( n\\times n \\) matrices with technology, and by hand for \\( 2\\times2 \\).",
        "Awareness that a system of linear equations can be written \\( A\\mathbf{x}=\\mathbf{b} \\).",
        "Solution of systems using inverse matrix.",
        "Model and solve real-life problems including coding/decoding messages and solving systems of equations.",
      ], lessons: lessons3("1.14") },
      { id: "1.15", level: "HL", contentItems: [
        "Eigenvalues and eigenvectors.",
        "Characteristic polynomial of \\( 2\\times2 \\) matrices.",
        "Diagonalization of \\( 2\\times2 \\) matrices (distinct real eigenvalues).",
        "Applications to powers of \\( 2\\times2 \\) matrices.",
      ], lessons: lessons3("1.15") },
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

      { id: "2.7", level: "HL", contentItems: [
        "The concept of function as a many-to-one or one-to-one mapping.",
        "Composition of functions and their domains.",
        "Inverse of a function and its domain.",
        "Finding inverses of functions algebraically.",
      ], lessons: lessons3("2.7") },
      { id: "2.8", level: "HL", contentItems: [
        "Transformations of graphs: translations \\(y=f(x)+b\\), \\(y=f(x-a)\\); reflections \\(y=-f(x)\\), \\(y=f(-x)\\); vertical stretch \\(y=p f(x)\\); horizontal stretch \\(y=f(qx)\\); composite transformations.",
      ], lessons: lessons3("2.8") },
      { id: "2.9", level: "HL", contentItems: [
        "Modelling with exponential, logarithmic, sinusoidal and logistic functions.",
        "Determination of parameters from data.",
      ], lessons: lessons3("2.9") },
      { id: "2.10", level: "HL", contentItems: [
        "Scaling large and small numbers using logarithms.",
      ], lessons: lessons3("2.10") },
      { id: "2.11", level: "HL", contentItems: [
        "Transformations of functions including time shifts.",
      ], lessons: lessons3("2.11") },
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

      { id: "3.7", level: "HL", contentItems: [
        "Definition of a radian and conversion between degrees and radians.",
        "Using radians to calculate area of sector and length of arc.",
      ], lessons: lessons3("3.7") },
      { id: "3.8", level: "HL", contentItems: [
        "Definition of trigonometric functions for all real numbers.",
        "Relationship between radians and the unit circle.",
        "Trigonometric identities.",
        "Graphs of trigonometric functions.",
        "Solutions of trigonometric equations.",
      ], lessons: lessons3("3.8") },
      { id: "3.9", level: "HL", contentItems: [
        "Geometric transformations of points in two dimensions using matrices.",
        "Matrix transformations.",
        "Compositions of transformations.",
        "Geometric interpretation of \\(|\\det A|\\) as area scale factor.",
      ], lessons: lessons3("3.9") },
      { id: "3.10", level: "HL", contentItems: [
        "Polar coordinates and their conversion to and from Cartesian coordinates.",
        "Curves given in polar form.",
      ], lessons: lessons3("3.10") },
      { id: "3.11", level: "HL", contentItems: [
        "Vectors: further applications including projections and components.",
      ], lessons: lessons3("3.11") },
      { id: "3.12", level: "HL", contentItems: [
        "Planes in 3D.",
        "Intersections of lines and planes.",
        "Angles between planes and lines.",
      ], lessons: lessons3("3.12") },
      { id: "3.13", level: "HL", contentItems: [
        "Definition and calculation of scalar and vector products.",
        "Angle between two vectors.",
        "Geometric interpretation of \\(\\lVert \\mathbf{v}\\times\\mathbf{w}\\rVert\\).",
        "Components of vectors along and perpendicular to a direction.",
      ], lessons: lessons3("3.13") },
      { id: "3.14", level: "HL", contentItems: [
        "Graph theory: graphs, vertices, edges.",
        "Degree of a vertex.",
        "Simple, complete, weighted graphs.",
        "Connected or strongly connected graphs.",
      ], lessons: lessons3("3.14") },
      { id: "3.15", level: "HL", contentItems: [
        "Adjacency matrices and their use in graph theory.",
      ], lessons: lessons3("3.15") },
      { id: "3.16", level: "HL", contentItems: [
        "Tree and cycle algorithms for undirected graphs.",
        "Eulerian trails and circuits.",
        "Hamiltonian paths and cycles.",
        "Minimum spanning tree algorithms.",
        "Chinese postman problem.",
        "Travelling salesman problem.",
      ], lessons: lessons3("3.16") },
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

      { id: "4.12", level: "HL", contentItems: [
        "Design of valid data collection methods.",
        "Selecting relevant variables.",
        "Categorizing data for chi-squared tests.",
        "Reliability and validity.",
      ], lessons: lessons3("4.12") },
      { id: "4.13", level: "HL", contentItems: [
        "Non-linear regression.",
        "Coefficient of determination \\(r^2\\).",
        "Residuals and residual plots.",
      ], lessons: lessons3("4.13") },
      { id: "4.14", level: "HL", contentItems: [
        "Linear transformation of a random variable.",
        "\\(E[aX+b]=aE[X]+b\\); \\(\\mathrm{Var}(aX+b)=a^2\\mathrm{Var}(X)\\).",
        "Expected value and variance of linear combinations.",
        "Unbiased estimates of population parameters.",
      ], lessons: lessons3("4.14") },
      { id: "4.15", level: "HL", contentItems: [
        "Linear combination of independent normal variables.",
        "Central limit theorem.",
      ], lessons: lessons3("4.15") },
      { id: "4.16", level: "HL", contentItems: [
        "Confidence intervals for the mean of a normal population.",
        "Use of normal or \\(t\\)-distributions.",
      ], lessons: lessons3("4.16") },
      { id: "4.17", level: "HL", contentItems: [
        "Hypothesis testing using appropriate distributions and technology.",
      ], lessons: lessons3("4.17") },
      { id: "4.18", level: "HL", contentItems: [
        "Transition matrices in Markov chains.",
        "Long-term behaviour.",
      ], lessons: lessons3("4.18") },
      { id: "4.19", level: "HL", contentItems: [
        "Markov chains.",
        "Long-run equilibrium distribution.",
      ], lessons: lessons3("4.19") },
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

      { id: "5.9", level: "HL", contentItems: [
        "Derivatives of \\(\\sin x, \\cos x, \\tan x, e^x, \\ln x, x^n\\).",
        "Chain, product and quotient rules.",
        "Related rates of change.",
      ], lessons: lessons3("5.9") },
      { id: "5.10", level: "HL", contentItems: [
        "Second derivative.",
        "Second derivative test.",
        "Points of inflexion and concavity.",
      ], lessons: lessons3("5.10") },
      { id: "5.11", level: "HL", contentItems: [
        "Integration of \\(x^n, \\sin x, \\cos x, \\sec^2 x, e^x\\).",
        "Integration by inspection and substitution.",
      ], lessons: lessons3("5.11") },
      { id: "5.12", level: "HL", contentItems: [
        "Area under a curve.",
        "Volumes of revolution about the \\(x\\)- and \\(y\\)-axes.",
      ], lessons: lessons3("5.12") },
      { id: "5.13", level: "HL", contentItems: [
        "Kinematics: \\(v=\\tfrac{ds}{dt}\\), \\(a=\\tfrac{dv}{dt}=\\tfrac{d^2 s}{dt^2}\\).",
        "Displacement \\(\\int v(t)\\,dt\\); total distance \\(\\int |v(t)|\\,dt\\).",
      ], lessons: lessons3("5.13") },
      { id: "5.14", level: "HL", contentItems: [
        "Differential equations from context.",
        "Solution by separation of variables.",
        "General solution.",
      ], lessons: lessons3("5.14") },
      { id: "5.15", level: "HL", contentItems: [
        "Slope fields and their diagrams.",
      ], lessons: lessons3("5.15") },
      { id: "5.16", level: "HL", contentItems: [
        "Eulers method for approximate solutions.",
        "Numerical solution of first-order differential equations.",
      ], lessons: lessons3("5.16") },
      { id: "5.17", level: "HL", contentItems: [
        "Phase portraits for linear systems.",
        "Qualitative analysis via eigenvalues.",
        "Equilibrium types.",
      ], lessons: lessons3("5.17") },
      { id: "5.18", level: "HL", contentItems: [
        "Second-order differential equations.",
        "Eulers method applied to systems.",
        "Phase portraits.",
      ], lessons: lessons3("5.18") },
    ],
  },
];
