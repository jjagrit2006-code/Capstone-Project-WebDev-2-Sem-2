import { useMemo, useState } from 'react'
import { Modal } from './Modal.jsx'

function maskPhone(phone) {
  if (!phone) return ''
  const s = String(phone)
  if (s.length <= 4) return '••••'
  return `${'•'.repeat(Math.max(0, s.length - 4))}${s.slice(-4)}`
}

export function ContactConfirmModal({
  open,
  subjectLabel,
  phoneNumber,
  onClose,
}) {
  const [consent, setConsent] = useState(false)
  const masked = useMemo(() => maskPhone(phoneNumber), [phoneNumber])

  return (
    <Modal
      open={open}
      title="Confirm before sharing contact"
      description="We share phone numbers only after consent. Please be respectful and use this only for the current request."
      onClose={() => {
        setConsent(false)
        onClose?.()
      }}
    >
      <div className="grid gap-3">
        <div className="rounded-xl bg-slate-50 ring-1 ring-slate-200 p-3 text-sm text-slate-700">
          <div className="font-semibold text-slate-900">{subjectLabel}</div>
          <div className="mt-1">
            Phone preview: <span className="font-semibold">{masked}</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Consent note: your number will be shared only with this person after you confirm.
          </div>
        </div>

        <label className="flex items-start gap-3 rounded-xl ring-1 ring-slate-200 p-3">
          <input
            type="checkbox"
            className="mt-1"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          <div>
            <div className="text-sm font-semibold text-slate-900">I consent to reveal the phone number</div>
            <div className="text-sm text-slate-600">
              I will contact politely and only for this donation/request.
            </div>
          </div>
        </label>

        <div className="flex flex-wrap gap-2">
          <button className="btn btn-ghost" type="button" onClick={() => onClose?.()}>
            Cancel
          </button>
          <a
            className={`btn ${consent ? 'btn-primary' : 'btn-ghost'}`}
            href={consent ? `tel:${phoneNumber}` : undefined}
            onClick={(e) => {
              if (!consent) e.preventDefault()
            }}
            aria-disabled={!consent}
          >
            {consent ? `Call ${phoneNumber}` : 'Confirm to reveal'}
          </a>
        </div>
      </div>
    </Modal>
  )
}
