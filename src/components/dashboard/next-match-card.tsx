"use client"
import type { MatchInfo } from "@/types"
import { formatDate, formatTime } from "@/utils/formatters"
import { Card } from "@/components/common/card"
import { Button } from "@/components/common/button"
import { EmptyState } from "@/components/common/empty-state"

interface NextMatchCardProps {
  match: MatchInfo | null
  onViewDetails?: () => void
}

export function NextMatchCard({ match, onViewDetails }: NextMatchCardProps) {
  if (!match || !match.matchDate) {
    return (
      <Card>
        <EmptyState title="Нет предстоящих матчей" icon="🎯" />
      </Card>
    )
  }

  return (
    <Card className="bg-[#1F2D3D] border-[#4CAF50]">
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-white text-lg mb-3">FK BEZPONT vs {match.opponentTeamName}</h3>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-[#AAAAAA]">
            <span>📅</span>
            <span>{formatDate(match.matchDate)}</span>
          </div>

          <div className="flex items-center gap-2 text-[#AAAAAA]">
            <span>🕐</span>
            <span>{formatTime(match.matchTime)}</span>
          </div>

          <div className="flex items-center gap-2 text-[#AAAAAA]">
            <span>📍</span>
            <span>{match.location || "Место не указано"}</span>
          </div>
        </div>

        {onViewDetails && (
          <Button variant="secondary" size="sm" onClick={onViewDetails} className="w-full mt-4">
            Детали матча →
          </Button>
        )}
      </div>
    </Card>
  )
}
