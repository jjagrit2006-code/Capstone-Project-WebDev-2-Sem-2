export function AvailabilityBadge({ available }) {
  if (available) {
    return (
      <span className="badge bg-emerald-50 text-emerald-700 ring-emerald-200">
        Available now
      </span>
    )
  }
  return (
    <span className="badge bg-slate-50 text-slate-600 ring-slate-200">
      Not available
    </span>
  )
}
