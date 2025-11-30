export default function AssessmentsPage() {
  const rows = [
    {title:"Topic Test – Functions", status:"Available"},
    {title:"Quiz – Exponentials", status:"Locked"},
    {title:"Topic Test – Statistics", status:"Coming soon"},
  ];
  const badge = (s) => (
    <span className={`rounded-full border px-2 py-0.5 text-xs
      ${s==="Available" ? "bg-emerald-50 border-emerald-200 text-emerald-900" :
        s==="Locked" ? "bg-slate-50 border-slate-200 text-slate-700" :
        "bg-amber-50 border-amber-200 text-amber-900"}`}>
      {s}
    </span>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
      <h2 className="text-2xl font-bold mb-4">Assessments</h2>
      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Assessment</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {rows.map((r,i)=>(
              <tr key={i}>
                <td className="px-4 py-3">{r.title}</td>
                <td className="px-4 py-3">{badge(r.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
