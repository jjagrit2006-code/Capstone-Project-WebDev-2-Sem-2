const COLOR = {
  'A+': 'bg-rose-50 text-rose-700 ring-rose-200',
  'A-': 'bg-rose-50 text-rose-700 ring-rose-200',
  'B+': 'bg-red-50 text-red-700 ring-red-200',
  'B-': 'bg-red-50 text-red-700 ring-red-200',
  'AB+': 'bg-pink-50 text-pink-700 ring-pink-200',
  'AB-': 'bg-pink-50 text-pink-700 ring-pink-200',
  'O+': 'bg-emergency-50 text-emergency-700 ring-emergency-200',
  'O-': 'bg-emergency-50 text-emergency-700 ring-emergency-200',
}

export function BloodGroupBadge({ group, size = 'md' }) {
  const cls = COLOR[group] || 'bg-slate-50 text-slate-700 ring-slate-200'
  const sz = size === 'lg' ? 'text-sm px-3 py-1.5' : 'text-xs px-2.5 py-1'
  return (
    <span className={`badge ${sz} ring-1 ring-inset ${cls}`}>
      {group}
    </span>
  )
}
