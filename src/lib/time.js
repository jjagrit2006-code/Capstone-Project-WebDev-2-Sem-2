export function nowMs() {
  return Date.now()
}

export function minutesAgoLabel(fromMs) {
  const diff = Math.max(0, nowMs() - fromMs)
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins === 1) return '1 min ago'
  if (mins < 60) return `${mins} mins ago`
  const hrs = Math.floor(mins / 60)
  if (hrs === 1) return '1 hour ago'
  if (hrs < 24) return `${hrs} hours ago`
  const days = Math.floor(hrs / 24)
  return days === 1 ? '1 day ago' : `${days} days ago`
}

export function ageIntensity(fromMs) {
  const diffMin = (nowMs() - fromMs) / 60000
  if (diffMin <= 30) return 'ring-emergency-200 bg-emergency-50 text-emergency-700'
  if (diffMin <= 120) return 'ring-emergency-300 bg-emergency-100 text-emergency-800'
  return 'ring-emergency-400 bg-emergency-100 text-emergency-900'
}
