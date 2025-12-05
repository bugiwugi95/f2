export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""

export const POSITIONS = {
  GK: { code: "GK", name: "Вратарь", emoji: "🧤" },
  DF: { code: "DF", name: "Защитник", emoji: "⬛" },
  MF: { code: "MF", name: "Полузащитник", emoji: "⚽" },
  FW: { code: "FW", name: "Нападающий", emoji: "🎯" },
} as const

export const STORAGE_KEYS = {
  TOKEN: "token",
  USER_PROFILE: "userProfile",
  ONBOARDING_COMPLETE: "onboardingComplete",
  LAST_ACTIVE_TAB: "lastActiveTab",
  APP_SETTINGS: "appSettings",
} as const

export const TABS = {
  DASHBOARD: "dashboard",
  MATCHES: "matches",
  TEAM: "team",
  PROFILE: "profile",
} as const

export const MATCH_STATUSES = {
  UPCOMING: "upcoming",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const

export const TOAST_DURATION = {
  SHORT: 2000,
  MEDIUM: 3000,
  LONG: 5000,
} as const

export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
} as const

export const NICKNAME_VALIDATION = {
  MIN_LENGTH: 3,
  MAX_LENGTH: 20,
  PATTERN: /^[a-zA-Z0-9]+$/,
  PATTERN_NAME: "Только латинские буквы и цифры",
} as const
