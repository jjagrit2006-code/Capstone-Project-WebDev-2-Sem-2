import { useEffect, useState } from 'react'

export function usePolling(fetcher, { intervalMs = 12000, enabled = true } = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!enabled) return
    let cancelled = false

    Promise.resolve()
      .then(() => fetcher())
      .then((res) => {
        if (cancelled) return
        setData(res)
        setLoading(false)
      })
      .catch((e) => {
        if (cancelled) return
        setError(e)
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [enabled, tick, fetcher])

  useEffect(() => {
    if (!enabled) return
    const id = window.setInterval(() => setTick((x) => x + 1), intervalMs)
    return () => window.clearInterval(id)
  }, [enabled, intervalMs])

  const refresh = () => {
    setLoading(true)
    setError(null)
    setTick((x) => x + 1)
  }

  return { data, loading, error, refresh }
}
