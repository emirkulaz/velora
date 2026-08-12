import { FormEvent, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { StatusBadge } from '../components/StatusBadge'
import { apiRequest, ApiError } from '../lib/api'

type EventDetail = {
  id: string
  plateText: string
  normalizedPlateText: string
  direction: string
  status: string
  confidence: number
  countryCode: string
  detectedAt: string
  vehicleImageUrl: string | null
  plateCropUrl: string | null
  processingDurationMs: number | null
  manuallyCorrected: boolean
  camera: { name: string; code: string }
  parkingSite: { name: string; timezone: string }
  recognitions: Array<{
    id: string
    provider: string
    confidence: number
    rawText: string
  }>
}

export function EventDetailPage() {
  const { id } = useParams()
  const [event, setEvent] = useState<EventDetail | null>(null)
  const [plateText, setPlateText] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    apiRequest<EventDetail>(`/events/${id}`)
      .then((data) => {
        setEvent(data)
        setPlateText(data.plateText)
      })
      .catch((err: unknown) =>
        setError(err instanceof ApiError ? err.message : 'Failed to load event.'),
      )
      .finally(() => setLoading(false))
  }, [id])

  async function onCorrect(e: FormEvent) {
    e.preventDefault()
    if (!id) return
    setMessage('')
    setError('')
    try {
      const updated = await apiRequest<EventDetail>(`/events/${id}/correct-plate`, {
        method: 'PATCH',
        body: JSON.stringify({ plateText }),
      })
      setEvent(updated)
      setMessage('Plate corrected and audit log written.')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Correction failed.')
    }
  }

  if (loading) return <p className="text-slate-600">Loading event…</p>
  if (error && !event) {
    return (
      <div className="rounded-xl bg-rose-50 p-4 text-rose-700" role="alert">
        {error}
      </div>
    )
  }
  if (!event) return <p className="text-slate-600">Event not found.</p>

  return (
    <div className="space-y-5">
      <div>
        <Link to="/events" className="text-sm text-[var(--accent)]">
          ← Back to events
        </Link>
        <h2 className="mt-2 plate text-3xl text-slate-900">{event.plateText}</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          <StatusBadge value={event.direction} />
          <StatusBadge value={event.status} />
        </div>
      </div>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h3 className="font-semibold">Details</h3>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Detected (UTC)</dt>
              <dd>{new Date(event.detectedAt).toISOString()}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Site timezone</dt>
              <dd>{event.parkingSite.timezone}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Camera</dt>
              <dd>
                {event.camera.name} ({event.camera.code})
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Confidence</dt>
              <dd>{(event.confidence * 100).toFixed(1)}%</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Country</dt>
              <dd>{event.countryCode}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Processing</dt>
              <dd>{event.processingDurationMs ?? '—'} ms</dd>
            </div>
          </dl>
        </article>

        <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h3 className="font-semibold">Imagery</h3>
          <div className="mt-4 grid gap-3">
            <div className="rounded-xl bg-slate-100 p-6 text-sm text-slate-500">
              {event.vehicleImageUrl ? (
                <img src={event.vehicleImageUrl} alt="Vehicle" className="max-h-48 rounded-lg" />
              ) : (
                'Vehicle image not available in this seed event.'
              )}
            </div>
            <div className="rounded-xl bg-slate-100 p-6 text-sm text-slate-500">
              {event.plateCropUrl ? (
                <img src={event.plateCropUrl} alt="Plate crop" className="max-h-24 rounded-lg" />
              ) : (
                'Plate crop not available in this seed event.'
              )}
            </div>
          </div>
        </article>
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h3 className="font-semibold">Manual correction</h3>
        <form onSubmit={onCorrect} className="mt-4 flex flex-col gap-3 md:flex-row">
          <input
            className="plate flex-1 rounded-xl border border-slate-300 px-3 py-2 text-lg"
            value={plateText}
            onChange={(e) => setPlateText(e.target.value)}
            required
            minLength={2}
          />
          <button
            type="submit"
            className="rounded-xl bg-[var(--ink)] px-4 py-2 font-medium text-white"
          >
            Save correction
          </button>
        </form>
        {message && <p className="mt-3 text-sm text-emerald-700">{message}</p>}
        {error && (
          <p className="mt-3 text-sm text-rose-700" role="alert">
            {error}
          </p>
        )}
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h3 className="font-semibold">Recognition providers</h3>
        <ul className="mt-3 space-y-2 text-sm">
          {event.recognitions.map((item) => (
            <li key={item.id} className="flex justify-between gap-3 border-t border-slate-100 py-2">
              <span>
                {item.provider}: <span className="plate">{item.rawText}</span>
              </span>
              <span>{(item.confidence * 100).toFixed(0)}%</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
