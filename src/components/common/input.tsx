"use client"

import type { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helpText?: string
}

export function Input({ label, error, helpText, className = "", ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-semibold text-white mb-2">{label}</label>}

      <input
        className={`w-full px-4 py-3 rounded-lg bg-[#1F1F1F] text-white placeholder-[#666666] border border-[#333333] focus:border-[#4CAF50] focus:outline-none transition-colors ${className} ${
          error ? "border-[#DC3545]" : ""
        }`}
        {...props}
      />

      {error && <p className="text-sm text-[#DC3545] mt-1">{error}</p>}
      {helpText && <p className="text-xs text-[#999999] mt-1">{helpText}</p>}
    </div>
  )
}
