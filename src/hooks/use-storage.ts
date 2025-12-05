"use client"

import { storageService } from "@/services/storage-service"

export function useStorage() {
  return {
    setItem: storageService.setItem,
    getItem: storageService.getItem,
    removeItem: storageService.removeItem,
    clear: storageService.clear,
  }
}
