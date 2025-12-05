import { apiClient } from "./api-client"
import type { AuthResponse, UserProfile, TelegramAuthResponse } from "@/types"
import { apiEndpoints } from "@/config/api-config"
import { STORAGE_KEYS } from "@/constants"

export const authService = {
  async loginWithTelegram(initData: string): Promise<AuthResponse> {
    const response: TelegramAuthResponse = await apiClient.post(apiEndpoints.auth.login, {
      initData,
    })

    if (response.token) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, response.token)
    }

    const profile: UserProfile = {
      id: String(response.telegramId),
      nickname: response.username,
      position: "GK", // Default, will be updated on setup
      teamName: "",
      isCaptain: false,
    }

    if (profile) {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile))
    }

    return {
      token: response.token,
      profileSetupComplete: !response.requiresProfileSetup,
      profile,
    }
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

    const profile: UserProfile = {
      id: String(response.telegramId || response.id),
      nickname: response.nickname || nickname,
      position: position as "GK" | "DF" | "MF" | "FW",
      teamName: response.teamName || "",
      isCaptain: response.isCaptain || false,
    }

    if (profile) {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile))
      localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, "true")
    }

    return profile
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
