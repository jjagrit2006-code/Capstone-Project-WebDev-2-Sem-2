import { Link } from 'react-router-dom'
import { useState } from 'react'
import { getMe, toggleMyAvailability } from '../lib/mockDb.js'
import { usePolling } from '../lib/usePolling.js'
import { SkeletonCard } from '../components/SkeletonCard.jsx'
import { BloodGroupBadge } from '../components/BloodGroupBadge.jsx'
import { AvailabilityBadge } from '../components/AvailabilityBadge.jsx'
import { useToast } from '../components/useToast.js'
import { minutesAgoLabel } from '../lib/time.js'

export function Dashboard() {
  const { push } = useToast()
  const { data: me, loading, refresh } = usePolling(() => getMe(), {
    intervalMs: 20000,
    enabled: true,
  })
  const [busy, setBusy] = useState(false)

  const onToggle = async () => {
    if (!me) return
    setBusy(true)
    try {
      await toggleMyAvailability(!me.donorAvailable)
      push({
        tone: 'success',
        title: me.donorAvailable ? 'Marked unavailable' : 'Marked available',
        message: 'You can update this anytime.',
      })
      refresh()
    } catch {
      push({ tone: 'error', title: 'Could not update availability', message: 'Please try again.' })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="container-app py-6 md:py-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
          <p className="mt-2 text-slate-600">Manage your donor availability and activity.</p>
        </div>
        <button className="btn btn-ghost" type="button" onClick={refresh}>
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <SkeletonCard lines={5} />
          <SkeletonCard lines={5} />
        </div>
      ) : me ? (
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <div className="card p-6">
            <div className="text-sm font-semibold text-slate-600">Availability</div>
            <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl bg-slate-50 ring-1 ring-slate-200 p-4">
              <div>
                <div className="text-lg font-bold text-slate-900">
                  {me.donorAvailable ? 'Available now' : 'Not available'}
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  Last updated {minutesAgoLabel(me.lastUpdatedAt)}.
                </div>
              </div>
              <button className="btn btn-primary" type="button" disabled={busy} onClick={onToggle}>
                {busy ? 'Updating…' : me.donorAvailable ? 'Turn OFF' : 'Turn ON'}
              </button>
            </div>
            <div className="mt-3 text-xs text-slate-500">
              This is self-reported availability. Please keep it accurate.
            </div>
          </div>

          <div className="card p-6">
            <div className="text-sm font-semibold text-slate-600">Your profile</div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <div className="text-base font-bold text-slate-900">{me.name}</div>
              <BloodGroupBadge group={me.bloodGroup} />
              <AvailabilityBadge available={me.donorAvailable} />
            </div>
            <div className="mt-3 text-sm text-slate-600">
              City: <span className="font-semibold text-slate-900">{me.city}</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link to="/my-requests" className="btn btn-ghost">
                My Posted Requests
              </Link>
              <Link to="/donors" className="btn btn-primary">
                Search Donors
              </Link>
            </div>
          </div>

          <div className="card p-6 md:col-span-2">
            <div className="flex items-end justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-slate-600">Availability history</div>
                <div className="mt-1 text-sm text-slate-600">Recent updates (simulated, last ~60).</div>
              </div>
            </div>
            <div className="mt-4 grid gap-2">
              {(me.availabilityHistory || []).slice(0, 7).map((h) => (
                <div key={h.at} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 ring-1 ring-slate-200 px-3 py-2">
                  <div className="text-sm font-semibold text-slate-900">
                    {h.available ? 'Available' : 'Not available'}
                  </div>
                  <div className="text-xs text-slate-500">{minutesAgoLabel(h.at)}</div>
                </div>
              ))}
              {(!me.availabilityHistory || me.availabilityHistory.length === 0) ? (
                <div className="text-sm text-slate-600">No history yet. Toggle availability to start.</div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
