const styles: Record<string, string> = {
  ONLINE: 'bg-emerald-100 text-emerald-800',
  OFFLINE: 'bg-rose-100 text-rose-800',
  UNKNOWN: 'bg-slate-200 text-slate-700',
  CONFIRMED: 'bg-emerald-100 text-emerald-800',
  NEEDS_REVIEW: 'bg-amber-100 text-amber-900',
  REJECTED: 'bg-rose-100 text-rose-800',
  ENTRY: 'bg-blue-100 text-blue-800',
  EXIT: 'bg-violet-100 text-violet-800',
}

export function StatusBadge({ value }: { value: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${styles[value] ?? 'bg-slate-200 text-slate-700'}`}
    >
      {value.replaceAll('_', ' ')}
    </span>
  )
}
