"use client"

import type { ReactNode } from "react"

interface CardProps {
  children: ReactNode
  className?: string
  clickable?: boolean
  onClick?: () => void
}

export function Card({ children, className = "", clickable = false, onClick }: CardProps) {
  return (
    <div
      className={`bg-[#1A1A1A] border border-[#333333] rounded-xl p-4 ${className} ${
        clickable ? "cursor-pointer hover:bg-[#222222] hover:border-[#4CAF50] transition-colors" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
