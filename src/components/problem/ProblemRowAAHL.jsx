// src/components/problem/ProblemRowAAHL.jsx
import ProblemRowBase from "./ProblemRowBase";

export default function ProblemRowAAHL(props) {
  return (
    <ProblemRowBase
      {...props}
      themeClassHeader="
        bg-[#F3E8FF]
        text-teal-900
        border-b border-[#EDE9FE]
      "
      themeRingColor="ring-purple-400/40"
    />
  );
}
