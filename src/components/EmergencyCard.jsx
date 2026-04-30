import { Link } from 'react-router-dom'
import { BloodGroupBadge } from './BloodGroupBadge.jsx'
import { minutesAgoLabel, ageIntensity } from '../lib/time.js'

export function EmergencyCard({ req, onContact }) {
  return (
    <div className="card p-4 card-hover">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <BloodGroupBadge group={req.bloodGroup} size="lg" />
            <span className={`badge ring-1 ring-inset ${ageIntensity(req.createdAt)}`}>
              {minutesAgoLabel(req.createdAt)}
            </span>
          </div>
          <div className="mt-2 text-sm font-semibold text-slate-900">
            {req.location}
          </div>
          <div className="mt-1 text-sm text-slate-600">
            City: <span className="font-semibold text-slate-900">{req.city}</span>
            {req.patientName ? (
              <>
                {' '}
                • Patient: <span className="font-semibold text-slate-900">{req.patientName}</span>
              </>
            ) : null}
          </div>
        </div>
        <Link className="btn btn-ghost" to={`/requests/${req.id}`}>
          Details
        </Link>
      </div>

      {req.note ? <p className="mt-3 text-sm text-slate-600">{req.note}</p> : null}

      <div className="mt-4">
        <button className="btn btn-primary w-full" type="button" onClick={() => onContact?.(req)}>
          Contact Now
        </button>
      </div>
    </div>
  )
}
