export default function IconPlay({ className, ...props }) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...props}
      fill="none" stroke="currentColor" strokeWidth="3"
      strokeLinecap="round" strokeLinejoin="round">
      <circle cx="32" cy="32" r="24" />
      <polygon points="27,22 27,42 43,32" fill="none" />
    </svg>
  );
}
