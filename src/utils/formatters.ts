export const formatDate = (dateString: string | null): string => {
  if (!dateString) return "Нет даты"

  const date = new Date(dateString)
  const formatter = new Intl.DateTimeFormat("ru-RU", {
    weekday: "short",
    month: "long",
    day: "numeric",
  })

  return formatter.format(date)
}

export const formatTime = (timeString: string | null): string => {
  if (!timeString) return "Время неизвестно"
  return timeString
}

export const formatDateTime = (dateString: string | null, timeString: string | null): string => {
  return `${formatDate(dateString)}, ${formatTime(timeString)}`
}

export const getInitials = (nickname: string): string => {
  return nickname
    .split(/(?=[A-Z])/)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export const formatStats = (value: number | null | undefined): string => {
  return (value ?? 0).toString()
}

export const formatProgress = (current: number, total: number): string => {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0
  return `${percentage}%`
}
