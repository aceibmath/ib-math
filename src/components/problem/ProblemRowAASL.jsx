// src/components/problem/ProblemRowAASL.jsx
"use client";

import ProblemRowBase from "./ProblemRowBase";

export default function ProblemRowAASL(props) {
  return (
    <ProblemRowBase
      {...props}
      // pentru AA SL putem folosi direct stilurile implicite din CSS,
      // deci lăsăm themeClassHeader gol.
      themeClassHeader=""
    />
  );
}
