export default function PastPapersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
      <h2 className="text-2xl font-bold mb-4">Past Papers</h2>

      <div className="mb-3">
        <input className="w-full rounded-lg border-slate-300" placeholder="Search paper / year / timezone…" />
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Year</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Paper</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">TZ</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Solutions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {[{y:2023,p:"Paper 1",tz:"TZ2"},{y:2022,p:"Paper 2",tz:"TZ1"}].map((r,i)=>(
              <tr key={i}>
                <td className="px-4 py-3">{r.y}</td>
                <td className="px-4 py-3">{r.p}</td>
                <td className="px-4 py-3">{r.tz}</td>
                <td className="px-4 py-3">
                  <a className="hover:underline" href="#">PDF</a>
                  <span className="mx-2 text-slate-400">·</span>
                  <a className="hover:underline" href="#">Video</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex justify-between">
        <button className="rounded-lg border px-3 py-1.5">Previous</button>
        <button className="rounded-lg border px-3 py-1.5">Next</button>
      </div>
    </div>
  );
}
