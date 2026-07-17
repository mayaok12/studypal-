import { NavLink, Outlet } from 'react-router-dom'
import { Home, Timer, CheckSquare, Sparkles, Gem, Users } from 'lucide-react'

const TABS = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/focus', icon: Timer, label: 'Focus' },
  { to: '/tasks', icon: CheckSquare, label: 'Tasks' },
  { to: '/ai', icon: Sparkles, label: 'AI' },
  { to: '/gems', icon: Gem, label: 'Gems' },
  { to: '/friends', icon: Users, label: 'Friends' },
]

export default function Layout() {
  return (
    <div className="min-h-screen bg-bg text-ink font-body pb-28">
      <div className="max-w-xl mx-auto px-5 pt-8">
        <Outlet />
      </div>

      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-card rounded-full shadow-(--shadow-card) px-2 py-2 flex gap-1">
        {TABS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-3.5 py-2.5 rounded-full transition-colors ${
                isActive ? 'bg-sage-deep text-white' : 'text-ink-soft'
              }`
            }
          >
            <Icon size={18} />
            <span className="text-xs font-heading font-semibold hidden sm:inline">
              {label}
            </span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}