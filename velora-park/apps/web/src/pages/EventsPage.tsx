import { FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { StatusBadge } from '../components/StatusBadge'
import { apiRequest, ApiError } from '../lib/api'

type EventItem = {
  id: string
  plateText: string
  direction: string
  status: string
  confidence: number
  detectedAt: string
  camera: { name: string }
  parkingSite: { name: string; timezone: string }
}

type EventsResponse = {
  data: EventItem[]
  meta: { page: number; pageSize: number; total: number; totalPages: number }
}

export function EventsPage() {
  const [plate, setPlate] = useState('')
  const [direction, setDirection] = useState('')
  const [status, setStatus] = useState('')
  const [result, setResult] = useState<EventsResponse | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  async function load(next?: { plate?: string; direction?: string; status?: string }) {
    setLoading(true)
    setError('')
    const params = new URLSearchParams()
    const p = next?.plate ?? plate
    const d = next?.direction ?? direction
    const s = next?.status ?? status
    if (p) params.set('plate', p)
    if (d) params.set('direction', d)
    if (s) params.set('status', s)
    params.set('pageSize', '50')
    try {
      const data = await apiRequest<EventsResponse>(`/events?${params.toString()}`)
      setResult(data)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to load events.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load({})
  }, [])

  function onFilter(event: FormEvent) {
    event.preventDefault()
    void load()
  }

  return (
    <div className="space-y-5">
      <header>
        <h2 className="text-2xl font-semibold text-slate-900">Event history</h2>
        <p className="text-sm text-slate-600">Filter by plate, direction, and status.</p>
      </header>

      <form
        onSubmit={onFilter}
        className="grid gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 md:grid-cols-4"
      >
        <label className="text-sm">
          Plate
          <input
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
            placeholder="Search plate"
          />
        </label>
        <label className="text-sm">
          Direction
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
          >
            <option value="">All</option>
            <option value="ENTRY">ENTRY</option>
            <option value="EXIT">EXIT</option>
          </select>
        </label>
        <label className="text-sm">
          Status
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
          >
            <option value="">All</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="NEEDS_REVIEW">NEEDS_REVIEW</option>
            <option value="REJECTED">REJECTED</option>
          </select>
        </label>
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full rounded-xl bg-[var(--ink)] px-4 py-2.5 font-medium text-white"
          >
            Apply filters
          </button>
        </div>
      </form>

      {error && (
        <div className="rounded-xl bg-rose-50 p-4 text-rose-700" role="alert">
          {error}
        </div>
      )}

      <section className="overflow-x-auto rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        {loading ? (
          <p className="text-slate-600">Loading events…</p>
        ) : !result || result.data.length === 0 ? (
          <p className="text-slate-600">No events match these filters.</p>
        ) : (
          <>
            <table className="min-w-full text-left text-sm">
              <thead className="text-slate-500">
                <tr>
                  <th className="py-2 pr-4">Plate</th>
                  <th className="py-2 pr-4">When (UTC)</th>
                  <th className="py-2 pr-4">Site / Camera</th>
                  <th className="py-2 pr-4">Direction</th>
                  <th className="py-2 pr-4">Confidence</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {result.data.map((item) => (
                  <tr key={item.id} className="border-t border-slate-100">
                    <td className="py-3 pr-4">
                      <Link className="plate text-base text-slate-900" to={`/events/${item.id}`}>
                        {item.plateText}
                      </Link>
                    </td>
                    <td className="py-3 pr-4 text-slate-700">
                      {new Date(item.detectedAt).toISOString().replace('T', ' ').slice(0, 19)}
                    </td>
                    <td className="py-3 pr-4 text-slate-700">
                      {item.parkingSite.name} / {item.camera.name}
                    </td>
                    <td className="py-3 pr-4">
                      <StatusBadge value={item.direction} />
                    </td>
                    <td className="py-3 pr-4">{(item.confidence * 100).toFixed(0)}%</td>
                    <td className="py-3">
                      <StatusBadge value={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-xs text-slate-500">
              Showing {result.data.length} of {result.meta.total}
            </p>
          </>
        )}
      </section>
    </div>
  )
}
