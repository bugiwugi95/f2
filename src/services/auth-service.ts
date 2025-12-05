import { apiClient } from "./api-client"
import type { AuthResponse, UserProfile } from "@/types"
import { apiEndpoints } from "@/config/api-config"
import { STORAGE_KEYS } from "@/constants"

export const authService = {
  async loginWithTelegram(initData: string): Promise<AuthResponse> {
    const response = await apiClient.post(apiEndpoints.auth.login, {
      initData,
    })

    if (response.token) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, response.token)
    }

    if (response.profile) {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(response.profile))
    }

    return response
  },

  async logout(): Promise<void> {
    try {
      await apiClient.delete(apiEndpoints.auth.logout)
    } catch (error) {
      console.error("[v0] Logout error:", error)
    }

    localStorage.removeItem(STORAGE_KEYS.TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER_PROFILE)
    localStorage.removeItem(STORAGE_KEYS.ONBOARDING_COMPLETE)
  },

  async validateToken(): Promise<boolean> {
    try {
      const response = await apiClient.get(apiEndpoints.auth.validate)
      return !!response
    } catch (error) {
      return false
    }
  },

  async setupProfile(nickname: string, position: string): Promise<UserProfile> {
    const response = await apiClient.patch(apiEndpoints.players.setup, {
      nickname,
      position,
    })

    if (response.profile) {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(response.profile))
      localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, "true")
    }

    return response.profile
  },

  getStoredToken(): string | null {
    if (typeof window === "undefined") return null
    return localStorage.getItem(STORAGE_KEYS.TOKEN)
  },

  getStoredProfile(): UserProfile | null {
    if (typeof window === "undefined") return null
    const profile = localStorage.getItem(STORAGE_KEYS.USER_PROFILE)
    return profile ? JSON.parse(profile) : null
  },

  isOnboardingComplete(): boolean {
    if (typeof window === "undefined") return false
    return localStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE) === "true"
  },
}
