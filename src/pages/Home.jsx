import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { listRequests } from '../lib/mockDb.js'
import { usePolling } from '../lib/usePolling.js'
import { SkeletonCard } from '../components/SkeletonCard.jsx'
import { EmptyState } from '../components/EmptyState.jsx'
import { EmergencyCard } from '../components/EmergencyCard.jsx'
import { ContactConfirmModal } from '../components/ContactConfirmModal.jsx'

export function Home() {
  const { data, loading, refresh } = usePolling(() => listRequests({ sort: 'newest' }), {
    intervalMs: 15000,
    enabled: true,
  })

  const items = useMemo(() => (data || []).slice(0, 4), [data])
  const [contact, setContact] = useState(null)

  return (
    <div className="container-app py-6 md:py-10">
      <section className="card p-6 md:p-10 animate-fadeUp">
        <div className="inline-flex items-center gap-2 rounded-full bg-emergency-50 px-3 py-1 text-xs font-semibold text-emergency-700 ring-1 ring-inset ring-emergency-200">
          Local community support
        </div>
        <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
          Find Blood Donors Near You — Fast
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Local community helping in emergencies. This platform connects people locally and is not a
          hospital or real-time medical system.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link className="btn btn-primary" to="/donors">
            Find a Donor
          </Link>
          <Link className="btn btn-ghost" to="/requests/new">
            Post Emergency Request
          </Link>
          <button className="btn btn-ghost" type="button" onClick={refresh}>
            Refresh
          </button>
        </div>
      </section>

      <section className="mt-6 md:mt-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Latest Emergency Requests</h2>
            <p className="text-sm text-slate-600">A few recent requests in the community.</p>
          </div>
          <Link className="btn btn-ghost" to="/requests">
            View All
          </Link>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : items.length ? (
            items.map((req) => (
              <EmergencyCard key={req.id} req={req} onContact={(r) => setContact(r)} />
            ))
          ) : (
            <EmptyState
              title="No requests yet"
              description="No active requests right now. If you need help, you can post an emergency request."
              actionLabel="Post Emergency Request"
              actionTo="/requests/new"
              secondaryLabel="Find donors"
              secondaryTo="/donors"
            />
          )}
        </div>
      </section>

      <ContactConfirmModal
        open={!!contact}
        subjectLabel={
          contact ? `Emergency request • ${contact.bloodGroup} • ${contact.city}` : ''
        }
        phoneNumber={contact?.contactNumber}
        onClose={() => setContact(null)}
      />
    </div>
  )
}
