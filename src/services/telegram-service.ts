import type { TelegramWebApp, InitDataUnsafe } from "@/types/telegram"

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp
    }
  }
}

export const telegramService = {
  getTelegramWebApp(): TelegramWebApp | null {
    if (typeof window === "undefined") return null
    return window.Telegram?.WebApp || null
  },

  ready(): void {
    const webApp = this.getTelegramWebApp()
    if (webApp) {
      webApp.ready()
    }
  },

  getInitData(): string {
    const webApp = this.getTelegramWebApp()
    return webApp?.initData || ""
  },

  getInitDataUnsafe(): InitDataUnsafe {
    const webApp = this.getTelegramWebApp()
    return webApp?.initDataUnsafe || {}
  },

  getUserId(): number | null {
    const initData = this.getInitDataUnsafe()
    return initData.user?.id || null
  },

  getUserName(): string {
    const initData = this.getInitDataUnsafe()
    return initData.user?.first_name || "User"
  },

  close(): void {
    const webApp = this.getTelegramWebApp()
    if (webApp) {
      webApp.close()
    }
  },

  expand(): void {
    const webApp = this.getTelegramWebApp()
    if (webApp && !webApp.isExpanded) {
      webApp.expand()
    }
  },

  showMainButton(): void {
    const webApp = this.getTelegramWebApp()
    if (webApp) {
      webApp.MainButton.show()
    }
  },

  hideMainButton(): void {
    const webApp = this.getTelegramWebApp()
    if (webApp) {
      webApp.MainButton.hide()
    }
  },

  setMainButtonText(text: string): void {
    const webApp = this.getTelegramWebApp()
    if (webApp) {
      webApp.MainButton.setText(text)
    }
  },

  showBackButton(): void {
    const webApp = this.getTelegramWebApp()
    if (webApp) {
      webApp.BackButton.show()
    }
  },

  hideBackButton(): void {
    const webApp = this.getTelegramWebApp()
    if (webApp) {
      webApp.BackButton.hide()
    }
  },

  onBackButton(callback: () => void): void {
    const webApp = this.getTelegramWebApp()
    if (webApp) {
      webApp.BackButton.onClick(callback)
    }
  },

  hapticFeedback(type: "light" | "medium" | "heavy" = "light"): void {
    const webApp = this.getTelegramWebApp()
    if (webApp?.HapticFeedback) {
      webApp.HapticFeedback.impactOccurred(type)
    }
  },

  getColorScheme(): "light" | "dark" {
    const webApp = this.getTelegramWebApp()
    return webApp?.colorScheme || "dark"
  },
}
