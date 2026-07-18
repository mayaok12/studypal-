import { useOutletContext } from 'react-router-dom'

export default function Dashboard() {
  const { sessions, gems } = useOutletContext()

  const today = new Date().toISOString().slice(0, 10)
  const todayMinutes = sessions
    .filter((s) => s.date === today)
    .reduce((sum, s) => sum + s.minutes, 0)

  const hours = Math.floor(todayMinutes / 60)
  const mins = todayMinutes % 60

  return (
    <div>
      <h1 className="text-3xl font-heading text-ink">Happy studying! 🌿</h1>
      <p className="text-sm text-ink-soft font-medium mt-1 mb-4">Here's where you're at today.</p>

      <div className="bg-card rounded-lg p-6 shadow">
        <div className="text-xs font-bold uppercase tracking-wide text-ink-soft">Today</div>
        <div className="text-2xl font-heading font-bold text-ink mt-1">
          {hours}h {mins}m studied
        </div>
        <div className="text-sm text-ink-soft mt-3">
          💎 {gems} gems earned so far
        </div>
      </div>
    </div>
  )
}