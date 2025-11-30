// AA HL — Teacher Lessons: SL + HL-only sections appended
// IMPORTANT: fiecare item din `contentItems` = un singur bullet (LaTeX inline: \\( ... \\)).

export const topics = [
  // ────────────────────────────────────────────────────────────────────────────
  // Topic 1 — Number & Algebra
  // ────────────────────────────────────────────────────────────────────────────
  {
    key: "number-and-algebra",
    ordinal: 1,
    label: "Number & Algebra",
    sections: [
      // — SL sections (1.1 … 1.9)
      {
        id: "1.1",
        contentItems: [
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

      // — HL-only sections (1.10 … 1.16)
      {
        level: "HL",
        id: "1.10",
        contentItems: [
          "Counting principles, including permutations and combinations.",
          "Extension of the binomial theorem to fractional and negative indices.",
        ],
        lessons: [
          { id: "1.10.1", title: "Lesson 1.10.1" },
          { id: "1.10.2", title: "Lesson 1.10.2" },
          { id: "1.10.3", title: "Lesson 1.10.3" },
        ],
      },
      {
        level: "HL",
        id: "1.11",
        contentItems: [
          "Partial fractions.",
        ],
        lessons: [
          { id: "1.11.1", title: "Lesson 1.11.1" },
          { id: "1.11.2", title: "Lesson 1.11.2" },
          { id: "1.11.3", title: "Lesson 1.11.3" },
        ],
      },
      {
        level: "HL",
        id: "1.12",
        contentItems: [
          "Complex numbers: the number \\( i \\), where \\( i^2=-1 \\).",
          "Cartesian form \\( z=a+bi \\); real part, imaginary part, conjugate, modulus and argument.",
          "The complex plane.",
        ],
        lessons: [
          { id: "1.12.1", title: "Lesson 1.12.1" },
          { id: "1.12.2", title: "Lesson 1.12.2" },
          { id: "1.12.3", title: "Lesson 1.12.3" },
        ],
      },
      {
        level: "HL",
        id: "1.13",
        contentItems: [
          "Modulus–argument (polar) form.",
          "Euler form.",
          "Sums, products and quotients in Cartesian, polar or Euler forms and their geometric interpretation.",
        ],
        lessons: [
          { id: "1.13.1", title: "Lesson 1.13.1" },
          { id: "1.13.2", title: "Lesson 1.13.2" },
          { id: "1.13.3", title: "Lesson 1.13.3" },
        ],
      },
      {
        level: "HL",
        id: "1.14",
        contentItems: [
          "Complex conjugate roots of quadratic and polynomial equations with real coefficients.",
          "De Moivre’s theorem and its extension to rational exponents.",
          "Powers and roots of complex numbers.",
        ],
        lessons: [
          { id: "1.14.1", title: "Lesson 1.14.1" },
          { id: "1.14.2", title: "Lesson 1.14.2" },
          { id: "1.14.3", title: "Lesson 1.14.3" },
        ],
      },
      {
        level: "HL",
        id: "1.15",
        contentItems: [
          "Proof by mathematical induction.",
          "Proof by contradiction.",
          "Use of a counterexample to show that a statement is not always true.",
        ],
        lessons: [
          { id: "1.15.1", title: "Lesson 1.15.1" },
          { id: "1.15.2", title: "Lesson 1.15.2" },
          { id: "1.15.3", title: "Lesson 1.15.3" },
        ],
      },
      {
        level: "HL",
        id: "1.16",
        contentItems: [
          "Solutions of systems of linear equations (a maximum of three equations in three unknowns).",
          "Including cases with a unique solution, an infinite number of solutions, or no solution.",
        ],
        lessons: [
          { id: "1.16.1", title: "Lesson 1.16.1" },
          { id: "1.16.2", title: "Lesson 1.16.2" },
          { id: "1.16.3", title: "Lesson 1.16.3" },
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
      // — SL sections
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
          "Creating a sketch from information given or a context; transferring a graph from screen to paper.",
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
          "Forms \\( a(x-p)(x-q) \\) and \\( a(x-h)^2+k \\); intercepts and vertex.",
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
          "Discriminant \\( \\Delta=b^2-4ac \\) and nature of roots.",
          "The reciprocal function \\( f(x)=1/x \\), \\( x\\ne 0 \\); self-inverse.",
          "Rational functions \\( f(x)=\\frac{ax+b}{cx+d} \\) and their graphs.",
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
          "Exponential functions and their graphs: \\( a^x \\), \\( a>0 \\); \\( e^x \\).",
          "Logarithmic functions and their graphs: \\( \\log_a x \\) (\\( x>0 \\)); \\( \\ln x \\) (\\( x>0 \\)).",
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
          "Applications to real-life situations.",
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
          "Transformations of graphs: translations, stretches, reflections.",
          "Vertical and horizontal stretch.",
        ],
        lessons: [
          { id: "2.11.1", title: "Lesson 2.11.1" },
          { id: "2.11.2", title: "Lesson 2.11.2" },
          { id: "2.11.3", title: "Lesson 2.11.3" },
        ],
      },

      // — HL-only (2.12 … 2.16)
      {
        level: "HL",
        id: "2.12",
        contentItems: [
          "Polynomial functions, their graphs and equations; zeros, roots and factors.",
          "The factor and remainder theorems.",
          "Sum and product of the roots of polynomial equations.",
        ],
        lessons: [
          { id: "2.12.1", title: "Lesson 2.12.1" },
          { id: "2.12.2", title: "Lesson 2.12.2" },
          { id: "2.12.3", title: "Lesson 2.12.3" },
        ],
      },
      {
        level: "HL",
        id: "2.13",
        contentItems: [
          "Rational functions.",
        ],
        lessons: [
          { id: "2.13.1", title: "Lesson 2.13.1" },
          { id: "2.13.2", title: "Lesson 2.13.2" },
          { id: "2.13.3", title: "Lesson 2.13.3" },
        ],
      },
      {
        level: "HL",
        id: "2.14",
        contentItems: [
          "Odd and even functions.",
          "Finding the inverse function, including domain restriction.",
          "Self-inverse functions.",
        ],
        lessons: [
          { id: "2.14.1", title: "Lesson 2.14.1" },
          { id: "2.14.2", title: "Lesson 2.14.2" },
          { id: "2.14.3", title: "Lesson 2.14.3" },
        ],
      },
      {
        level: "HL",
        id: "2.15",
        contentItems: [
          "Solutions of \\( g(x) \\ge f(x) \\), both graphically and analytically.",
        ],
        lessons: [
          { id: "2.15.1", title: "Lesson 2.15.1" },
          { id: "2.15.2", title: "Lesson 2.15.2" },
          { id: "2.15.3", title: "Lesson 2.15.3" },
        ],
      },
      {
        level: "HL",
        id: "2.16",
        contentItems: [
          "Solution of modulus equations and inequalities.",
        ],
        lessons: [
          { id: "2.16.1", title: "Lesson 2.16.1" },
          { id: "2.16.2", title: "Lesson 2.16.2" },
          { id: "2.16.3", title: "Lesson 2.16.3" },
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
      // — SL sections
      {
        id: "3.1",
        contentItems: [
          "The distance between two points in three-dimensional space, and their midpoint.",
          "Volume and surface area of 3D solids (right-pyramid, right cone, sphere, hemisphere and combinations).",
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
          "Definition of \\( \\tan\\theta=\\sin\\theta/\\cos\\theta \\).",
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
          "Relationship between trigonometric ratios.",
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
          "Circular functions \\( \\sin x, \\cos x, \\tan x \\): amplitude, periodic nature, and graphs.",
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

      // — HL-only (3.9 … 3.18)
      {
        level: "HL",
        id: "3.9",
        contentItems: [
          "Definition of the reciprocal trigonometric ratios \\( \\sec\\theta,\\,\\csc\\theta \\) and \\( \\cot\\theta \\).",
          "Pythagorean identities.",
          "The inverse functions \\( f(x)=\\arcsin x,\\ f(x)=\\arccos x,\\ f(x)=\\arctan x \\); their domains and ranges; their graphs.",
        ],
        lessons: [
          { id: "3.9.1", title: "Lesson 3.9.1" },
          { id: "3.9.2", title: "Lesson 3.9.2" },
          { id: "3.9.3", title: "Lesson 3.9.3" },
        ],
      },
      {
        level: "HL",
        id: "3.10",
        contentItems: [
          "Compound angle identities.",
          "Double angle identity for \\( \\tan \\).",
        ],
        lessons: [
          { id: "3.10.1", title: "Lesson 3.10.1" },
          { id: "3.10.2", title: "Lesson 3.10.2" },
          { id: "3.10.3", title: "Lesson 3.10.3" },
        ],
      },
      {
        level: "HL",
        id: "3.11",
        contentItems: [
          "Relationships between trigonometric functions and the symmetry properties of their graphs.",
        ],
        lessons: [
          { id: "3.11.1", title: "Lesson 3.11.1" },
          { id: "3.11.2", title: "Lesson 3.11.2" },
          { id: "3.11.3", title: "Lesson 3.11.3" },
        ],
      },
      {
        level: "HL",
        id: "3.12",
        contentItems: [
          "Concept of a vector; position vectors; displacement vectors.",
          "Representation of vectors using directed line segments.",
          "Base vectors \\( \\mathbf{i},\\mathbf{j},\\mathbf{k} \\).",
          "Components, magnitude, position, and displacement of a vector.",
          "Proofs of geometrical properties using vectors.",
        ],
        lessons: [
          { id: "3.12.1", title: "Lesson 3.12.1" },
          { id: "3.12.2", title: "Lesson 3.12.2" },
          { id: "3.12.3", title: "Lesson 3.12.3" },
        ],
      },
      {
        level: "HL",
        id: "3.13",
        contentItems: [
          "The definition of the scalar product of two vectors.",
          "The angle between two vectors.",
          "Perpendicular vectors; parallel vectors.",
        ],
        lessons: [
          { id: "3.13.1", title: "Lesson 3.13.1" },
          { id: "3.13.2", title: "Lesson 3.13.2" },
          { id: "3.13.3", title: "Lesson 3.13.3" },
        ],
      },
      {
        level: "HL",
        id: "3.14",
        contentItems: [
          "Vector equation of a line in two and three dimensions: \\( \\mathbf{r} = \\mathbf{a} + \\lambda \\mathbf{b} \\).",
          "The angle between two lines.",
          "Simple applications to kinematics.",
        ],
        lessons: [
          { id: "3.14.1", title: "Lesson 3.14.1" },
          { id: "3.14.2", title: "Lesson 3.14.2" },
          { id: "3.14.3", title: "Lesson 3.14.3" },
        ],
      },
      {
        level: "HL",
        id: "3.15",
        contentItems: [
          "Coincident, parallel, intersecting and skew lines; distinguishing between these cases.",
          "Points of intersection.",
        ],
        lessons: [
          { id: "3.15.1", title: "Lesson 3.15.1" },
          { id: "3.15.2", title: "Lesson 3.15.2" },
          { id: "3.15.3", title: "Lesson 3.15.3" },
        ],
      },
      {
        level: "HL",
        id: "3.16",
        contentItems: [
          "The definition of the vector product of two vectors.",
          "Properties of the vector product.",
          "Geometric interpretation of \\( |\\mathbf{v}\\times\\mathbf{w}| \\).",
        ],
        lessons: [
          { id: "3.16.1", title: "Lesson 3.16.1" },
          { id: "3.16.2", title: "Lesson 3.16.2" },
          { id: "3.16.3", title: "Lesson 3.16.3" },
        ],
      },
      {
        level: "HL",
        id: "3.17",
        contentItems: [
          "Vector equations of a plane: \\( \\mathbf{r} = \\mathbf{a} + \\lambda\\mathbf{b} + \\mu\\mathbf{c} \\), where \\( \\mathbf{b} \\) and \\( \\mathbf{c} \\) are non-parallel vectors within the plane.",
          "Cartesian equation of a plane \\( ax+by+cz=d \\).",
          "Plane in normal form \\( \\mathbf{r}\\cdot\\mathbf{n} = a \\), where \\( \\mathbf{n} \\) is a normal to the plane and \\( a \\) is the position vector of a point on the plane.",
        ],
        lessons: [
          { id: "3.17.1", title: "Lesson 3.17.1" },
          { id: "3.17.2", title: "Lesson 3.17.2" },
          { id: "3.17.3", title: "Lesson 3.17.3" },
        ],
      },
      {
        level: "HL",
        id: "3.18",
        contentItems: [
          "Intersections of a line with a plane; two planes; three planes.",
          "Angle between: a line and a plane; two planes.",
        ],
        lessons: [
          { id: "3.18.1", title: "Lesson 3.18.1" },
          { id: "3.18.2", title: "Lesson 3.18.2" },
          { id: "3.18.3", title: "Lesson 3.18.3" },
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
      // — SL sections
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
          "Cumulative frequency; median, quartiles, percentiles, range and IQR.",
          "Box and whisker diagrams.",
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
          "Grouped data; modal class.",
          "Measures of dispersion (IQR, standard deviation, variance).",
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
          "Linear correlation of bivariate data; Pearson correlation coefficient \\( r \\).",
          "Scatter diagrams; line of best fit (by eye) passing through the mean point.",
          "Equation of the regression line of \\( y \\) on \\( x \\); use for prediction.",
          "Interpret \\( a \\) and \\( b \\) in \\( y=ax+b \\).",
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
          "The probability of an event; complementary events \\( A \\) and \\( A' \\).",
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
          "Combined events; mutually exclusive events; conditional probability; independent events.",
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
          "Discrete random variables and their probability distributions.",
          "Expected value (mean) for discrete data; applications.",
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
          "Binomial distribution; mean and variance.",
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
          "The normal distribution and curve; properties; diagrams.",
          "Normal probability calculations; inverse normal calculations.",
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
          "Equation of the regression line of \\( y \\) on \\( x \\); use for prediction.",
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

      // — HL-only (4.13 … 4.14)
      {
        level: "HL",
        id: "4.13",
        contentItems: [
          "Use of Bayes’ theorem for a maximum of three events.",
        ],
        lessons: [
          { id: "4.13.1", title: "Lesson 4.13.1" },
          { id: "4.13.2", title: "Lesson 4.13.2" },
          { id: "4.13.3", title: "Lesson 4.13.3" },
        ],
      },
      {
        level: "HL",
        id: "4.14",
        contentItems: [
          "Variance of a discrete random variable.",
          "Continuous random variables and their probability density functions.",
          "Mode and median of continuous random variables.",
          "Mean, variance and standard deviation of both discrete and continuous random variables.",
          "The effect of linear transformations of \\( X \\).",
        ],
        lessons: [
          { id: "4.14.1", title: "Lesson 4.14.1" },
          { id: "4.14.2", title: "Lesson 4.14.2" },
          { id: "4.14.3", title: "Lesson 4.14.3" },
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
      // — SL sections
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
          "Local maximum and minimum points; testing for extrema.",
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
          "Indefinite integrals; composites; reverse chain rule.",
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
          "Area of a region enclosed by a curve \\( y=f(x) \\) and the \\( x \\)-axis where \\( f(x) \\) can be positive or negative (without technology).",
          "Areas between curves.",
        ],
        lessons: [
          { id: "5.11.1", title: "Lesson 5.11.1" },
          { id: "5.11.2", title: "Lesson 5.11.2" },
          { id: "5.11.3", title: "Lesson 5.11.3" },
        ],
      },

      // — HL-only (5.12 … 5.19)
      {
        level: "HL",
        id: "5.12",
        contentItems: [
          "Informal understanding of continuity and differentiability of a function at a point.",
          "Understanding of limits (convergence and divergence).",
          "Higher derivatives.",
        ],
        lessons: [
          { id: "5.12.1", title: "Lesson 5.12.1" },
          { id: "5.12.2", title: "Lesson 5.12.2" },
          { id: "5.12.3", title: "Lesson 5.12.3" },
        ],
      },
      {
        level: "HL",
        id: "5.13",
        contentItems: [
          "Evaluation of limits.",
          "Repeated use of L’Hôpital’s rule.",
        ],
        lessons: [
          { id: "5.13.1", title: "Lesson 5.13.1" },
          { id: "5.13.2", title: "Lesson 5.13.2" },
          { id: "5.13.3", title: "Lesson 5.13.3" },
        ],
      },
      {
        level: "HL",
        id: "5.14",
        contentItems: [
          "Implicit differentiation.",
          "Related rates of change.",
          "Optimization problems.",
        ],
        lessons: [
          { id: "5.14.1", title: "Lesson 5.14.1" },
          { id: "5.14.2", title: "Lesson 5.14.2" },
          { id: "5.14.3", title: "Lesson 5.14.3" },
        ],
      },
      {
        level: "HL",
        id: "5.15",
        contentItems: [
          "Derivatives of \\( \\tan x,\\ \\sec x,\\ \\csc x,\\ \\cot x,\\ x^{x},\\ \\log_a x,\\ \\arcsin x,\\ \\arccos x,\\ \\arctan x \\).",
          "Indefinite integrals of the derivatives of any of the above functions.",
          "The composites of any of the above with a linear function.",
          "Use of partial fractions to rearrange the integrand.",
        ],
        lessons: [
          { id: "5.15.1", title: "Lesson 5.15.1" },
          { id: "5.15.2", title: "Lesson 5.15.2" },
          { id: "5.15.3", title: "Lesson 5.15.3" },
        ],
      },
      {
        level: "HL",
        id: "5.16",
        contentItems: [
          "Integration by substitution.",
          "Integration by parts.",
          "Repeated integration by parts.",
        ],
        lessons: [
          { id: "5.16.1", title: "Lesson 5.16.1" },
          { id: "5.16.2", title: "Lesson 5.16.2" },
          { id: "5.16.3", title: "Lesson 5.16.3" },
        ],
      },
      {
        level: "HL",
        id: "5.17",
        contentItems: [
          "Area of the region enclosed by a curve and the \\( y \\)-axis in a given interval.",
          "Volumes of revolution about the \\( x \\)-axis or \\( y \\)-axis.",
        ],
        lessons: [
          { id: "5.17.1", title: "Lesson 5.17.1" },
          { id: "5.17.2", title: "Lesson 5.17.2" },
          { id: "5.17.3", title: "Lesson 5.17.3" },
        ],
      },
      {
        level: "HL",
        id: "5.18",
        contentItems: [
          "First order differential equations.",
          "Numerical solution of \\( dy/dx = f(x,y) \\) using Euler’s rule.",
          "Variables separable.",
          "Homogeneous differential equation \\( dy/dx = f(y/x) \\) using the substitution \\( y=vx \\).",
          "Solution of \\( y' + P(x)y = Q(x) \\), using the integrating factor.",
        ],
        lessons: [
          { id: "5.18.1", title: "Lesson 5.18.1" },
          { id: "5.18.2", title: "Lesson 5.18.2" },
          { id: "5.18.3", title: "Lesson 5.18.3" },
        ],
      },
      {
        level: "HL",
        id: "5.19",
        contentItems: [
          "Maclaurin series to obtain expansions for \\( e^x,\\ \\sin x,\\ \\cos x,\\ \\ln(1+x),\\ (1+x)^p,\\ p\\in\\mathbb{Q} \\).",
          "Use of simple substitution, products, integration, differentiation to obtain other series.",
          "Maclaurin series developed from differential equation.",
        ],
        lessons: [
          { id: "5.19.1", title: "Lesson 5.19.1" },
          { id: "5.19.2", title: "Lesson 5.19.2" },
          { id: "5.19.3", title: "Lesson 5.19.3" },
        ],
      },
    ],
  },
];
