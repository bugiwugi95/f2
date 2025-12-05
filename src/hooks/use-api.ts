"use client"

import { useState, useCallback } from "react"
import type { ApiError } from "@/types"

export function useApi<T>(apiCall: () => Promise<T>): {
  data: T | null
  loading: boolean
  error: ApiError | null
  execute: () => Promise<T | null>
  retry: () => Promise<T | null>
} {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  const execute = useCallback(async (): Promise<T | null> => {
    setLoading(true)
    setError(null)
    try {
      const result = await apiCall()
      setData(result)
      return result
    } catch (err: any) {
      const apiError: ApiError = err
      setError(apiError)
      return null
    } finally {
      setLoading(false)
    }
  }, [apiCall])

  const retry = execute

  return { data, loading, error, execute, retry }
}
