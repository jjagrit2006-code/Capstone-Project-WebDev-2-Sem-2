import { loadState, saveState } from './storage.js'
import { nowMs } from './time.js'

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

function id(prefix = 'id') {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Math.random().toString(16).slice(2)}`
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function seed() {
  const ts = nowMs()
  const cities = ['Pune', 'Mumbai', 'Bengaluru', 'Delhi', 'Chennai', 'Hyderabad', 'Kolkata', 'Jaipur']

  const donors = Array.from({ length: 18 }).map((_, i) => {
    const city = pick(cities)
    const group = pick(BLOOD_GROUPS)
    const available = Math.random() > 0.35
    return {
      id: id('donor'),
      name: ['Aarav', 'Isha', 'Kunal', 'Meera', 'Kabir', 'Ananya', 'Rohan', 'Sana', 'Vihaan', 'Nisha'][i % 10],
      bloodGroup: group,
      city,
      distanceKm: Math.random() > 0.55 ? Math.floor(2 + Math.random() * 12) : null,
      available,
      phone: `9${Math.floor(100000000 + Math.random() * 900000000)}`,
      lastUpdatedAt: ts - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000),
    }
  })

  const requests = Array.from({ length: 6 }).map((_, i) => {
    const city = pick(cities)
    const group = pick(BLOOD_GROUPS)
    const createdAt = ts - (5 + i * 17) * 60000
    return {
      id: id('req'),
      bloodGroup: group,
      city,
      location: `${pick(['City Hospital', 'Community Clinic', 'General Hospital'])}, ${pick(['Near main road', 'Gate 2', 'OPD wing'])}`,
      patientName: Math.random() > 0.5 ? pick(['Rahul', 'Priya', 'Amit', 'Neha', 'Suresh']) : '',
      contactNumber: `9${Math.floor(100000000 + Math.random() * 900000000)}`,
      note: pick([
        'Need 1 unit urgently. Any help is appreciated.',
        'Required today. Please contact if you can donate.',
        'Emergency requirement. Thank you for supporting.',
      ]),
      urgency: pick(['Standard', 'High', 'Critical']),
      createdAt,
      createdByUserId: 'user_local',
    }
  })

  const user = {
    id: 'user_local',
    name: 'You',
    email: '',
    isDonor: true,
    bloodGroup: 'O+',
    city: 'Pune',
    donorAvailable: true,
    availabilityHistory: [],
    lastUpdatedAt: ts,
  }

  return { donors, requests, user, seededAt: ts }
}

function readDb() {
  const current = loadState()
  if (current && current.donors && current.requests) return current
  const seeded = seed()
  saveState(seeded)
  return seeded
}

function writeDb(next) {
  saveState(next)
  return next
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function simulatedFetch(data) {
  await delay(180 + Math.random() * 250)
  return data
}

export function getBloodGroups() {
  return [...BLOOD_GROUPS]
}

export async function listDonors({ bloodGroup = 'Any', city = '', onlyAvailable = false } = {}) {
  const db = readDb()
  const c = city.trim().toLowerCase()

  let donors = db.donors.slice()
  if (bloodGroup && bloodGroup !== 'Any') donors = donors.filter((d) => d.bloodGroup === bloodGroup)
  if (c) donors = donors.filter((d) => d.city.toLowerCase().includes(c))
  if (onlyAvailable) donors = donors.filter((d) => d.available)

  donors.sort((a, b) => Number(b.available) - Number(a.available) || a.name.localeCompare(b.name))
  return simulatedFetch(donors)
}

export async function listRequests({ sort = 'newest' } = {}) {
  const db = readDb()
  const items = db.requests.slice()
  items.sort((a, b) => {
    if (sort === 'urgent') {
      const score = (x) => (x.urgency === 'Critical' ? 3 : x.urgency === 'High' ? 2 : 1)
      return score(b) - score(a) || b.createdAt - a.createdAt
    }
    return b.createdAt - a.createdAt
  })
  return simulatedFetch(items)
}

export async function getRequestById(idVal) {
  const db = readDb()
  const found = db.requests.find((r) => r.id === idVal) || null
  return simulatedFetch(found)
}

export async function createRequest(payload) {
  const db = readDb()
  const req = {
    id: id('req'),
    bloodGroup: payload.bloodGroup,
    city: payload.city,
    location: payload.location,
    patientName: payload.patientName || '',
    contactNumber: payload.contactNumber,
    note: payload.note || '',
    urgency: payload.urgency || 'Standard',
    createdAt: nowMs(),
    createdByUserId: db.user?.id || 'user_local',
  }
  const next = { ...db, requests: [req, ...db.requests] }
  writeDb(next)
  return simulatedFetch(req)
}

export async function toggleMyAvailability(nextAvailable) {
  const db = readDb()
  const ts = nowMs()
  const nextUser = {
    ...db.user,
    donorAvailable: nextAvailable,
    lastUpdatedAt: ts,
    availabilityHistory: [{ at: ts, available: nextAvailable }, ...(db.user?.availabilityHistory || [])].slice(0, 60),
  }
  const nextDb = { ...db, user: nextUser }
  writeDb(nextDb)
  return simulatedFetch(nextUser)
}

export async function getMe() {
  const db = readDb()
  return simulatedFetch(db.user)
}
