import type { TelegramUser } from "./telegramUser" // Assuming TelegramUser is defined in another file

export interface TelegramWebApp {
  ready: () => void
  onEvent: (eventType: string, eventHandler: () => void) => void
  offEvent: (eventType: string, eventHandler: () => void) => void
  sendData: (data: string) => void
  close: () => void
  expand: () => void
  isExpanded: boolean
  isFullscreen: boolean
  viewportHeight: number
  viewportStableHeight: number
  isVerticalSwipesEnabled: boolean
  isBackButtonShown: boolean
  headerColor: string
  backgroundColor: string
  textColor: string
  hintColor: string
  isClosingConfirmationEnabled: boolean
  initData: string
  initDataUnsafe: InitDataUnsafe
  version: string
  platform: string
  colorScheme: "light" | "dark"
  themeParams: ThemeParams
  MainButton: MainButton
  BackButton: BackButton
  HapticFeedback: HapticFeedback
}

export interface InitDataUnsafe {
  query_id?: string
  user?: TelegramUser
  auth_date?: number
  hash?: string
}

export interface ThemeParams {
  bg_color?: string
  text_color?: string
  hint_color?: string
  link_color?: string
  button_color?: string
  button_text_color?: string
  secondary_bg_color?: string
}

export interface MainButton {
  text: string
  color: string
  textColor: string
  isVisible: boolean
  isActive: boolean
  isProgressVisible: boolean
  setText: (text: string) => void
  onClick: (callback: () => void) => void
  offClick: (callback: () => void) => void
  show: () => void
  hide: () => void
  enable: () => void
  disable: () => void
  showProgress: (leaveActive?: boolean) => void
  hideProgress: () => void
}

export interface BackButton {
  isVisible: boolean
  onClick: (callback: () => void) => void
  offClick: (callback: () => void) => void
  show: () => void
  hide: () => void
}

export interface HapticFeedback {
  impactOccurred: (style: "light" | "medium" | "heavy") => void
  notificationOccurred: (type: "error" | "success" | "warning") => void
  selectionChanged: () => void
}
