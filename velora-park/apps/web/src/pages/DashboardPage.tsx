import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { StatusBadge } from '../components/StatusBadge'
import { apiRequest, ApiError } from '../lib/api'

type DashboardSummary = {
  timezone: string
  entriesToday: number
  exitsToday: number
  needsReview: number
  hourlyDensity: Array<{ hour: number; count: number }>
  peakHours: Array<{ hour: number; count: number }>
  recentEvents: Array<{
    id: string
    plateText: string
    direction: string
    status: string
    confidence: number
    detectedAt: string
    camera: { name: string }
  }>
  cameras: Array<{
    id: string
    name: string
    status: string
    direction: string
  }>
}

export function DashboardPage() {
  const [data, setData] = useState<DashboardSummary | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiRequest<DashboardSummary>('/dashboard/summary')
      .then(setData)
      .catch((err: unknown) =>
        setError(err instanceof ApiError ? err.message : 'Failed to load dashboard.'),
      )
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <p className="text-slate-600">Loading dashboard…</p>
  }

  if (error) {
    return (
      <div className="rounded-xl bg-rose-50 p-4 text-rose-700" role="alert">
        {error}
      </div>
    )
  }

  if (!data) {
    return <p className="text-slate-600">No dashboard data.</p>
  }

  const maxHour = Math.max(...data.hourlyDensity.map((h) => h.count), 1)

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-semibold text-slate-900">Operations overview</h2>
        <p className="text-sm text-slate-600">Timezone: {data.timezone}</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Entries today', value: data.entriesToday },
          { label: 'Exits today', value: data.exitsToday },
          { label: 'Needs review', value: data.needsReview },
          {
            label: 'Cameras online',
            value: data.cameras.filter((c) => c.status === 'ONLINE').length,
          },
        ].map((card) => (
          <article
            key={card.label}
            className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
          >
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-slate-900">
              {card.value}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 lg:col-span-2">
          <h3 className="font-semibold text-slate-900">Hourly density</h3>
          <div className="mt-4 flex h-40 items-end gap-1">
            {data.hourlyDensity.map((bucket) => (
              <div
                key={bucket.hour}
                className="flex-1 rounded-t bg-[var(--accent)]/80"
                style={{ height: `${(bucket.count / maxHour) * 100}%`, minHeight: bucket.count ? 4 : 0 }}
                title={`${bucket.hour}:00 — ${bucket.count}`}
              />
            ))}
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Peak:{' '}
            {data.peakHours
              .map((p) => `${p.hour}:00 (${p.count})`)
              .join(' · ') || '—'}
          </p>
        </article>

        <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h3 className="font-semibold text-slate-900">Camera status</h3>
          <ul className="mt-4 space-y-3">
            {data.cameras.map((camera) => (
              <li key={camera.id} className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-slate-800">{camera.name}</p>
                  <p className="text-xs text-slate-500">{camera.direction}</p>
                </div>
                <StatusBadge value={camera.status} />
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">Latest plates</h3>
          <Link to="/events" className="text-sm font-medium text-[var(--accent)]">
            View all
          </Link>
        </div>
        {data.recentEvents.length === 0 ? (
          <p className="text-sm text-slate-500">No events yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-slate-500">
                <tr>
                  <th className="py-2 pr-4">Plate</th>
                  <th className="py-2 pr-4">Direction</th>
                  <th className="py-2 pr-4">Camera</th>
                  <th className="py-2 pr-4">Confidence</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.recentEvents.map((event) => (
                  <tr key={event.id} className="border-t border-slate-100">
                    <td className="py-3 pr-4">
                      <Link to={`/events/${event.id}`} className="plate text-base text-slate-900">
                        {event.plateText}
                      </Link>
                    </td>
                    <td className="py-3 pr-4">
                      <StatusBadge value={event.direction} />
                    </td>
                    <td className="py-3 pr-4 text-slate-700">{event.camera.name}</td>
                    <td className="py-3 pr-4">{(event.confidence * 100).toFixed(0)}%</td>
                    <td className="py-3">
                      <StatusBadge value={event.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
