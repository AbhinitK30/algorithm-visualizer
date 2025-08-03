import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import Layout from "./components/layout/Layout"
import Home from "./pages/Home"
import Visualizer from "./pages/Visualizer"
import Leaderboard from "./pages/Leaderboard"
import Quizzes from "./pages/Quizzes"
import Login from "./pages/Login"
import Register from "./pages/Register"
import "./App.css"
import { useState, useEffect, useRef } from "react"

function getInitials(nameOrEmail) {
  if (!nameOrEmail) return "?"
  const parts = nameOrEmail.split(" ")
  if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase()
  if (nameOrEmail.includes("@")) return nameOrEmail[0].toUpperCase()
  return nameOrEmail.slice(0, 2).toUpperCase()
}

function ProfileDropdown({ userEmail, onLogout }) {
  const [open, setOpen] = useState(false)
  const ref = useRef()
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-lg shadow hover:bg-blue-700 transition"
      >
        {getInitials(userEmail)}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg border border-blue-100 z-50 p-2">
          <div className="px-3 py-2 text-sm text-gray-700 border-b">{userEmail}</div>
          <button onClick={onLogout} className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded mt-1">
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visualizer" element={<Visualizer />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </AuthProvider>
  )
}

export default App
