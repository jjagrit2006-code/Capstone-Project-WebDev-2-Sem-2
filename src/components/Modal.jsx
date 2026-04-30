import { useEffect } from 'react'

export function Modal({ open, title, description, children, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <button
        className="absolute inset-0 bg-slate-900/35"
        aria-label="Close dialog"
        onClick={() => onClose?.()}
        type="button"
      />
      <div className="relative mx-auto w-full max-w-lg px-4 pt-24 pb-6">
        <div className="card p-5 md:p-6 shadow-card animate-pop">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-lg font-bold tracking-tight text-slate-900">{title}</div>
              {description ? <div className="mt-1 text-sm text-slate-600">{description}</div> : null}
            </div>
            <button className="btn btn-ghost px-3 py-2" onClick={() => onClose?.()} type="button">
              Close
            </button>
          </div>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  )
}
