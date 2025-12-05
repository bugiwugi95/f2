"use client"

import type { ReactNode } from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  closeOnBackdropClick?: boolean
}

export function Modal({ isOpen, onClose, title, children, closeOnBackdropClick = true }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => closeOnBackdropClick && onClose()} />

      <div className="relative bg-[#1A1A1A] rounded-xl max-w-sm w-full mx-4 max-h-[80vh] overflow-y-auto">
        {title && (
          <div className="flex items-center justify-between p-4 border-b border-[#333333]">
            <h2 className="text-lg font-bold text-white">{title}</h2>
            <button onClick={onClose} className="text-[#AAAAAA] hover:text-white transition-colors">
              ✕
            </button>
          </div>
        )}

        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}
