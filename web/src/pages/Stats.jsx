import { useOutletContext } from 'react-router-dom'

function fmtHM(totalMinutes) {
  const h = Math.floor(totalMinutes / 60)
  const m = Math.round(totalMinutes % 60)
  return `${h}h ${m}m`
}

export default function Stats() {
  const { sessions } = useOutletContext()

  const now = new Date()
  const todayStr = now.toISOString().slice(0, 10)

  const weekAgo = new Date(now)
  weekAgo.setDate(now.getDate() - 6)
  const weekAgoStr = weekAgo.toISOString().slice(0, 10)

  const thisYear = String(now.getFullYear())

  const todayMinutes = sessions
    .filter((s) => s.date === todayStr)
    .reduce((sum, s) => sum + s.minutes, 0)

  const weekMinutes = sessions
    .filter((s) => s.date >= weekAgoStr)
    .reduce((sum, s) => sum + s.minutes, 0)

  const yearMinutes = sessions
    .filter((s) => s.date.slice(0, 4) === thisYear)
    .reduce((sum, s) => sum + s.minutes, 0)

  const totalMinutes = sessions.reduce((sum, s) => sum + s.minutes, 0)

  const tiles = [
    { label: 'Today', value: todayMinutes },
    { label: 'This week', value: weekMinutes },
    { label: 'This year', value: yearMinutes },
    { label: 'All time', value: totalMinutes },
  ]

  return (
    <div>
      <h1 className="text-3xl font-heading text-ink">Study Hours</h1>
      <p className="text-sm text-ink-soft font-medium mt-1 mb-4">Your total time invested, tracked honestly.</p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {tiles.map((t) => (
          <div key={t.label} className="bg-sage-pale rounded-2xl p-4">
            <div className="text-[11px] font-bold uppercase tracking-wide text-sage-ink opacity-75">
              {t.label}
            </div>
            <div className="text-xl font-heading font-bold text-sage-ink mt-1">
              {fmtHM(t.value)}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-lg p-5 shadow">
        <h2 className="font-heading font-bold text-base text-ink mb-3">Session log</h2>
        {sessions.length === 0 ? (
          <p className="text-center text-sm text-ink-soft font-medium py-4">
            No sessions logged yet — start a timer!
          </p>
        ) : (
          [...sessions].reverse().slice(0, 8).map((s, i) => (
            <div key={i} className="flex items-center justify-between py-2.5 border-b border-line last:border-0">
              <div>
                <div className="font-bold text-sm text-ink">{s.subject || 'Study session'}</div>
                <div className="text-xs text-ink-soft font-medium">{s.date} · {s.type.replace('-', ' ')}</div>
              </div>
              <div className="text-xs font-semibold font-mono text-ink-soft">{fmtHM(s.minutes)}</div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}