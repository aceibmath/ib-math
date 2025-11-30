export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl p-6 animate-pulse">
      <div className="h-5 w-40 bg-gray-200 rounded mb-2" />
      <div className="h-8 w-96 bg-gray-200 rounded mb-6" />
      <div className="space-y-3">
        <div className="h-24 bg-gray-100 rounded" />
        <div className="h-24 bg-gray-100 rounded" />
        <div className="h-24 bg-gray-100 rounded" />
      </div>
    </div>
  );
}
