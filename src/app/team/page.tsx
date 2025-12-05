"use client"

import { useEffect, useState, useMemo } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useApi } from "@/hooks/use-api"
import { teamService } from "@/services/team-service"
import { SafeArea } from "@/components/layout/safe-area"
import { Container } from "@/components/layout/container"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/layout/bottom-nav"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { ErrorState } from "@/components/common/error-state"
import { EmptyState } from "@/components/common/empty-state"
import { PlayerCard } from "@/components/team/player-card"
import { PositionFilter } from "@/components/team/position-filter"
import { getErrorMessage } from "@/utils/error-handler"

export default function TeamPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null)

  const { data: teamData, loading, error, retry } = useApi(() => teamService.getTeam())

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth")
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    if (isAuthenticated) {
      retry()
    }
  }, [isAuthenticated, retry])

  const filteredPlayers = useMemo(() => {
    if (!teamData?.players) return []

    if (!selectedPosition) {
      return teamData.players.sort((a, b) => {
        if (a.isCaptain) return -1
        if (b.isCaptain) return 1
        return 0
      })
    }

    return teamData.players
      .filter((p) => p.position === selectedPosition)
      .sort((a, b) => {
        if (a.isCaptain) return -1
        if (b.isCaptain) return 1
        return 0
      })
  }, [teamData, selectedPosition])

  if (!isAuthenticated) {
    return null
  }

  if (loading && !teamData) {
    return (
      <SafeArea className="flex items-center justify-center">
        <LoadingSpinner />
      </SafeArea>
    )
  }

  if (error && !teamData) {
    return (
      <SafeArea>
        <Container className="flex items-center justify-center min-h-screen">
          <ErrorState message={getErrorMessage(error)} onRetry={retry} showRetry={true} />
        </Container>
      </SafeArea>
    )
  }

  return (
    <SafeArea>
      <Header title="Команда" />

      <Container className="pb-8">
        <div className="pt-4 space-y-4">
          <PositionFilter activePosition={selectedPosition} onPositionChange={setSelectedPosition} />

          {filteredPlayers.length === 0 ? (
            <EmptyState title="Нет игроков" icon="👥" />
          ) : (
            <div className="space-y-3">
              {filteredPlayers.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          )}
        </div>
      </Container>

      <BottomNav />
    </SafeArea>
  )
}
