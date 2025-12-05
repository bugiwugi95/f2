"use client"
import type { TeamProgress } from "@/types"
import { Card } from "@/components/common/card"

interface TeamProgressProps {
  progress: TeamProgress
}

export function TeamProgressCard({ progress }: TeamProgressProps) {
  const percentage = (progress.points / (progress.gamesPlayed * 3)) * 100

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[#AAAAAA]">Очков</p>
            <p className="text-2xl font-bold text-white">{progress.points}</p>
          </div>

          <div className="text-right">
            <p className="text-sm text-[#AAAAAA]">Место</p>
            <p className="text-2xl font-bold text-[#4CAF50]">{progress.place}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="w-full h-2 bg-[#333333] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#4CAF50] transition-all duration-300"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <p className="text-xs text-[#AAAAAA]">{Math.round(percentage)}% от максимума</p>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#333333]">
          <div className="text-center">
            <p className="text-sm font-semibold text-[#4CAF50]">{progress.wins}</p>
            <p className="text-xs text-[#AAAAAA]">Побед</p>
          </div>

          <div className="text-center">
            <p className="text-sm font-semibold text-[#FFD700]">{progress.draws}</p>
            <p className="text-xs text-[#AAAAAA]">Ничьих</p>
          </div>

          <div className="text-center">
            <p className="text-sm font-semibold text-[#DC3545]">{progress.losses}</p>
            <p className="text-xs text-[#AAAAAA]">Поражений</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
