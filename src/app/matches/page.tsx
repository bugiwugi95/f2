"use client"

import { useEffect, useState, useMemo } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useApi } from "@/hooks/use-api"
import { matchesService } from "@/services/matches-service"
import { SafeArea } from "@/components/layout/safe-area"
import { Container } from "@/components/layout/container"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/layout/bottom-nav"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { ErrorState } from "@/components/common/error-state"
import { EmptyState } from "@/components/common/empty-state"
import { MatchCard } from "@/components/matches/match-card"
import { MatchFilter } from "@/components/matches/match-filter"
import { getErrorMessage } from "@/utils/error-handler"

type FilterType = "all" | "upcoming" | "past"

export default function MatchesPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [filter, setFilter] = useState<FilterType>("upcoming")

  const { data: matches, loading, error, retry } = useApi(() => matchesService.getMatches())

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

  const filteredMatches = useMemo(() => {
    if (!matches) return []

    if (filter === "all") return matches
    if (filter === "upcoming") return matches.filter((m) => m.status === "upcoming")
    if (filter === "past") return matches.filter((m) => m.status === "completed")

    return matches
  }, [matches, filter])

  if (!isAuthenticated) {
    return null
  }

  if (loading && !matches) {
    return (
      <SafeArea className="flex items-center justify-center">
        <LoadingSpinner />
      </SafeArea>
    )
  }

  if (error && !matches) {
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
      <Header title="Матчи" />

      <Container className="pb-8">
        <div className="pt-4 space-y-4">
          <MatchFilter activeFilter={filter} onFilterChange={setFilter} />

          {filteredMatches.length === 0 ? (
            <EmptyState
              title="Нет матчей"
              description={`Нет ${filter === "upcoming" ? "предстоящих" : filter === "past" ? "прошлых" : ""} матчей`}
              icon="🎯"
            />
          ) : (
            <div className="space-y-3">
              {filteredMatches.map((match) => (
                <MatchCard key={match.id} match={match} onClick={() => {}} />
              ))}
            </div>
          )}
        </div>
      </Container>

      <BottomNav />
    </SafeArea>
  )
}
