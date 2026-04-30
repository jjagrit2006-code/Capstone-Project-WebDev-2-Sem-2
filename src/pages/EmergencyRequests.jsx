import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { usePolling } from '../lib/usePolling.js'
import { listRequests } from '../lib/mockDb.js'
import { EmergencyCard } from '../components/EmergencyCard.jsx'
import { SkeletonCard } from '../components/SkeletonCard.jsx'
import { EmptyState } from '../components/EmptyState.jsx'
import { ContactConfirmModal } from '../components/ContactConfirmModal.jsx'

export function EmergencyRequests() {
  const [sort, setSort] = useState('newest')
  const { data, loading, refresh } = usePolling(() => listRequests({ sort }), {
    intervalMs: 12000,
    enabled: true,
  })

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort])

  const [contact, setContact] = useState(null)

  return (
    <div className="container-app py-6 md:py-10">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Active Emergency Requests
          </h1>
          <p className="mt-2 text-slate-600">
            Simulated updates (polling / refresh). No hospital integration.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            Sort
            <select className="input !w-auto" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="urgent">Most Urgent</option>
            </select>
          </label>
          <button className="btn btn-ghost" type="button" onClick={refresh}>
            Refresh
          </button>
          <Link className="btn btn-primary hidden md:inline-flex" to="/requests/new">
            + Post New Request
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : data?.length ? (
          data.map((r) => <EmergencyCard key={r.id} req={r} onContact={(req) => setContact(req)} />)
        ) : (
          <div className="md:col-span-2">
            <EmptyState
              title="No active requests right now"
              description="Be the first to post one. We’re all here to help each other."
              actionLabel="Post New Request"
              actionTo="/requests/new"
              secondaryLabel="Search donors"
              secondaryTo="/donors"
            />
          </div>
        )}
      </div>

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
