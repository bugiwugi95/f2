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

    if (!webApp?.initData && process.env.NEXT_PUBLIC_DEV_MODE === "true") {
      // Mock initData for local development
      const mockUser = {
        id: 123456789,
        is_bot: false,
        first_name: "IliaBugay",
        last_name: "Dev",
        username: "iliabugay",
        language_code: "ru",
      }

      return `query_id=mock_query_id&user=${encodeURIComponent(JSON.stringify(mockUser))}&auth_date=1234567890&hash=mock_hash`
    }

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
