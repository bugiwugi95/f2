"use client"

import { useApp } from "./use-app"

export function useToast() {
  const { showToast, removeToast } = useApp()

  return {
    success: (message: string, duration?: number) => showToast(message, "success", duration),
    error: (message: string, duration?: number) => showToast(message, "error", duration),
    info: (message: string, duration?: number) => showToast(message, "info", duration),
    remove: removeToast,
  }
}
