export default function IconTutor({ className, ...props }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* pălăria tip mortarboard exact ca în poza ta */}
      <polygon points="8,26 32,14 56,26 32,38 8,26" />

      {/* cilindrul de sub pălărie (partea de jos, arc rotunjit) */}
      <path d="M20 40c0 8 24 8 24 0" />

      {/* ciucurele din dreapta - identic cu exemplul tău */}
      <line x1="48" y1="26" x2="48" y2="44" />
      <circle cx="48" cy="49" r="3" />
    </svg>
  );
}
