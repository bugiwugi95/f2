"use client"

import { useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useApi } from "@/hooks/use-api"
import { useToast } from "@/hooks/use-toast"
import { playersService } from "@/services/players-service"
import { SafeArea } from "@/components/layout/safe-area"
import { Container } from "@/components/layout/container"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/layout/bottom-nav"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { ErrorState } from "@/components/common/error-state"
import { ProfileCard } from "@/components/dashboard/profile-card"
import { SeasonStats } from "@/components/dashboard/season-stats"
import { NextMatchCard } from "@/components/dashboard/next-match-card"
import { TeamProgressCard } from "@/components/dashboard/team-progress"
import { getErrorMessage } from "@/utils/error-handler"

export default function DashboardPage() {
  const router = useRouter()
  const { isAuthenticated, profileSetupComplete } = useAuth()
  const { error: showError } = useToast()

  const { data: dashboardData, loading, error, retry } = useApi(() => playersService.getDashboard())

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth")
    } else if (!profileSetupComplete) {
      router.replace("/onboarding")
    }
  }, [isAuthenticated, profileSetupComplete, router])

  useEffect(() => {
    if (isAuthenticated) {
      retry()
    }
  }, [isAuthenticated, retry])

  if (!isAuthenticated) {
    return null
  }

  if (loading && !dashboardData) {
    return (
      <SafeArea className="flex items-center justify-center">
        <LoadingSpinner />
      </SafeArea>
    )
  }

  if (error && !dashboardData) {
    return (
      <SafeArea>
        <Container className="flex items-center justify-center min-h-screen">
          <ErrorState message={getErrorMessage(error)} onRetry={retry} showRetry={true} />
        </Container>
      </SafeArea>
    )
  }

  if (!dashboardData) {
    return null
  }

  const userProfile = {
    id: "user_1",
    nickname: dashboardData.nickname,
    position: dashboardData.position as "GK" | "DF" | "MF" | "FW",
    teamName: dashboardData.teamName,
    isCaptain: dashboardData.isCaptain,
  }

  return (
    <SafeArea>
      <Header title="Dashboard" />

      <Container className="pb-8">
        <div className="space-y-4 pt-4">
          <ProfileCard profile={userProfile} />

          <SeasonStats
            matches={dashboardData.seasonMatches}
            goals={dashboardData.seasonGoals}
            assists={dashboardData.seasonAssists}
          />

          <div>
            <h3 className="text-sm font-semibold text-[#AAAAAA] mb-3">Следующий матч</h3>
            <NextMatchCard match={dashboardData.nextMatch} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#AAAAAA] mb-3">Прогресс команды</h3>
            <TeamProgressCard progress={dashboardData.teamProgress} />
          </div>
        </div>
      </Container>

      <BottomNav />
    </SafeArea>
  )
}
