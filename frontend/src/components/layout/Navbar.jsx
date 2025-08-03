"use client"

import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import useAuth from "../../contexts/useAuth"
import ProfileDropdown from "../ui/ProfileDropdown"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { isAuthenticated, email, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/visualizer", label: "Visualizer" },
    { to: "/leaderboard", label: "Leaderboard" },
    { to: "/quizzes", label: "Quizzes" },
  ]

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between shadow-md relative">
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-extrabold tracking-tight text-blue-400">🧮</span>
        <span className="text-xl font-bold tracking-tight">Algorithm Visualizer</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex space-x-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-3 py-1 rounded transition-colors duration-200 ${
                  isActive ? "bg-blue-500 text-white" : "hover:bg-gray-700 hover:text-blue-300"
                }`
              }
              end={link.to === "/"}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {!isAuthenticated ? (
            <NavLink
              to="/login"
              className="px-4 py-1 bg-blue-600 rounded text-white font-semibold hover:bg-blue-700 transition"
            >
              Login
            </NavLink>
          ) : (
            <ProfileDropdown userEmail={email} onLogout={handleLogout} />
          )}
        </div>
      </div>

      <button className="md:hidden p-2 rounded hover:bg-gray-800" onClick={() => setMenuOpen(!menuOpen)}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {menuOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-gray-900 rounded shadow-md flex flex-col md:hidden z-50">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-4 py-2 rounded transition-colors duration-200 ${
                  isActive ? "bg-blue-500 text-white" : "hover:bg-gray-700 hover:text-blue-300"
                }`
              }
              end={link.to === "/"}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          {!isAuthenticated ? (
            <NavLink
              to="/login"
              className="px-4 py-2 bg-blue-600 rounded text-white font-semibold hover:bg-blue-700 transition"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </NavLink>
          ) : (
            <button
              onClick={() => {
                handleLogout()
                setMenuOpen(false)
              }}
              className="px-4 py-2 text-left text-red-400 hover:bg-red-900 rounded"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
