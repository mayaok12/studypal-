import { useState, useEffect, useRef } from 'react'

export function useTimer(onSessionComplete) {
  const [mode, setMode] = useState('pomodoro')
  const [phase, setPhase] = useState('focus')
  const [running, setRunning] = useState(false)
  const [focusMins, setFocusMins] = useState(25)
  const [breakMins, setBreakMins] = useState(5)
  const [remaining, setRemaining] = useState(25 * 60)
  const [elapsed, setElapsed] = useState(0)
  const intervalRef = useRef(null)

useEffect(() => {
  setRemaining(focusMins * 60)
}, [focusMins])

  useEffect(() => {
    if (!running) return

  intervalRef.current = setInterval(() => {
      if (mode === 'pomodoro') {
        setRemaining((r) => {
          if (r <= 1) {
            if (phase === 'focus') {
              onSessionComplete(focusMins, 'pomodoro-focus')
              setPhase('break')
              return breakMins * 60
            } else {
              setPhase('focus')
              return focusMins * 60  
            }
          }
          return r - 1
        })
      } else {
        setElapsed((e) => e + 1)
      }
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [running, mode, phase, focusMins, breakMins, onSessionComplete])

  function switchMode(newMode) {
    if (running) return
    setMode(newMode)
    setPhase('focus')
    setRemaining(focusMins * 60)
    setElapsed(0)
  }
  function reset() {
    setRunning(false)
    setPhase('focus')
    setRemaining(focusMins * 60)
    setElapsed(0)
  }

  function finishStopwatch() {
    if (elapsed > 0) onSessionComplete(Math.max(1, Math.floor(elapsed / 60)), 'stopwatch')
    reset()
  }

  function fmt(totalSeconds) {
    const m = Math.floor(totalSeconds / 60)
    const s = totalSeconds % 60
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0')
  }
  const total = phase === 'focus' ? focusMins * 60 : breakMins * 60
  const fraction = mode === 'pomodoro' ? (total - remaining) / total : (elapsed % 3600) / 3600

  return {
    mode, phase, running, focusMins, breakMins,
    display: mode === 'pomodoro' ? fmt(remaining) : fmt(elapsed),
    fraction,
    setFocusMins, setBreakMins,
    switchMode,
    start: () => setRunning(true),
    pause: () => setRunning(false),
    reset,
    finishStopwatch,
  }
}