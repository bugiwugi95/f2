"use client"
import { POSITIONS } from "@/constants"

interface PositionFilterProps {
  activePosition: string | null
  onPositionChange: (position: string | null) => void
}

export function PositionFilter({ activePosition, onPositionChange }: PositionFilterProps) {
  const positions = [
    { code: null, name: "Все" },
    ...Object.entries(POSITIONS).map(([code, config]) => ({
      code,
      name: code,
    })),
  ]

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      <button
        onClick={() => onPositionChange(null)}
        className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
          activePosition === null
            ? "bg-[#4CAF50] text-white font-semibold"
            : "bg-[#1A1A1A] text-[#AAAAAA] border border-[#333333]"
        }`}
      >
        Все
      </button>

      {Object.entries(POSITIONS).map(([code, config]) => (
        <button
          key={code}
          onClick={() => onPositionChange(code)}
          className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
            activePosition === code
              ? "bg-[#4CAF50] text-white font-semibold"
              : "bg-[#1A1A1A] text-[#AAAAAA] border border-[#333333]"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  )
}
