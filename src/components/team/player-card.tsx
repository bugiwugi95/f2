"use client"
import type { Player } from "@/types"
import { getInitials } from "@/utils/formatters"
import { POSITION_LABELS } from "@/utils/constants"
import { Card } from "@/components/common/card"

interface PlayerCardProps {
  player: Player
  onClick?: () => void
}

export function PlayerCard({ player, onClick }: PlayerCardProps) {
  const initials = getInitials(player.nickname)
  const positionLabel = POSITION_LABELS[player.position as keyof typeof POSITION_LABELS]

  return (
    <Card clickable onClick={onClick} className="flex items-center gap-4">
      <div className="w-14 h-14 bg-[#4CAF50] rounded-full flex items-center justify-center flex-shrink-0">
        <span className="text-lg font-bold text-white">{initials}</span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-white truncate">{player.nickname}</p>

        <div className="flex items-center gap-2 mt-1">
          <span className="inline-block bg-[rgba(76,175,80,0.2)] text-[#4CAF50] px-2 py-0.5 rounded text-xs font-semibold">
            {player.position}
          </span>

          {player.isCaptain && <span className="text-sm">⭐ капитан</span>}
        </div>
      </div>

      {player.number && <span className="text-lg font-bold text-[#AAAAAA]">#{player.number}</span>}
    </Card>
  )
}
