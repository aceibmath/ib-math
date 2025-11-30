// AA SL — Teacher Lessons: topics + sections (SL only)
// IMPORTANT: fiecare item din `contentItems` = o singură celulă din coloana "Content" (exact ca în poze).
// Formulele sunt LaTeX inline: \\( ... \\). Nu am inclus nimic din "Guidance...".
// Lecțiile sunt doar placeholders (3 per section, ex: 1.1.1, 1.1.2, 1.1.3). Poți schimba oricând.

export const topics = [
  // ────────────────────────────────────────────────────────────────────────────
  // Topic 1 — Number & Algebra
  // ────────────────────────────────────────────────────────────────────────────
  {
    key: "number-and-algebra",
    ordinal: 1,
    label: "Number & Algebra",
    sections: [
      {
        id: "1.1",
        contentItems: [
          // Operations with numbers in the form a × 10^k, 1 ≤ a < 10, k ∈ Z
          "Operations with numbers in the form \\( a\\times 10^{k} \\) where \\( 1\\le a<10 \\) and \\( k\\in\\mathbb{Z} \\).",
        ],
        lessons: [
          { id: "1.1.1", title: "Lesson 1.1.1" },
          { id: "1.1.2", title: "Lesson 1.1.2" },
          { id: "1.1.3", title: "Lesson 1.1.3" },
        ],
      },
      {
        id: "1.2",
        contentItems: [
          "Arithmetic sequences and series.",
          "Use of the formulae for the \\( n^{\\text{th}} \\) term and the sum of the first \\( n \\) terms of the sequence.",
          "Use of sigma notation for sums of arithmetic sequences.",
          "Applications of the skills above.",
          "Analysis, interpretation and prediction where a model is not perfectly arithmetic in real life.",
        ],
        lessons: [
          { id: "1.2.1", title: "Lesson 1.2.1" },
          { id: "1.2.2", title: "Lesson 1.2.2" },
          { id: "1.2.3", title: "Lesson 1.2.3" },
        ],
      },
      {
        id: "1.3",
        contentItems: [
          "Geometric sequences and series.",
          "Use of the formulae for the \\( n^{\\text{th}} \\) term and the sum of the first \\( n \\) terms of the sequence.",
          "Use of sigma notation for the sums of geometric sequences.",
          "Applications of the skills above.",
        ],
        lessons: [
          { id: "1.3.1", title: "Lesson 1.3.1" },
          { id: "1.3.2", title: "Lesson 1.3.2" },
          { id: "1.3.3", title: "Lesson 1.3.3" },
        ],
      },
      {
        id: "1.4",
        contentItems: [
          "Financial applications of geometric sequences and series (compound interest and annual depreciation).",
        ],
        lessons: [
          { id: "1.4.1", title: "Lesson 1.4.1" },
          { id: "1.4.2", title: "Lesson 1.4.2" },
          { id: "1.4.3", title: "Lesson 1.4.3" },
        ],
      },
      {
        id: "1.5",
        contentItems: [
          "Laws of exponents with integer exponents.",
          "Introduction to logarithms with base 10 and \\( e \\).",
          "Numerical evaluation of logarithms using technology.",
        ],
        lessons: [
          { id: "1.5.1", title: "Lesson 1.5.1" },
          { id: "1.5.2", title: "Lesson 1.5.2" },
          { id: "1.5.3", title: "Lesson 1.5.3" },
        ],
      },
      {
        id: "1.6",
        contentItems: [
          "Simple deductive proof, numerical and algebraic; how to lay out a left-hand side to right-hand side (LHS to RHS) proof.",
          "The symbols and notations for equality and identity.",
        ],
        lessons: [
          { id: "1.6.1", title: "Lesson 1.6.1" },
          { id: "1.6.2", title: "Lesson 1.6.2" },
          { id: "1.6.3", title: "Lesson 1.6.3" },
        ],
      },
      {
        id: "1.7",
        contentItems: [
          "Laws of exponents with rational exponents.",
          "Laws of logarithms.",
          "Change of base of a logarithm.",
          "Solving exponential equations, including using logarithms.",
        ],
        lessons: [
          { id: "1.7.1", title: "Lesson 1.7.1" },
          { id: "1.7.2", title: "Lesson 1.7.2" },
          { id: "1.7.3", title: "Lesson 1.7.3" },
        ],
      },
      {
        id: "1.8",
        contentItems: [
          "Sum of infinite convergent geometric sequences.",
        ],
        lessons: [
          { id: "1.8.1", title: "Lesson 1.8.1" },
          { id: "1.8.2", title: "Lesson 1.8.2" },
          { id: "1.8.3", title: "Lesson 1.8.3" },
        ],
      },
      {
        id: "1.9",
        contentItems: [
          "The binomial theorem.",
          "Use of Pascal’s triangle and \\( ^nC_r \\).",
        ],
        lessons: [
          { id: "1.9.1", title: "Lesson 1.9.1" },
          { id: "1.9.2", title: "Lesson 1.9.2" },
          { id: "1.9.3", title: "Lesson 1.9.3" },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────────
  // Topic 2 — Functions
  // ────────────────────────────────────────────────────────────────────────────
  {
    key: "functions",
    ordinal: 2,
    label: "Functions",
    sections: [
      {
        id: "2.1",
        contentItems: [
          "Different forms of the equation of a straight line.",
          "Gradient; intercepts.",
          "Lines with gradients \\( m_1 \\) and \\( m_2 \\).",
          "Parallel lines \\( m_1 = m_2 \\).",
          "Perpendicular lines \\( m_1\\, m_2 = -1 \\).",
        ],
        lessons: [
          { id: "2.1.1", title: "Lesson 2.1.1" },
          { id: "2.1.2", title: "Lesson 2.1.2" },
          { id: "2.1.3", title: "Lesson 2.1.3" },
        ],
      },
      {
        id: "2.2",
        contentItems: [
          "Concept of a function, domain, range and graph.",
          "Function notation.",
          "The concept of a function as a mathematical model.",
          "Informal concept that an inverse function reverses or undoes the effect of a function.",
          "Inverse function as a reflection in the line \\( y=x \\), and the notation \\( f^{-1}(x) \\).",
        ],
        lessons: [
          { id: "2.2.1", title: "Lesson 2.2.1" },
          { id: "2.2.2", title: "Lesson 2.2.2" },
          { id: "2.2.3", title: "Lesson 2.2.3" },
        ],
      },
      {
        id: "2.3",
        contentItems: [
          "The graph of a function.",
          "Creating a sketch from information given or a context, including transferring a graph from screen to paper.",
          "Using technology to graph functions including their sums and differences.",
        ],
        lessons: [
          { id: "2.3.1", title: "Lesson 2.3.1" },
          { id: "2.3.2", title: "Lesson 2.3.2" },
          { id: "2.3.3", title: "Lesson 2.3.3" },
        ],
      },
      {
        id: "2.4",
        contentItems: [
          "Determine key features of a graph.",
          "Finding the point of intersection of two curves or lines using technology.",
          "Composite functions.",
          "Identity function. Finding the inverse function.",
        ],
        lessons: [
          { id: "2.4.1", title: "Lesson 2.4.1" },
          { id: "2.4.2", title: "Lesson 2.4.2" },
          { id: "2.4.3", title: "Lesson 2.4.3" },
        ],
      },
      {
        id: "2.6",
        contentItems: [
          "The quadratic function, its graph, and \\( y \\)-intercept.",
          "The quadratic function \\( f(x)=ax^2+bx+c \\); its graph, \\( y \\)-intercept \\((0,c)\\), \\( x \\)-axis of symmetry.",
          "The form \\( f(x)=a(x-p)(x-q) \\), \\( x \\)-intercepts \\((p,0)\\) and \\((q,0)\\).",
          "The form \\( f(x)=a(x-h)^2+k \\), vertex \\((h,k)\\).",
        ],
        lessons: [
          { id: "2.6.1", title: "Lesson 2.6.1" },
          { id: "2.6.2", title: "Lesson 2.6.2" },
          { id: "2.6.3", title: "Lesson 2.6.3" },
        ],
      },
      {
        id: "2.7",
        contentItems: [
          "Solution of quadratic equations and inequalities. The quadratic formula.",
          "The discriminant \\( \\Delta = b^2 - 4ac \\) and the nature of the roots, that is, two distinct real roots, two equal real roots, no real roots.",
          "The reciprocal function \\( f(x)=\\frac{1}{x} \\), \\( x\\neq 0 \\); its graph and self-inverse nature.",
          "Rational functions of the form \\( f(x)=\\frac{ax+b}{cx+d} \\) and their graphs.",
          "Equations of vertical and horizontal asymptotes.",
        ],
        lessons: [
          { id: "2.7.1", title: "Lesson 2.7.1" },
          { id: "2.7.2", title: "Lesson 2.7.2" },
          { id: "2.7.3", title: "Lesson 2.7.3" },
        ],
      },
      {
        id: "2.9",
        contentItems: [
          "Exponential functions and their graphs: \\( f(x)=a^x \\), \\( a>0 \\); \\( f(x)=e^x \\).",
          "Logarithmic functions and their graphs: \\( f(x)=\\log_a x,\\, x>0 \\); \\( f(x)=\\ln x,\\, x>0 \\).",
        ],
        lessons: [
          { id: "2.9.1", title: "Lesson 2.9.1" },
          { id: "2.9.2", title: "Lesson 2.9.2" },
          { id: "2.9.3", title: "Lesson 2.9.3" },
        ],
      },
      {
        id: "2.10",
        contentItems: [
          "Solving equations, both graphically and analytically.",
          "Use of technology to solve a variety of equations, including those where there is no appropriate analytic approach.",
          "Applications of graphing skills and solving equations that relate to real-life situations.",
        ],
        lessons: [
          { id: "2.10.1", title: "Lesson 2.10.1" },
          { id: "2.10.2", title: "Lesson 2.10.2" },
          { id: "2.10.3", title: "Lesson 2.10.3" },
        ],
      },
      {
        id: "2.11",
        contentItems: [
          "Transformations of graphs.",
          "Translations.",
          "Stretches in one direction.",
          "Reflections.",
          "Vertical and horizontal stretch.",
        ],
        lessons: [
          { id: "2.11.1", title: "Lesson 2.11.1" },
          { id: "2.11.2", title: "Lesson 2.11.2" },
          { id: "2.11.3", title: "Lesson 2.11.3" },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────────
  // Topic 3 — Geometry & Trigonometry
  // ────────────────────────────────────────────────────────────────────────────
  {
    key: "geometry-and-trigonometry",
    ordinal: 3,
    label: "Geometry & Trigonometry",
    sections: [
      {
        id: "3.1",
        contentItems: [
          "The distance between two points in three-dimensional space, and their midpoint.",
          "Volume and surface area of three-dimensional solids including right-pyramid, right cone, sphere, hemisphere and combinations of these solids.",
          "The size of an angle between two intersecting lines or between a line and a plane.",
        ],
        lessons: [
          { id: "3.1.1", title: "Lesson 3.1.1" },
          { id: "3.1.2", title: "Lesson 3.1.2" },
          { id: "3.1.3", title: "Lesson 3.1.3" },
        ],
      },
      {
        id: "3.2",
        contentItems: [
          "Use of sine, cosine and tangent ratios to find the sides and angles of right-angled triangles.",
          "The sine and cosine rule.",
          "Area of a triangle.",
        ],
        lessons: [
          { id: "3.2.1", title: "Lesson 3.2.1" },
          { id: "3.2.2", title: "Lesson 3.2.2" },
          { id: "3.2.3", title: "Lesson 3.2.3" },
        ],
      },
      {
        id: "3.3",
        contentItems: [
          "Applications of right and non-right angle trigonometry, including Pythagoras’s theorem.",
          "Angles of elevation and depression.",
          "Construction of labelled diagrams from written statements.",
        ],
        lessons: [
          { id: "3.3.1", title: "Lesson 3.3.1" },
          { id: "3.3.2", title: "Lesson 3.3.2" },
          { id: "3.3.3", title: "Lesson 3.3.3" },
        ],
      },
      {
        id: "3.4",
        contentItems: [
          "The circle: radian measure of angles; length of an arc; area of a sector.",
        ],
        lessons: [
          { id: "3.4.1", title: "Lesson 3.4.1" },
          { id: "3.4.2", title: "Lesson 3.4.2" },
          { id: "3.4.3", title: "Lesson 3.4.3" },
        ],
      },
      {
        id: "3.5",
        contentItems: [
          "Definition of \\( \\cos\\theta,\\, \\sin\\theta \\) in terms of the unit circle.",
          "Definition of \\( \\tan\\theta \\) as \\( \\sin\\theta/\\cos\\theta \\).",
          "Extension of the sine rule to the ambiguous case.",
        ],
        lessons: [
          { id: "3.5.1", title: "Lesson 3.5.1" },
          { id: "3.5.2", title: "Lesson 3.5.2" },
          { id: "3.5.3", title: "Lesson 3.5.3" },
        ],
      },
      {
        id: "3.6",
        contentItems: [
          "The Pythagorean identity \\( \\cos^2\\theta + \\sin^2\\theta = 1 \\).",
          "Double angle identities for sine and cosine.",
          "The relationship between trigonometric ratios.",
        ],
        lessons: [
          { id: "3.6.1", title: "Lesson 3.6.1" },
          { id: "3.6.2", title: "Lesson 3.6.2" },
          { id: "3.6.3", title: "Lesson 3.6.3" },
        ],
      },
      {
        id: "3.7",
        contentItems: [
          "The circular functions \\( \\sin x, \\cos x, \\tan x \\): amplitude, their periodic nature, and their graphs.",
          "Composite functions of the form \\( f(x)=a\\sin(b(x+c))+d \\).",
          "Transformations.",
        ],
        lessons: [
          { id: "3.7.1", title: "Lesson 3.7.1" },
          { id: "3.7.2", title: "Lesson 3.7.2" },
          { id: "3.7.3", title: "Lesson 3.7.3" },
        ],
      },
      {
        id: "3.8",
        contentItems: [
          "Solving trigonometric equations in a finite interval, both graphically and analytically.",
          "Equations leading to quadratic equations in \\( \\sin x, \\cos x \\) or \\( \\tan x \\).",
        ],
        lessons: [
          { id: "3.8.1", title: "Lesson 3.8.1" },
          { id: "3.8.2", title: "Lesson 3.8.2" },
          { id: "3.8.3", title: "Lesson 3.8.3" },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────────
  // Topic 4 — Statistics & Probability
  // ────────────────────────────────────────────────────────────────────────────
  {
    key: "statistics-and-probability",
    ordinal: 4,
    label: "Statistics & Probability",
    sections: [
      {
        id: "4.1",
        contentItems: [
          "Concepts of population, sample, random sample, discrete and continuous data.",
          "Reliability of data sources and bias in sampling.",
          "Interpretation of outliers.",
          "Sampling techniques and their effectiveness.",
        ],
        lessons: [
          { id: "4.1.1", title: "Lesson 4.1.1" },
          { id: "4.1.2", title: "Lesson 4.1.2" },
          { id: "4.1.3", title: "Lesson 4.1.3" },
        ],
      },
      {
        id: "4.2",
        contentItems: [
          "Presentation of data (discrete and continuous); frequency distributions (tables).",
          "Histograms.",
          "Cumulative frequency; cumulative frequency graphs used to find median, quartiles, percentiles, range and interquartile range (IQR).",
          "Production and understanding of box and whisker diagrams.",
        ],
        lessons: [
          { id: "4.2.1", title: "Lesson 4.2.1" },
          { id: "4.2.2", title: "Lesson 4.2.2" },
          { id: "4.2.3", title: "Lesson 4.2.3" },
        ],
      },
      {
        id: "4.3",
        contentItems: [
          "Measures of central tendency (mean, median and mode).",
          "Grouped data.",
          "Modal class.",
          "Measure of dispersion (interquartile range, standard deviation and variance).",
          "Effect of constant changes on the original data.",
          "Quartiles of discrete data.",
        ],
        lessons: [
          { id: "4.3.1", title: "Lesson 4.3.1" },
          { id: "4.3.2", title: "Lesson 4.3.2" },
          { id: "4.3.3", title: "Lesson 4.3.3" },
        ],
      },
      {
        id: "4.4",
        contentItems: [
          "Linear correlation of bivariate data.",
          "Pearson product–moment correlation coefficient, r.",
          "Scatter diagrams; line of best fit, by eye, passing through the mean point.",
          "Equation of the regression line of y on x.",
          "Use of the equation of the regression line for prediction purposes.",
          "Interpret the meaning of the parameters, a and b, in a linear regression \\( y=ax+b \\).",
        ],
        lessons: [
          { id: "4.4.1", title: "Lesson 4.4.1" },
          { id: "4.4.2", title: "Lesson 4.4.2" },
          { id: "4.4.3", title: "Lesson 4.4.3" },
        ],
      },
      {
        id: "4.5",
        contentItems: [
          "Concepts of trial, outcome, equally likely outcomes, relative frequency, sample space (S) and event.",
          "The probability of an event.",
          "The complementary events A and \\( A' \\) (not A).",
          "Expected number of occurrences.",
        ],
        lessons: [
          { id: "4.5.1", title: "Lesson 4.5.1" },
          { id: "4.5.2", title: "Lesson 4.5.2" },
          { id: "4.5.3", title: "Lesson 4.5.3" },
        ],
      },
      {
        id: "4.6",
        contentItems: [
          "Use of Venn diagrams, tree diagrams, sample space diagrams and tables of outcomes to calculate probabilities.",
          "Combined events.",
          "Mutually exclusive events.",
          "Conditional probability.",
          "Independent events.",
        ],
        lessons: [
          { id: "4.6.1", title: "Lesson 4.6.1" },
          { id: "4.6.2", title: "Lesson 4.6.2" },
          { id: "4.6.3", title: "Lesson 4.6.3" },
        ],
      },
      {
        id: "4.7",
        contentItems: [
          "Concept of discrete random variables and their probability distributions.",
          "Expected value (mean), for discrete data.",
          "Applications of above concepts.",
        ],
        lessons: [
          { id: "4.7.1", title: "Lesson 4.7.1" },
          { id: "4.7.2", title: "Lesson 4.7.2" },
          { id: "4.7.3", title: "Lesson 4.7.3" },
        ],
      },
      {
        id: "4.8",
        contentItems: [
          "Binomial distribution.",
          "Mean and variance of the binomial distribution.",
        ],
        lessons: [
          { id: "4.8.1", title: "Lesson 4.8.1" },
          { id: "4.8.2", title: "Lesson 4.8.2" },
          { id: "4.8.3", title: "Lesson 4.8.3" },
        ],
      },
      {
        id: "4.9",
        contentItems: [
          "The normal distribution and curve.",
          "Properties of the normal distribution.",
          "Diagrammatic representation.",
          "Normal probability calculations.",
          "Inverse normal calculations.",
        ],
        lessons: [
          { id: "4.9.1", title: "Lesson 4.9.1" },
          { id: "4.9.2", title: "Lesson 4.9.2" },
          { id: "4.9.3", title: "Lesson 4.9.3" },
        ],
      },
      {
        id: "4.10",
        contentItems: [
          "Equation of the regression line of y on x.",
          "Use of the equation for prediction purposes.",
        ],
        lessons: [
          { id: "4.10.1", title: "Lesson 4.10.1" },
          { id: "4.10.2", title: "Lesson 4.10.2" },
          { id: "4.10.3", title: "Lesson 4.10.3" },
        ],
      },
      {
        id: "4.11",
        contentItems: [
          "Standardization of normal variables (z-values).",
        ],
        lessons: [
          { id: "4.11.1", title: "Lesson 4.11.1" },
          { id: "4.11.2", title: "Lesson 4.11.2" },
          { id: "4.11.3", title: "Lesson 4.11.3" },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────────
  // Topic 5 — Calculus
  // ────────────────────────────────────────────────────────────────────────────
  {
    key: "calculus",
    ordinal: 5,
    label: "Calculus",
    sections: [
      {
        id: "5.1",
        contentItems: [
          "Introduction to the concept of a limit.",
          "Derivative interpreted as gradient function and as rate of change.",
        ],
        lessons: [
          { id: "5.1.1", title: "Lesson 5.1.1" },
          { id: "5.1.2", title: "Lesson 5.1.2" },
          { id: "5.1.3", title: "Lesson 5.1.3" },
        ],
      },
      {
        id: "5.2",
        contentItems: [
          "Increasing and decreasing functions.",
          "Graphical interpretation of \\( f'(x)>0, f'(x)=0, f'(x)<0 \\).",
        ],
        lessons: [
          { id: "5.2.1", title: "Lesson 5.2.1" },
          { id: "5.2.2", title: "Lesson 5.2.2" },
          { id: "5.2.3", title: "Lesson 5.2.3" },
        ],
      },
      {
        id: "5.3",
        contentItems: [
          "Derivative of \\( f(x)=ax^n \\) is \\( f'(x)=anx^{n-1} \\), \\( n\\in\\mathbb{Z} \\).",
          "The derivative of functions of the form \\( f(x)=ax^n+bx^m+\\ldots \\) where all exponents are integers.",
        ],
        lessons: [
          { id: "5.3.1", title: "Lesson 5.3.1" },
          { id: "5.3.2", title: "Lesson 5.3.2" },
          { id: "5.3.3", title: "Lesson 5.3.3" },
        ],
      },
      {
        id: "5.4",
        contentItems: [
          "Tangents and normals at a given point, and their equations.",
        ],
        lessons: [
          { id: "5.4.1", title: "Lesson 5.4.1" },
          { id: "5.4.2", title: "Lesson 5.4.2" },
          { id: "5.4.3", title: "Lesson 5.4.3" },
        ],
      },
      {
        id: "5.5",
        contentItems: [
          "Introduction to integration as anti-differentiation of functions of the form \\( f(x)=ax^n+bx^m+\\ldots \\), where \\( n\\in\\mathbb{Z},\\, n\\ne -1 \\).",
          "Anti-differentiation with a boundary condition to determine the constant term.",
          "Definite integrals using technology.",
          "Area of a region enclosed by a curve \\( y=f(x) \\) and the \\( x \\)-axis, where \\( f(x)\\ge 0 \\).",
        ],
        lessons: [
          { id: "5.5.1", title: "Lesson 5.5.1" },
          { id: "5.5.2", title: "Lesson 5.5.2" },
          { id: "5.5.3", title: "Lesson 5.5.3" },
        ],
      },
      {
        id: "5.6",
        contentItems: [
          "Derivative of \\( x^n \\) (\\( n\\in\\mathbb{Q} \\)), \\( \\sin x, \\cos x, e^x \\) and \\( \\ln x \\).",
          "Differentiation of a sum and a multiple of these functions.",
          "The chain rule for composite functions.",
          "The product and quotient rules.",
        ],
        lessons: [
          { id: "5.6.1", title: "Lesson 5.6.1" },
          { id: "5.6.2", title: "Lesson 5.6.2" },
          { id: "5.6.3", title: "Lesson 5.6.3" },
        ],
      },
      {
        id: "5.7",
        contentItems: [
          "The second derivative.",
          "Graphical behaviour of functions, including the relationship between the graphs of \\( f, f' \\) and \\( f'' \\).",
        ],
        lessons: [
          { id: "5.7.1", title: "Lesson 5.7.1" },
          { id: "5.7.2", title: "Lesson 5.7.2" },
          { id: "5.7.3", title: "Lesson 5.7.3" },
        ],
      },
      {
        id: "5.8",
        contentItems: [
          "Local maximum and minimum points.",
          "Testing for maximum and minimum.",
          "Optimization.",
          "Points of inflexion with zero and non-zero gradients.",
        ],
        lessons: [
          { id: "5.8.1", title: "Lesson 5.8.1" },
          { id: "5.8.2", title: "Lesson 5.8.2" },
          { id: "5.8.3", title: "Lesson 5.8.3" },
        ],
      },
      {
        id: "5.9",
        contentItems: [
          "Kinematic problems involving displacement \\( s \\), velocity \\( v \\), acceleration \\( a \\) and total distance travelled.",
        ],
        lessons: [
          { id: "5.9.1", title: "Lesson 5.9.1" },
          { id: "5.9.2", title: "Lesson 5.9.2" },
          { id: "5.9.3", title: "Lesson 5.9.3" },
        ],
      },
      {
        id: "5.10",
        contentItems: [
          "Indefinite integrals.",
          "Composites.",
          "Reverse chain rule.",
        ],
        lessons: [
          { id: "5.10.1", title: "Lesson 5.10.1" },
          { id: "5.10.2", title: "Lesson 5.10.2" },
          { id: "5.10.3", title: "Lesson 5.10.3" },
        ],
      },
      {
        id: "5.11",
        contentItems: [
          "Definite integrals, including analytical approach.",
          "Area of a region enclosed by a curve \\( y=f(x) \\) and the \\( x \\)-axis, where \\( f(x) \\) can be positive or negative, without the use of technology.",
          "Areas between curves.",
        ],
        lessons: [
          { id: "5.11.1", title: "Lesson 5.11.1" },
          { id: "5.11.2", title: "Lesson 5.11.2" },
          { id: "5.11.3", title: "Lesson 5.11.3" },
        ],
      },
    ],
  },
];
