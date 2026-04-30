import { useCallback, useMemo, useState } from 'react'
import { ToastContext } from './toastContext.js'

function ToastItem({ t, onDismiss }) {
  const tone =
    t.tone === 'error'
      ? 'bg-rose-50 text-rose-800 ring-rose-200'
      : t.tone === 'success'
        ? 'bg-emerald-50 text-emerald-800 ring-emerald-200'
        : 'bg-slate-50 text-slate-800 ring-slate-200'

  return (
    <div className={`card px-4 py-3 ring-1 ${tone}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">{t.title}</div>
          {t.message ? <div className="mt-0.5 text-sm text-slate-700">{t.message}</div> : null}
        </div>
        <button className="btn btn-ghost px-3 py-2" type="button" onClick={() => onDismiss(t.id)}>
          Dismiss
        </button>
      </div>
    </div>
  )
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((xs) => xs.filter((x) => x.id !== id))
  }, [])

  const push = useCallback((t) => {
    const id = `${Date.now()}_${Math.random().toString(16).slice(2)}`
    const toast = { id, tone: 'info', ...t }
    setToasts((xs) => [toast, ...xs].slice(0, 3))
    window.setTimeout(() => dismiss(id), toast.durationMs ?? 3500)
  }, [dismiss])

  const api = useMemo(() => ({ push }), [push])

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="fixed right-4 top-20 z-50 w-[calc(100%-2rem)] max-w-sm space-y-2">
        {toasts.map((t) => (
          <ToastItem key={t.id} t={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}
