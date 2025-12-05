"use client"

import { useState } from "react"
import { POSITIONS } from "@/constants"
import { Button } from "@/components/common/button"

interface Step2Props {
  onContinue: (position: string) => void
  onBack: () => void
  initialValue?: string
}

export function Step2Position({ onContinue, onBack, initialValue }: Step2Props) {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(initialValue || null)

  const handleContinue = () => {
    if (selectedPosition) {
      onContinue(selectedPosition)
    }
  }

  const positionList = Object.entries(POSITIONS)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-2">Выбери свою позицию</h2>
        <p className="text-[#AAAAAA]">На какой позиции ты играешь?</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {positionList.map(([code, config]) => (
          <button
            key={code}
            onClick={() => setSelectedPosition(code)}
            className={`p-6 rounded-xl border-2 transition-all duration-200 text-center ${
              selectedPosition === code
                ? "bg-[rgba(76,175,80,0.1)] border-[#4CAF50] scale-105"
                : "bg-[#1A1A1A] border-[#333333] hover:border-[#4CAF50]"
            }`}
          >
            <div className="text-4xl mb-3">{config.emoji}</div>
            <p className="font-bold text-white text-sm mb-1">{code}</p>
            <p className="text-xs text-[#AAAAAA]">{config.name}</p>
          </button>
        ))}
      </div>

      <div className="flex gap-3 pt-4">
        <Button variant="secondary" onClick={onBack} className="flex-1">
          Назад
        </Button>
        <Button onClick={handleContinue} disabled={!selectedPosition} className="flex-1">
          Продолжить
        </Button>
      </div>
    </div>
  )
}
