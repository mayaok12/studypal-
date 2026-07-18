import { StrictMode, useState, useRef, useCallback } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Focus from './pages/Focus'
import Tasks from './pages/Tasks'
import Planner from './pages/Planner'
import Stats from './pages/Stats'
import Gems from './pages/Gems'
import Friends from './pages/Friends'
import SignInPage from './pages/SignInPage'
import { useTimer } from './hooks/useTimer'
import './index.css'

function Root() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [sessions, setSessions] = useState([])
  const [subject, setSubject] = useState('')
  const subjectRef = useRef('')

  function updateSubject(value) {
    setSubject(value)
    subjectRef.current = value
  }

  const logSession = useCallback((minutes, type) => {
    const today = new Date().toISOString().slice(0, 10)
    setSessions((prev) => [...prev, { date: today, minutes, type, subject: subjectRef.current }])
  }, [])

  const timer = useTimer(logSession)

  const totalMinutes = sessions.reduce((sum, s) => sum + s.minutes, 0)
  const gems = Math.floor(totalMinutes / 10)

  const [todos, setTodos] = useState([])

  function addTodo(text) {
    setTodos((prev) => [...prev, { id: Date.now(), text, done: false }])
  }

  function toggleTodo(id) {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  if (!loggedIn) {
    return <SignInPage onSignIn={() => setLoggedIn(true)} />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout
          sessions={sessions}
          gems={gems}
          timer={timer}
          subject={subject}
          updateSubject={updateSubject}
          todos={todos}
          addTodo={addTodo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/focus" element={<Focus />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/gems" element={<Gems />} />
          <Route path="/friends" element={<Friends />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)