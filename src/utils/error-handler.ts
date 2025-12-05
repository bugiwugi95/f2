import type { ApiError } from "@/types"

export const parseApiError = (error: any): ApiError => {
  if (error.response) {
    return {
      status: error.response.status,
      message: error.response.data?.message || "Произошла ошибка",
      code: error.response.data?.code,
    }
  }

  if (error.message === "Network Error" || !navigator.onLine) {
    return {
      status: 0,
      message: "Нет интернета",
      code: "NO_INTERNET",
    }
  }

  return {
    status: 500,
    message: error.message || "Неизвестная ошибка",
  }
}

export const getErrorMessage = (error: ApiError): string => {
  switch (error.code) {
    case "NO_INTERNET":
      return "Проверь интернет соединение"
    case "UNAUTHORIZED":
      return "Ошибка авторизации"
    case "FORBIDDEN":
      return "Доступ запрещен"
    case "NOT_FOUND":
      return "Ресурс не найден"
    case "VALIDATION_ERROR":
      return "Ошибка валидации. Проверь данные"
    default:
      return error.message || "Произошла ошибка"
  }
}

export const isAuthError = (error: ApiError): boolean => {
  return error.status === 401 || error.code === "UNAUTHORIZED"
}

export const isNetworkError = (error: ApiError): boolean => {
  return error.status === 0 || error.code === "NO_INTERNET"
}
