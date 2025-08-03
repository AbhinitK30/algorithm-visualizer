"use client"

import { useState, useEffect, useCallback } from "react"
import axios from "axios"
import useAuth from "../contexts/useAuth"

// Get API base URL from environment or use localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

export const useApi = (url, options) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { token } = useAuth()

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const config = {
        ...(options || {}),
        headers: {
          ...(options?.headers || {}),
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
      const response = await axios.get(`${API_BASE_URL}${url}`, config)
      setData(response.data)
      setError(null)
    } catch (err) {
      if (!err.response) {
        setError("Unable to connect to server.")
      } else {
        setError(err.response?.data?.message || "An error occurred")
      }
    } finally {
      setLoading(false)
    }
  }, [url, token, options])

  useEffect(() => {
    if (url) {
      fetchData()
    }
  }, [url, token, fetchData])

  return { data, loading, error, refetch: fetchData }
}

export const useApiMutation = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { token } = useAuth()

  const mutate = async (method, url, data = null, options = {}) => {
    try {
      setLoading(true)
      setError(null)
      const config = {
        ...options,
        headers: {
          ...options.headers,
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
      const response = await axios[method](`${API_BASE_URL}${url}`, data, config)
      return response.data
    } catch (err) {
      let errorMessage
      if (!err.response) {
        errorMessage = "Unable to connect to server."
      } else {
        errorMessage = err.response?.data?.message || "An error occurred"
      }
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return { mutate, loading, error }
}
