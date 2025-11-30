// src/components/problem/ProblemRowAIHL.jsx
import ProblemRowBase from "./ProblemRowBase";

export default function ProblemRowAIHL(props) {
  return (
    <ProblemRowBase
      {...props}
      themeClassHeader="
        bg-[#ECFEFF]
        text-teal-900
        border-b border-[#CFFAFE]
      "
      themeRingColor="ring-cyan-400/40"
    />
  );
}
