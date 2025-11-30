export default function IconDocument({ className, ...props }) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...props}
      fill="none" stroke="currentColor" strokeWidth="3"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8h24l8 8v32a8 8 0 0 1-8 8H16a8 8 0 0 1-8-8V16a8 8 0 0 1 8-8z" />
      <polyline points="40,8 40,16 48,16" />
      <line x1="20" y1="24" x2="40" y2="24" />
      <line x1="20" y1="30" x2="38" y2="30" />
      <line x1="20" y1="36" x2="36" y2="36" />
      <line x1="20" y1="42" x2="32" y2="42" />
    </svg>
  );
}
