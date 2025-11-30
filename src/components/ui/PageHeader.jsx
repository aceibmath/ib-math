// src/components/ui/PageHeader.jsx
// Wrapper standard pentru partea de sus a paginii:
// - distanță față de header: mt-[10px]
// - container central: max-w-[1280px] cu padding lateral
// - fundal alb pe pagină
// - spațiu standard între cardul de titlu și conținut: 8px (md: 12px)

export default function PageHeader({ children }) {
  return (
    <div className="min-h-[calc(100vh-var(--header-offset,72px))] bg-white">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 mt-[10px]">
        {/* spațiu vertical standard între elementele plasate în header (ex: TitleCard + content imediat dedesubt) */}
        <div className="space-y-2 md:space-y-3">
          {children}
        </div>
      </div>
    </div>
  );
}
