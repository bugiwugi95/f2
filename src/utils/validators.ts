import { NICKNAME_VALIDATION } from "@/constants"

export const validateNickname = (nickname: string): { valid: boolean; error?: string } => {
  if (!nickname) {
    return { valid: false, error: "Никнейм не может быть пустым" }
  }

  if (nickname.length < NICKNAME_VALIDATION.MIN_LENGTH) {
    return { valid: false, error: `Минимум ${NICKNAME_VALIDATION.MIN_LENGTH} символов` }
  }

  if (nickname.length > NICKNAME_VALIDATION.MAX_LENGTH) {
    return { valid: false, error: `Максимум ${NICKNAME_VALIDATION.MAX_LENGTH} символов` }
  }

  if (!NICKNAME_VALIDATION.PATTERN.test(nickname)) {
    return { valid: false, error: NICKNAME_VALIDATION.PATTERN_NAME }
  }

  return { valid: true }
}

export const validatePosition = (position: string): boolean => {
  return ["GK", "DF", "MF", "FW"].includes(position)
}

export const validateEmail = (email: string): boolean => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(email)
}
