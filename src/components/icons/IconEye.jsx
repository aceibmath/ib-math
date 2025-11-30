// src/components/icons/IconEye.jsx

export default function IconEye({ className, ...props }) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...props}
      fill="none" stroke="currentColor" strokeWidth="3"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 32C10 20 20 12 32 12s22 8 28 20c-6 12-16 20-28 20S10 44 4 32z" />
      <circle cx="32" cy="32" r="8" />
      <circle cx="32" cy="32" r="3" fill="currentColor" />
    </svg>
  );
}
