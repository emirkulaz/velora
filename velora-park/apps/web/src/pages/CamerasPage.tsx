import { useEffect, useState } from 'react'
import { StatusBadge } from '../components/StatusBadge'
import { apiRequest, ApiError } from '../lib/api'

type Camera = {
  id: string
  name: string
  code: string
  direction: string
  status: string
  lastHeartbeatAt: string | null
  confidenceThreshold: number
  dedupeWindowSeconds: number
  hasRtspConfigured: boolean
  isActive: boolean
}

export function CamerasPage() {
  const [cameras, setCameras] = useState<Camera[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiRequest<Camera[]>('/cameras')
      .then(setCameras)
      .catch((err: unknown) =>
        setError(err instanceof ApiError ? err.message : 'Failed to load cameras.'),
      )
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-5">
      <header>
        <h2 className="text-2xl font-semibold text-slate-900">Cameras</h2>
        <p className="text-sm text-slate-600">
          RTSP credentials are never exposed to the browser.
        </p>
      </header>

      {error && (
        <div className="rounded-xl bg-rose-50 p-4 text-rose-700" role="alert">
          {error}
        </div>
      )}

      <section className="grid gap-4 md:grid-cols-2">
        {loading && <p className="text-slate-600">Loading cameras…</p>}
        {!loading && cameras.length === 0 && (
          <p className="text-slate-600">No cameras configured.</p>
        )}
        {cameras.map((camera) => (
          <article
            key={camera.id}
            className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{camera.name}</h3>
                <p className="text-sm text-slate-500">{camera.code}</p>
              </div>
              <StatusBadge value={camera.status} />
            </div>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">Direction</dt>
                <dd>
                  <StatusBadge value={camera.direction} />
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Confidence threshold</dt>
                <dd>{(camera.confidenceThreshold * 100).toFixed(0)}%</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Dedupe window</dt>
                <dd>{camera.dedupeWindowSeconds}s</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">RTSP configured</dt>
                <dd>{camera.hasRtspConfigured ? 'Yes' : 'No'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Last heartbeat</dt>
                <dd>
                  {camera.lastHeartbeatAt
                    ? new Date(camera.lastHeartbeatAt).toISOString()
                    : '—'}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </section>
    </div>
  )
}
