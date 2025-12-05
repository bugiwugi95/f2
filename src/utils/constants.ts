export const APP_NAME = "Football Club App"
export const TEAM_NAME = "FK BEZPONT"

export const POSITION_LABELS = {
  GK: "Вратарь",
  DF: "Защитник",
  MF: "Полузащитник",
  FW: "Нападающий",
} as const

export const MATCH_STATUS_LABELS = {
  upcoming: "Предстоящий",
  completed: "Завершен",
  cancelled: "Отменен",
} as const

export const MATCH_RESULT_LABELS = {
  W: "Победа",
  D: "Ничья",
  L: "Поражение",
} as const
