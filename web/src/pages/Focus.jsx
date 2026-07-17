import { useState } from 'react'
import { Play, Pause, RotateCcw, Check } from 'lucide-react'
import { useTimer } from '../hooks/useTimer'
import { useOutletContext } from 'react-router-dom'

export default function Focus() {
  const [subject, setSubject] = useState('')

const { logSession } = useOutletContext()

function handleSessionComplete(minutes, type) {
  logSession(minutes, type, subject)
}
  const timer = useTimer(handleSessionComplete)
  const isGreen = timer.mode === 'pomodoro' || (timer.mode === 'stopwatch' && timer.display !== '00:00')

  const ringSize = 194
  const stroke = 10
  const radius = (ringSize - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - Math.max(0, Math.min(1, timer.fraction)))

  return (
    <div>
      <h1 className="text-3xl font-heading text-ink">Focus Timer</h1>
      <p className="text-sm text-ink-soft font-medium mt-1 mb-4">Pick a mode and dive in.</p>

      <div className="flex rounded-full bg-line p-1 mb-4">
        {['pomodoro', 'stopwatch'].map((m) => (
          <div
            key={m}
            onClick={() => timer.switchMode(m)}
            className={`flex-1 text-center py-2.5 rounded-full font-heading font-bold text-sm cursor-pointer capitalize ${
              timer.mode === m ? 'bg-card text-ink' : 'text-ink-soft'
            }`}
          >
            {m}
          </div>
        ))}
      </div>

      <div className={`rounded-lg p-8 text-center ${isGreen ? 'bg-sage' : 'bg-card'}`}>
        <div className={`text-xs font-bold uppercase tracking-wide ${isGreen ? 'text-white/85' : 'text-ink-soft'}`}>
          {timer.mode === 'pomodoro' ? (timer.phase === 'focus' ? 'Focus session' : 'Break time') : 'Open-ended session'}
        </div>

        <div className="relative mx-auto my-5" style={{ width: ringSize, height: ringSize }}>
          <svg width={ringSize} height={ringSize} style={{ transform: 'rotate(-90deg)' }}>
            <circle
              cx={ringSize / 2} cy={ringSize / 2} r={radius}
              fill="none" stroke={isGreen ? 'rgba(255,255,255,.25)' : '#EFE7D8'} strokeWidth={stroke}
            />
            <circle
              cx={ringSize / 2} cy={ringSize / 2} r={radius}
              fill="none" stroke="#fff" strokeWidth={stroke} strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`font-mono font-bold text-4xl ${isGreen ? 'text-white' : 'text-ink'}`}>
              {timer.display}
            </span>
          </div>
        </div>

        {timer.mode === 'pomodoro' && (
          <div className={`flex gap-4 justify-center items-center mb-4 text-xs font-semibold ${isGreen ? 'text-white/85' : 'text-ink-soft'}`}>
            <label className="flex items-center gap-1.5">
              Focus
              <input
                type="number"
                value={timer.focusMins}
                disabled={timer.running}
                onChange={(e) => timer.setFocusMins(Number(e.target.value) || 1)}
                className="w-12 text-center py-1.5 rounded-md text-ink font-mono font-bold"
              />
            </label>
            <label className="flex items-center gap-1.5">
              Break
              <input
                type="number"
                value={timer.breakMins}
                disabled={timer.running}
                onChange={(e) => timer.setBreakMins(Number(e.target.value) || 1)}
                className="w-12 text-center py-1.5 rounded-md text-ink font-mono font-bold"
              />
            </label>
          </div>
        )}

        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="What are you studying?"
          className={`w-full max-w-xs mx-auto block px-4 py-3 rounded-full text-sm mb-4 outline-none ${
            isGreen ? 'bg-white/20 text-white placeholder-white/70' : 'border border-line text-ink'
          }`}
        />

        <div className="flex gap-2.5 justify-center items-center">
          {!timer.running ? (
            <button onClick={timer.start} className="flex items-center gap-1.5 px-6 py-3 rounded-full font-heading font-bold text-sm bg-white text-sage-deep">
              <Play size={15} /> Start
            </button>
          ) : (
            <button onClick={timer.pause} className="flex items-center gap-1.5 px-6 py-3 rounded-full font-heading font-bold text-sm bg-white text-sage-deep">
              <Pause size={15} /> Pause
            </button>
          )}
          <button onClick={timer.reset} className="p-3 rounded-full bg-white text-sage-deep">
            <RotateCcw size={16} />
          </button>
          {timer.mode === 'stopwatch' && (timer.running || timer.display !== '00:00') && (
            <button onClick={timer.finishStopwatch} className="flex items-center gap-1.5 px-5 py-3 rounded-full font-heading font-bold text-sm bg-sage-deep text-white">
              <Check size={15} /> Finish
            </button>
          )}
        </div>
      </div>
    </div>
  )
}