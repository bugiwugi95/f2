"use client"
import type { MatchCard as MatchCardType } from "@/types"
import { formatDate, formatTime } from "@/utils/formatters"
import { Card } from "@/components/common/card"

interface MatchCardProps {
  match: MatchCardType
  onClick?: () => void
}

export function MatchCard({ match, onClick }: MatchCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "upcoming":
        return "🔵"
      case "completed":
        return match.result?.includes("W") ? "✅" : match.result?.includes("D") ? "🟡" : "❌"
      default:
        return "⭕"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "upcoming":
        return "Предстоящий"
      case "completed":
        return "Завершен"
      default:
        return status
    }
  }

  return (
    <Card clickable onClick={onClick} className="cursor-pointer hover:border-[#4CAF50]">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-[#AAAAAA] mb-1">
              {formatDate(match.date)} {formatTime(match.time)}
            </p>
            <p className="font-semibold text-white">{match.opponentTeamName}</p>
          </div>

          <div className="text-right">
            <p className="text-2xl font-bold text-white">{match.result || "-"}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#333333]">
          <div className="flex items-center gap-2">
            <span>{getStatusIcon(match.status)}</span>
            <span className="text-xs text-[#AAAAAA]">{getStatusLabel(match.status)}</span>
          </div>

          <span className="text-xs text-[#4CAF50]">📍 {match.location}</span>
        </div>
      </div>
    </Card>
  )
}
