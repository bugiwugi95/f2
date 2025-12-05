"use client"

interface SpinnerProps {
  size?: "sm" | "md" | "lg"
  color?: string
}

export function LoadingSpinner({ size = "md", color = "#4CAF50" }: SpinnerProps) {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  }

  return <div className={`${sizes[size]} animate-spin rounded-full border-2 border-[#333333] border-t-[${color}]`} />
}
