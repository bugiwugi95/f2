import { type ApiError, parseApiError, isAuthError } from "@/utils/error-handler"
import { STORAGE_KEYS, API_BASE_URL } from "@/constants"

interface RequestOptions {
  headers?: Record<string, string>
  body?: any
  timeout?: number
}

class ApiClient {
  private baseUrl: string
  private timeout: number

  constructor(baseUrl: string = API_BASE_URL, timeout = 10000) {
    this.baseUrl = baseUrl
    this.timeout = timeout
  }

  private getAuthHeader(): Record<string, string> {
    const token = this.getToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  private getToken(): string | null {
    if (typeof window === "undefined") return null
    return localStorage.getItem(STORAGE_KEYS.TOKEN)
  }

  private async executeRequest(method: string, endpoint: string, options: RequestOptions = {}): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...this.getAuthHeader(),
      ...options.headers,
    }

    console.log("[v0] API Request:", method, url, options.body)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), options.timeout || this.timeout)

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      console.log("[v0] API Response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error("[v0] API Error:", errorData)
        const error = new Error(errorData.message || `HTTP ${response.status}`)
        ;(error as any).response = { status: response.status, data: errorData }
        throw error
      }

      const data = await response.json()
      console.log("[v0] API Response data:", data)
      return data
    } catch (error: any) {
      clearTimeout(timeoutId)

      console.error("[v0] API Exception:", error)

      if (error.name === "AbortError") {
        const apiError: ApiError = {
          status: 0,
          message: "Запрос истек",
          code: "TIMEOUT",
        }
        throw apiError
      }

      const apiError = parseApiError(error)

      if (isAuthError(apiError)) {
        if (typeof window !== "undefined") {
          localStorage.removeItem(STORAGE_KEYS.TOKEN)
          localStorage.removeItem(STORAGE_KEYS.USER_PROFILE)
          window.dispatchEvent(new Event("logout"))
        }
      }

      throw apiError
    }
  }

  async get(endpoint: string, options?: RequestOptions): Promise<any> {
    return this.executeRequest("GET", endpoint, options)
  }

  async post(endpoint: string, body?: any, options?: RequestOptions): Promise<any> {
    return this.executeRequest("POST", endpoint, { ...options, body })
  }

  async patch(endpoint: string, body?: any, options?: RequestOptions): Promise<any> {
    return this.executeRequest("PATCH", endpoint, { ...options, body })
  }

  async delete(endpoint: string, options?: RequestOptions): Promise<any> {
    return this.executeRequest("DELETE", endpoint, options)
  }
}

export const apiClient = new ApiClient()
