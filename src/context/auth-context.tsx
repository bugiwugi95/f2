"use client"

import type React from "react"
import { createContext, useState, useCallback, useEffect } from "react"
import type { UserProfile, AuthResponse } from "@/types"
import { authService } from "@/services/auth-service"

export interface AuthContextType {
  user: UserProfile | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  profileSetupComplete: boolean
  login: (initData: string) => Promise<AuthResponse>
  logout: () => Promise<void>
  setupProfile: (nickname: string, position: string) => Promise<void>
  checkAuth: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [profileSetupComplete, setProfileSetupComplete] = useState(false)

  const checkAuth = useCallback(async () => {
    setIsLoading(true)
    try {
      const storedToken = authService.getStoredToken()
      const storedProfile = authService.getStoredProfile()

      if (storedToken) {
        const isValid = await authService.validateToken()
        if (isValid) {
          setToken(storedToken)
          setUser(storedProfile)
          setProfileSetupComplete(authService.isOnboardingComplete())
        } else {
          localStorage.removeItem("token")
          localStorage.removeItem("userProfile")
        }
      }
    } catch (error) {
      console.error("[v0] Auth check error:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = useCallback(async (initData: string): Promise<AuthResponse> => {
    setIsLoading(true)
    try {
      const response = await authService.loginWithTelegram(initData)
      setToken(response.token)
      setUser(response.profile)
      setProfileSetupComplete(response.profileSetupComplete)
      return response
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    setIsLoading(true)
    try {
      await authService.logout()
      setToken(null)
      setUser(null)
      setProfileSetupComplete(false)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const setupProfile = useCallback(async (nickname: string, position: string) => {
    setIsLoading(true)
    try {
      const profile = await authService.setupProfile(nickname, position)
      setUser(profile)
      setProfileSetupComplete(true)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    checkAuth()

    const handleLogout = () => {
      setToken(null)
      setUser(null)
      setProfileSetupComplete(false)
    }

    window.addEventListener("logout", handleLogout)
    return () => window.removeEventListener("logout", handleLogout)
  }, [checkAuth])

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!token,
    profileSetupComplete,
    login,
    logout,
    setupProfile,
    checkAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
