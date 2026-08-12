import { NavLink } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/events', label: 'Events' },
  { to: '/cameras', label: 'Cameras' },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-4 p-3 md:flex-row md:p-6">
        <aside className="w-full shrink-0 rounded-2xl bg-[var(--ink-2)] p-5 text-slate-100 md:w-64">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Velora Park
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">
              Control
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              {user?.organizationName ?? 'Organization'}
            </p>
          </div>
          <nav className="flex flex-row gap-2 md:flex-col" aria-label="Primary">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  [
                    'rounded-xl px-3 py-2 text-sm font-medium transition',
                    isActive
                      ? 'bg-[var(--accent)] text-white'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white',
                  ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-8 border-t border-white/10 pt-4 text-sm text-slate-400">
            <p className="text-slate-200">{user?.name}</p>
            <p>{user?.role}</p>
            <button
              type="button"
              onClick={logout}
              className="mt-3 rounded-lg border border-white/15 px-3 py-1.5 text-slate-200 hover:bg-white/5"
            >
              Sign out
            </button>
          </div>
        </aside>
        <main className="min-w-0 flex-1 rounded-2xl bg-[var(--panel)] p-4 shadow-xl md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
