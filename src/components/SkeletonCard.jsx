export function SkeletonCard({ lines = 3 }) {
  return (
    <div className="card p-4">
      <div className="animate-pulse">
        <div className="h-4 w-24 rounded bg-slate-200/70" />
        <div className="mt-3 h-3 w-48 rounded bg-slate-200/70" />
        <div className="mt-4 grid gap-2">
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className={`h-3 rounded bg-slate-200/70 ${i === lines - 1 ? 'w-32' : 'w-full'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
