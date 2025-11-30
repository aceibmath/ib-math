export default function ResourceRow({ href="#", title, desc, icon="bi-journal-text", locked=false }) {
  return (
    <a
      href={href}
      className="group block rounded-lg border border-slate-200 bg-sky-50/60 hover:bg-sky-100 transition-colors"
    >
      <div className="flex items-center gap-4 p-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white border border-slate-200">
          <i className={`bi ${icon} text-xl`} />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {locked && <i className="bi bi-lock-fill text-slate-400" aria-label="Locked" />}
            <span className="text-lg font-semibold text-sky-900 group-hover:underline">{title}</span>
          </div>
          {desc && <p className="text-slate-600 text-sm">{desc}</p>}
        </div>
      </div>
    </a>
  );
}
