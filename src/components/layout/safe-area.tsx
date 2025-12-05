"use client"

import type { ReactNode } from "react"

interface SafeAreaProps {
  children: ReactNode
  className?: string
}

export function SafeArea({ children, className = "" }: SafeAreaProps) {
  return (
    <div className={`min-h-screen bg-[#0F0F0F] ${className}`} style={{ paddingBottom: "70px" }}>
      {children}
    </div>
  )
}
