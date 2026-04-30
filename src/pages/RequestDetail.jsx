import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { getRequestById } from '../lib/mockDb.js'
import { usePolling } from '../lib/usePolling.js'
import { SkeletonCard } from '../components/SkeletonCard.jsx'
import { EmptyState } from '../components/EmptyState.jsx'
import { BloodGroupBadge } from '../components/BloodGroupBadge.jsx'
import { minutesAgoLabel, ageIntensity } from '../lib/time.js'
import { ContactConfirmModal } from '../components/ContactConfirmModal.jsx'

export function RequestDetail() {
  const { id } = useParams()
  const { data: req, loading } = usePolling(() => getRequestById(id), {
    intervalMs: 15000,
    enabled: true,
  })
  const [open, setOpen] = useState(false)

  return (
    <div className="container-app py-6 md:py-10">
      <div className="mb-4">
        <Link className="btn btn-ghost" to="/requests">
          ← Back
        </Link>
      </div>
      {loading ? (
        <SkeletonCard lines={5} />
      ) : req ? (
        <>
          <div className="card p-6 md:p-10 animate-fadeUp">
            <div className="flex flex-wrap items-center gap-2">
              <BloodGroupBadge group={req.bloodGroup} size="lg" />
              <span className={`badge ring-1 ring-inset ${ageIntensity(req.createdAt)}`}>
                {minutesAgoLabel(req.createdAt)}
              </span>
              <span className="badge bg-slate-50 text-slate-700 ring-slate-200">{req.urgency}</span>
            </div>

            <h1 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              {req.location}
            </h1>
            <div className="mt-2 text-slate-600">
              City: <span className="font-semibold text-slate-900">{req.city}</span>
              {req.patientName ? (
                <>
                  {' '}
                  • Patient: <span className="font-semibold text-slate-900">{req.patientName}</span>
                </>
              ) : null}
            </div>

            {req.note ? (
              <div className="mt-5 rounded-2xl bg-slate-50 ring-1 ring-slate-200 p-4 text-sm text-slate-700">
                <div className="text-sm font-semibold text-slate-900">Note</div>
                <p className="mt-1">{req.note}</p>
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-2">
              <button className="btn btn-primary" type="button" onClick={() => setOpen(true)}>
                Contact Now
              </button>
              <Link className="btn btn-ghost" to="/requests">
                Back to feed
              </Link>
            </div>

            <div className="mt-4 text-xs text-slate-500">
              Safety note: Please be respectful. Do not share this number publicly.
            </div>
          </div>

          <ContactConfirmModal
            open={open}
            subjectLabel={`Emergency request • ${req.bloodGroup} • ${req.city}`}
            phoneNumber={req.contactNumber}
            onClose={() => setOpen(false)}
          />
        </>
      ) : (
        <EmptyState
          title="Request not found"
          description="This request may have been removed or the link may be incorrect."
          actionLabel="Back to requests"
          actionTo="/requests"
          secondaryLabel="Home"
          secondaryTo="/"
        />
      )}
    </div>
  )
}
