import { StrictMode, useState } from 'react'
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
import './index.css'

function Root() {
  const [loggedIn, setLoggedIn] = useState(false)

  if (!loggedIn) {
    return <SignInPage onSignIn={() => setLoggedIn(true)} />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
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