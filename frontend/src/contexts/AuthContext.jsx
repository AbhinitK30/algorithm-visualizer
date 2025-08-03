
import { createContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token"),
    email: localStorage.getItem("userEmail"),
  })

  useEffect(() => {
    const syncAuth = () => {
      setAuth({
        token: localStorage.getItem("token"),
        email: localStorage.getItem("userEmail"),
      })
    }

    window.addEventListener("storage", syncAuth)
    window.addEventListener("authChange", syncAuth)

    return () => {
      window.removeEventListener("storage", syncAuth)
      window.removeEventListener("authChange", syncAuth)
    }
  }, [])

  const login = (token, email) => {
    localStorage.setItem("token", token)
    localStorage.setItem("userEmail", email)
    setAuth({ token, email })
    window.dispatchEvent(new Event("authChange"))
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userEmail")
    setAuth({ token: null, email: null })
    window.dispatchEvent(new Event("authChange"))
  }

  const value = {
    ...auth,
    isAuthenticated: !!auth.token,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext }
