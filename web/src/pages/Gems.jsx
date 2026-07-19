import { useOutletContext } from 'react-router-dom'

const TIERS = [
  { name: 'Sprout', threshold: 0, sub: 'Your very first session' },
  { name: 'Lavender', threshold: 5, sub: 'Unlock at 5 total hours' },
  { name: 'Peach', threshold: 10, sub: 'Unlock at 10 total hours' },
  { name: 'Pink', threshold: 25, sub: 'Unlock at 25 total hours' },
  { name: 'Gold', threshold: 50, sub: 'Unlock at 50 total hours' },
  { name: 'Rare', threshold: 100, sub: 'Unlock at 100 total hours' },
]

export default function Gems() {
  const { sessions, gems } = useOutletContext()

  const totalMinutes = sessions.reduce((sum, s) => sum + s.minutes, 0)
  const totalHours = totalMinutes / 60

  return (
    <div>
      <h1 className="text-3xl font-heading text-ink">Gem Collection</h1>
      <p className="text-sm text-ink-soft font-medium mt-1 mb-4">
        {gems} gems earned · 1 gem per 10 minutes of focus
      </p>

      <div className="grid grid-cols-3 gap-3">
        {TIERS.map((t) => {
          const unlocked = totalHours >= t.threshold
          return (
            <div
              key={t.name}
              className={`bg-card rounded-2xl p-4 text-center shadow ${unlocked ? '' : 'opacity-50'}`}
            >
              <div className="text-2xl mb-1">💎</div>
              <div className="font-heading font-bold text-sm text-ink">{t.name}</div>
              <div className="text-[10.5px] text-ink-soft font-medium mt-0.5">
                {unlocked ? (t.threshold === 0 ? 'Unlocked' : 'Unlocked ✓') : t.sub}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}