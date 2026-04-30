import { Link } from 'react-router-dom'

export function EmptyState({
  title,
  description,
  actionLabel,
  actionTo,
  secondaryLabel,
  secondaryTo,
}) {
  return (
    <div className="card p-6 md:p-10 text-left">
      <div className="flex items-start gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-50 ring-1 ring-slate-200">
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-slate-600" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-11V7l-8-4-8 4v4c0 7 8 11 8 11Z" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="text-base font-bold text-slate-900">{title}</div>
          <div className="mt-1 text-sm text-slate-600">{description}</div>
          {(actionLabel && actionTo) || (secondaryLabel && secondaryTo) ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {actionLabel && actionTo ? (
                <Link className="btn btn-primary" to={actionTo}>
                  {actionLabel}
                </Link>
              ) : null}
              {secondaryLabel && secondaryTo ? (
                <Link className="btn btn-ghost" to={secondaryTo}>
                  {secondaryLabel}
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
