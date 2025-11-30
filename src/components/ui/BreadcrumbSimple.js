export default function BreadcrumbSimple({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="list-none p-0 m-0 flex flex-wrap items-center gap-2 text-sm text-slate-500">
        {items.map((it, i) => (
          <li key={i} className="flex items-center">
            {i > 0 && <span className="mx-2">/</span>}
            {it.href ? (
              <a href={it.href} className="hover:text-slate-700">{it.label}</a>
            ) : (
              <span className="text-slate-700">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
