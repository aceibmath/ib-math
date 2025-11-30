// src/components/icons/IconStar.jsx
export default function IconStar({ className, filled = false, ...props }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      {...props}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="32,10 38,24 52,24 41,33 45,48 32,39 19,48 23,33 12,24 26,24" />
    </svg>
  );
}
