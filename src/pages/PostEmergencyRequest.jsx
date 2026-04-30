import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getBloodGroups, createRequest } from '../lib/mockDb.js'
import { useToast } from '../components/useToast.js'

export function PostEmergencyRequest() {
  const navigate = useNavigate()
  const { push } = useToast()
  const groups = useMemo(() => getBloodGroups(), [])

  const [form, setForm] = useState({
    bloodGroup: 'O+',
    city: '',
    location: '',
    patientName: '',
    contactNumber: '',
    note: '',
    urgency: 'Standard',
  })
  const [consent, setConsent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const set = (k, v) => setForm((s) => ({ ...s, [k]: v }))

  const validate = () => {
    const e = {}
    if (!form.bloodGroup) e.bloodGroup = 'Select a blood group.'
    if (!form.city.trim()) e.city = 'City is required.'
    if (!form.location.trim()) e.location = 'Hospital / location is required.'
    if (!form.contactNumber.trim()) e.contactNumber = 'Contact number is required.'
    if (!consent) e.consent = 'Consent is required before posting.'
    return e
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return
    setSubmitting(true)
    try {
      const created = await createRequest(form)
      push({ tone: 'success', title: 'Request posted', message: 'People nearby can now contact you.' })
      navigate(`/requests/${created.id}`)
    } catch {
      push({ tone: 'error', title: 'Could not post request', message: 'Please try again.' })
      setSubmitting(false)
    }
  }

  return (
    <div className="container-app py-6 md:py-10">
      <div className="card p-6 md:p-10 animate-fadeUp">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
          Post Emergency Request
        </h1>
        <p className="mt-2 text-slate-600">
          Please keep details brief and accurate. This is a community platform, not a hospital system.
        </p>

        <form className="mt-6 grid gap-4 max-w-2xl" onSubmit={onSubmit}>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="grid gap-1">
              <span className="label">Blood Group *</span>
              <select className="input" value={form.bloodGroup} onChange={(e) => set('bloodGroup', e.target.value)}>
                {groups.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              {errors.bloodGroup ? <span className="text-xs text-emergency-700">{errors.bloodGroup}</span> : null}
            </label>

            <label className="grid gap-1">
              <span className="label">City *</span>
              <input className="input" value={form.city} onChange={(e) => set('city', e.target.value)} placeholder="e.g., Pune" />
              {errors.city ? <span className="text-xs text-emergency-700">{errors.city}</span> : null}
            </label>
          </div>

          <label className="grid gap-1">
            <span className="label">Hospital / Location *</span>
            <input
              className="input"
              value={form.location}
              onChange={(e) => set('location', e.target.value)}
              placeholder="Hospital name + area (e.g., City Hospital, Near Gate 2)"
            />
            {errors.location ? <span className="text-xs text-emergency-700">{errors.location}</span> : null}
          </label>

          <div className="grid gap-3 md:grid-cols-2">
            <label className="grid gap-1">
              <span className="label">Patient Name (optional)</span>
              <input className="input" value={form.patientName} onChange={(e) => set('patientName', e.target.value)} placeholder="Optional" />
            </label>

            <label className="grid gap-1">
              <span className="label">Contact Number *</span>
              <input
                className="input"
                value={form.contactNumber}
                onChange={(e) => set('contactNumber', e.target.value)}
                placeholder="Phone number"
                inputMode="tel"
              />
              {errors.contactNumber ? <span className="text-xs text-emergency-700">{errors.contactNumber}</span> : null}
              <span className="helper">
                Your number will be revealed only after the other person confirms consent.
              </span>
            </label>
          </div>

          <label className="grid gap-1">
            <span className="label">Short Note</span>
            <textarea
              className="input min-h-24"
              value={form.note}
              onChange={(e) => set('note', e.target.value)}
              placeholder="Brief details like units needed, time, etc."
            />
          </label>

          <label className="grid gap-1">
            <span className="label">Urgency (optional)</span>
            <select className="input" value={form.urgency} onChange={(e) => set('urgency', e.target.value)}>
              <option value="Standard">Standard</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </label>

          <label className="flex items-start gap-3 rounded-xl ring-1 ring-slate-200 p-3">
            <input type="checkbox" className="mt-1" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
            <div>
              <div className="text-sm font-semibold text-slate-900">Consent before posting *</div>
              <div className="text-sm text-slate-600">
                I understand my contact will be shared only after consent, and I will use this platform responsibly.
              </div>
              {errors.consent ? <div className="mt-1 text-xs text-emergency-700">{errors.consent}</div> : null}
            </div>
          </label>

          <div className="flex flex-wrap gap-2">
            <button className="btn btn-primary" disabled={submitting} type="submit">
              {submitting ? 'Posting…' : 'Post Request'}
            </button>
            <button className="btn btn-ghost" disabled={submitting} type="button" onClick={() => navigate('/requests')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
