export default function TeacherLessonsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6 py-6">
      <h2 className="text-2xl font-bold mb-4">Teacher Lessons</h2>
      <div className="grid gap-6 md:grid-cols-[260px,1fr]">
        <aside className="rounded-xl border bg-white p-4 shadow-sm left-rail">
          <h3 className="mb-3 font-semibold">Filters</h3>
          <label className="block text-sm text-slate-600 mb-1">Topic</label>
          <select className="w-full rounded-lg border-slate-300 mb-3">
            <option>All</option><option>Algebra</option><option>Functions</option>
          </select>
          <label className="block text-sm text-slate-600 mb-1">Format</label>
          <div className="space-y-2 text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" /> PPTX</label>
            <label className="flex items-center gap-2"><input type="checkbox" /> PDF</label>
          </div>
        </aside>

        <main className="space-y-3">
          {Array.from({length:5}).map((_,i)=>(
            <div key={i} className="rounded-xl border bg-white p-4 shadow-sm">
              <h3 className="font-semibold">Lesson {i+1} – Placeholder</h3>
              <p className="text-sm text-slate-600">Slide deck + worksheet + answers.</p>
              <div className="mt-2 flex gap-3">
                <a className="rounded-lg border px-3 py-1.5" href="#">Preview</a>
                <a className="rounded-lg border px-3 py-1.5" href="#">Download</a>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
