// src/components/problem/ProblemRowAISL.jsx
import ProblemRowBase from "./ProblemRowBase";

export default function ProblemRowAISL(props) {
  return (
    <ProblemRowBase
      {...props}
      themeClassHeader="
        bg-[#FFFBEB]
        text-teal-900
        border-b border-[#FEF3C7]
      "
      themeRingColor="ring-amber-400/40"
    />
  );
}
