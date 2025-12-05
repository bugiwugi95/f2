"use client"

import type React from "react"
import { createContext, useState, useCallback } from "react"
import type { Toast } from "@/types"
import { TABS } from "@/constants"

export interface AppContextType {
  currentTab: string
  setCurrentTab: (tab: string) => void
  toasts: Toast[]
  showToast: (message: string, type: "success" | "error" | "info", duration?: number) => void
  removeToast: (id: string) => void
}

export const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentTab, setCurrentTab] = useState(TABS.DASHBOARD)
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, type: "success" | "error" | "info", duration = 3000) => {
    const id = `toast-${Date.now()}`
    const toast: Toast = { id, message, type, duration }

    setToasts((prev) => [...prev, toast])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)

    return id
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const value: AppContextType = {
    currentTab,
    setCurrentTab,
    toasts,
    showToast,
    removeToast,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
