export default function PredictionExamsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
      <h2 className="text-2xl font-bold mb-4">Prediction Exams</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {["Mock A","Mock B","Revision Ladder"].map((t,i)=>(
          <div key={i} className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-semibold">{t}</h3>
              <span className="badge-premium-soft">New</span>
            </div>
            <p className="text-sm text-slate-600">Full-length exam with markscheme.</p>
            <a href="#" className="mt-3 inline-flex items-center gap-2">Start <i className="bi bi-arrow-right" /></a>
          </div>
        ))}
      </div>
    </div>
  );
}
