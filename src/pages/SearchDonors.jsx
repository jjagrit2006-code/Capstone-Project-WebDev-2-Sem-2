import { useEffect, useMemo, useState } from 'react'
import { FilterBar } from '../components/FilterBar.jsx'
import { DonorCard } from '../components/DonorCard.jsx'
import { EmptyState } from '../components/EmptyState.jsx'
import { SkeletonCard } from '../components/SkeletonCard.jsx'
import { getBloodGroups, listDonors } from '../lib/mockDb.js'
import { usePolling } from '../lib/usePolling.js'

export function SearchDonors() {
  const groups = useMemo(() => ['Any', ...getBloodGroups()], [])
  const [bloodGroup, setBloodGroup] = useState('Any')
  const [city, setCity] = useState('')
  const [onlyAvailable, setOnlyAvailable] = useState(true)

  const { data, loading, refresh } = usePolling(
    () => listDonors({ bloodGroup, city, onlyAvailable }),
    { intervalMs: 15000, enabled: true },
  )

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bloodGroup, city, onlyAvailable])

  return (
    <div className="container-app py-6 md:py-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Search Donors
          </h1>
          <p className="mt-2 text-slate-600">
            Browse locally. Availability is self-reported and updated by donors.
          </p>
        </div>
        <button className="btn btn-ghost" type="button" onClick={refresh}>
          Refresh
        </button>
      </div>

      <div className="mt-5">
        <FilterBar>
          <label className="grid gap-1">
            <span className="label">Blood Group</span>
            <select className="input" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
              {groups.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-1">
            <span className="label">City</span>
            <input
              className="input"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search by city (e.g., Pune)"
              inputMode="search"
              aria-label="City"
            />
          </label>

          <label className="flex items-center justify-between gap-3 rounded-xl ring-1 ring-slate-200 px-3.5 py-2.5">
            <div>
              <div className="text-sm font-semibold text-slate-900">Only Available Now</div>
              <div className="text-xs text-slate-500">Show donors who marked themselves available.</div>
            </div>
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              aria-label="Only Available Now"
            />
          </label>
        </FilterBar>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : data?.length ? (
          data.map((d) => <DonorCard key={d.id} donor={d} />)
        ) : (
          <div className="md:col-span-2 lg:col-span-3">
            <EmptyState
              title="No donors match your filters"
              description="Try selecting “Any” blood group, changing the city, or turning off “Only Available Now”."
              actionLabel="Broaden search"
              actionTo="/donors"
              secondaryLabel="Post emergency request"
              secondaryTo="/requests/new"
            />
          </div>
        )}
      </div>
    </div>
  )
}
