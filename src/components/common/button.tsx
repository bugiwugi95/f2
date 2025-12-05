"use client"

import type { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost"
  size?: "sm" | "md" | "lg"
  loading?: boolean
  fullWidth?: boolean
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  className = "",
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses =
    "font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    primary: "bg-[#4CAF50] text-white hover:bg-[#3D8B40] active:scale-95",
    secondary: "bg-[#1A1A1A] text-white border border-[#333333] hover:bg-[#222222]",
    danger: "bg-[rgba(220,53,69,0.1)] text-[#DC3545] border border-[#DC3545] hover:bg-[rgba(220,53,69,0.2)]",
    ghost: "bg-transparent text-white hover:bg-[rgba(255,255,255,0.05)]",
  }

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-4 py-3.5 text-base w-full",
  }

  const widthClass = fullWidth ? "w-full" : ""

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <span className="animate-spin inline-block">⟳</span> : children}
    </button>
  )
}
