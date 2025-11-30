export default function IconCalculatorOff({ className, ...props }) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...props}
      fill="none" stroke="currentColor" strokeWidth="3"
      strokeLinecap="round" strokeLinejoin="round">
      <rect x="10" y="8" width="44" height="48" rx="6" ry="6" />
      <rect x="16" y="14" width="32" height="10" rx="2" ry="2" />
      <circle cx="20" cy="30" r="1.5" />
      <circle cx="28" cy="30" r="1.5" />
      <circle cx="36" cy="30" r="1.5" />
      <circle cx="44" cy="30" r="1.5" />
      <circle cx="20" cy="36" r="1.5" />
      <circle cx="28" cy="36" r="1.5" />
      <circle cx="36" cy="36" r="1.5" />
      <circle cx="44" cy="36" r="1.5" />
      <line x1="14" y1="12" x2="50" y2="52" />
      <line x1="50" y1="12" x2="14" y2="52" />
    </svg>
  );
}
