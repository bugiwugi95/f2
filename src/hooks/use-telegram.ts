"use client"

import { useEffect, useState } from "react"
import { telegramService } from "@/services/telegram-service"
import type { InitDataUnsafe } from "@/types/telegram"

export function useTelegram() {
  const [initData, setInitData] = useState<string>("")
  const [initDataUnsafe, setInitDataUnsafe] = useState<InitDataUnsafe>({})
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    try {
      telegramService.ready()
      telegramService.expand()

      const data = telegramService.getInitData()
      const dataUnsafe = telegramService.getInitDataUnsafe()

      setInitData(data)
      setInitDataUnsafe(dataUnsafe)
      setIsReady(true)
    } catch (error) {
      console.error("[v0] Telegram initialization error:", error)
    }
  }, [])

  return {
    initData,
    initDataUnsafe,
    isReady,
    userId: telegramService.getUserId(),
    userName: telegramService.getUserName(),
    hapticFeedback: telegramService.hapticFeedback,
    close: telegramService.close,
    showMainButton: telegramService.showMainButton,
    hideMainButton: telegramService.hideMainButton,
    showBackButton: telegramService.showBackButton,
    hideBackButton: telegramService.hideBackButton,
    onBackButton: telegramService.onBackButton,
  }
}
