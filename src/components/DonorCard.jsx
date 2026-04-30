import { useState } from 'react'
import { BloodGroupBadge } from './BloodGroupBadge.jsx'
import { AvailabilityBadge } from './AvailabilityBadge.jsx'
import { ContactConfirmModal } from './ContactConfirmModal.jsx'

function initials(name) {
  const s = (name || '').trim()
  if (!s) return '?'
  const parts = s.split(/\s+/).slice(0, 2)
  return parts.map((p) => p[0]?.toUpperCase()).join('')
}

export function DonorCard({ donor }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="card p-4 card-hover">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-50 ring-1 ring-slate-200 text-sm font-bold text-slate-700">
              {initials(donor.name)}
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-bold text-slate-900">{donor.name}</div>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <BloodGroupBadge group={donor.bloodGroup} />
                <AvailabilityBadge available={donor.available} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 text-sm text-slate-600">
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold text-slate-900">{donor.city}</span>
            {donor.distanceKm != null ? (
              <span className="text-xs text-slate-500">{donor.distanceKm} km</span>
            ) : null}
          </div>
        </div>

        <div className="mt-4">
          <button className="btn btn-ghost w-full" type="button" onClick={() => setOpen(true)}>
            Contact Donor
          </button>
        </div>
      </div>

      <ContactConfirmModal
        open={open}
        subjectLabel={`${donor.name} • ${donor.bloodGroup} • ${donor.city}`}
        phoneNumber={donor.phone}
        onClose={() => setOpen(false)}
      />
    </>
  )
}
