"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../contexts/useAuth"
import { useApiMutation } from "../hooks/useApi"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" })
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
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return "Valid email is required."
    if (!form.password) return "Password is required."
    return ""
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationError = validate()
    if (validationError) return

    try {
      const response = await mutate("post", "/api/auth/login", form)
      login(response.token, response.email)
      navigate("/")
    } catch {
      // Error is handled by useApiMutation
    }
  }

  return (
    <div className="max-w-xl w-full mx-auto mt-20">
      <Card className="bg-white/90 shadow-2xl border-blue-100 p-10">
        <h1 className="text-4xl font-bold mb-8 text-blue-700 text-center">🔐 Login</h1>

        <form onSubmit={handleSubmit} className="space-y-7">
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
                  touched.password && !form.password ? "border-red-400" : "border-gray-300"
                }`}
                autoComplete="current-password"
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
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-base text-center">{error}</p>
            </div>
          )}

          <Button type="submit" className="w-full py-3 text-lg" loading={loading} disabled={loading}>
            Login
          </Button>
        </form>

        <div className="mt-8 text-center text-base text-gray-700">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline font-semibold">
            Register
          </a>
        </div>
      </Card>
    </div>
  )
}

export default Login
