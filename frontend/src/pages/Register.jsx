"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../contexts/useAuth"
import { useApiMutation } from "../hooks/useApi"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"

const passwordRequirements = [
  { label: "At least 8 characters", test: (v) => v.length >= 8 },
  { label: "At least one uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { label: "At least one lowercase letter", test: (v) => /[a-z]/.test(v) },
  { label: "At least one number", test: (v) => /[0-9]/.test(v) },
  { label: "At least one special character", test: (v) => /[^A-Za-z0-9]/.test(v) },
]

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [touched, setTouched] = useState({})

  const { mutate, loading, error } = useApiMutation()
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true })
  }

  const validate = () => {
    if (!form.name.trim()) return "Name is required."
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return "Valid email is required."
    for (const req of passwordRequirements) {
      if (!req.test(form.password)) return "Password does not meet all requirements."
    }
    return ""
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationError = validate()
    if (validationError) return

    try {
      const response = await mutate("post", "/api/auth/register", form)
      if (response.token) {
        login(response.token, response.email)
        navigate("/")
      }
    } catch {
      // Error is handled by useApiMutation
    }
  }

  const passwordChecks = passwordRequirements.map((req) => req.test(form.password))

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-2">
      <div className="max-w-xl w-full mx-auto">
        <Card className="bg-white/90 shadow-2xl border-blue-100 p-10">
          <h1 className="text-4xl font-bold mb-8 text-blue-700 text-center">📝 Register</h1>

          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label className="block font-semibold mb-2 text-lg text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-6 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                  touched.name && !form.name ? "border-red-400" : "border-gray-300"
                }`}
                autoComplete="name"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-lg text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-6 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                  touched.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) ? "border-red-400" : "border-gray-300"
                }`}
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-lg text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-6 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                    touched.password && !passwordChecks.every(Boolean) ? "border-red-400" : "border-gray-300"
                  }`}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-3 text-xl text-gray-500 hover:text-blue-500 focus:outline-none"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>

              <ul className="mt-3 space-y-1 text-sm">
                {passwordRequirements.map((req, i) => (
                  <li
                    key={req.label}
                    className={`flex items-center gap-2 transition-colors duration-200 ${
                      form.password ? (passwordChecks[i] ? "text-green-600" : "text-red-500") : "text-gray-400"
                    }`}
                  >
                    <span className="text-lg">{passwordChecks[i] ? "✅" : "❌"}</span>
                    {req.label}
                  </li>
                ))}
              </ul>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-base text-center">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full py-3 text-lg" loading={loading} disabled={loading}>
              Register
            </Button>
          </form>

          <div className="mt-8 text-center text-base text-gray-700">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline font-semibold">
              Login
            </a>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Register
