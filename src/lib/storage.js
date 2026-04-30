const KEY = 'raktasetu:v1'

function safeParse(json, fallback) {
  try {
    return JSON.parse(json)
  } catch {
    return fallback
  }
}

export function loadState() {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(KEY)
  if (!raw) return null
  return safeParse(raw, null)
}

export function saveState(state) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(KEY, JSON.stringify(state))
}

export function clearState() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(KEY)
}
