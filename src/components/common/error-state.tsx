"use client"
import { Button } from "./button"

interface ErrorStateProps {
  message: string
  onRetry?: () => void
  showRetry?: boolean
}

export function ErrorState({ message, onRetry, showRetry = true }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-4xl mb-4">⚠️</div>
      <p className="text-white text-center mb-6">{message}</p>
      {showRetry && onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Повторить
        </Button>
      )}
    </div>
  )
}
