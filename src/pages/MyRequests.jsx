import { useMemo, useState } from 'react'
import { listRequests, getMe } from '../lib/mockDb.js'
import { usePolling } from '../lib/usePolling.js'
import { SkeletonCard } from '../components/SkeletonCard.jsx'
import { EmptyState } from '../components/EmptyState.jsx'
import { EmergencyCard } from '../components/EmergencyCard.jsx'
import { ContactConfirmModal } from '../components/ContactConfirmModal.jsx'

export function MyRequests() {
  const { data: me } = usePolling(() => getMe(), { intervalMs: 30000, enabled: true })
  const { data, loading, refresh } = usePolling(() => listRequests({ sort: 'newest' }), {
    intervalMs: 15000,
    enabled: true,
  })

  const mine = useMemo(() => {
    const userId = me?.id
    if (!userId) return []
    return (data || []).filter((r) => r.createdByUserId === userId)
  }, [data, me?.id])

  const [contact, setContact] = useState(null)

  return (
    <div className="container-app py-6 md:py-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">My Requests</h1>
          <p className="mt-2 text-slate-600">Requests you posted from this device.</p>
        </div>
        <button className="btn btn-ghost" type="button" onClick={refresh}>
          Refresh
        </button>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : mine.length ? (
          mine.map((r) => <EmergencyCard key={r.id} req={r} onContact={(req) => setContact(req)} />)
        ) : (
          <div className="md:col-span-2">
            <EmptyState
              title="No posted requests yet"
              description="If you need blood urgently, you can post a request. Keep details short and accurate."
              actionLabel="Post New Request"
              actionTo="/requests/new"
              secondaryLabel="Browse requests"
              secondaryTo="/requests"
            />
          </div>
        )}
      </div>

      <ContactConfirmModal
        open={!!contact}
        subjectLabel={contact ? `Your request • ${contact.bloodGroup} • ${contact.city}` : ''}
        phoneNumber={contact?.contactNumber}
        onClose={() => setContact(null)}
      />
    </div>
  )
}
