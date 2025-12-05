"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useApi } from "@/hooks/use-api"
import { useToast } from "@/hooks/use-toast"
import { playersService } from "@/services/players-service"
import { SafeArea } from "@/components/layout/safe-area"
import { Container } from "@/components/layout/container"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/layout/bottom-nav"
import { Card } from "@/components/common/card"
import { Button } from "@/components/common/button"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { ErrorState } from "@/components/common/error-state"
import { Modal } from "@/components/common/modal"
import { getInitials } from "@/utils/formatters"
import { POSITION_LABELS } from "@/utils/constants"
import { POSITIONS } from "@/constants"

export default function ProfilePage() {
  const router = useRouter()
  const { logout, user: authUser } = useAuth()
  const { error: showError, success: showSuccess } = useToast()
  const [showPositionModal, setShowPositionModal] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null)
  const [loggingOut, setLoggingOut] = useState(false)
  const [updatingPosition, setUpdatingPosition] = useState(false)

  const { data: profile, loading, error, retry } = useApi(() => playersService.getProfile())

  useEffect(() => {
    if (!authUser) {
      router.replace("/auth")
      return
    }
    retry()
  }, [authUser, retry, router])

  const handleChangePosition = async () => {
    if (!selectedPosition) return

    setUpdatingPosition(true)
    try {
      await playersService.updatePosition(selectedPosition)
      showSuccess("Позиция обновлена")
      setShowPositionModal(false)
      retry()
    } catch (err) {
      showError("Ошибка при обновлении позиции")
    } finally {
      setUpdatingPosition(false)
    }
  }

  const handleLogout = async () => {
    if (!confirm("Ты уверен? Ты выйдешь из приложения.")) {
      return
    }

    setLoggingOut(true)
    try {
      await logout()
      router.replace("/auth")
    } catch (err) {
      showError("Ошибка при выходе")
    } finally {
      setLoggingOut(false)
    }
  }

  if (!authUser) {
    return null
  }

  if (loading && !profile) {
    return (
      <SafeArea className="flex items-center justify-center">
        <LoadingSpinner />
      </SafeArea>
    )
  }

  if (error && !profile) {
    return (
      <SafeArea>
        <Container className="flex items-center justify-center min-h-screen">
          <ErrorState message="Ошибка загрузки профиля" onRetry={retry} />
        </Container>
      </SafeArea>
    )
  }

  const displayProfile = profile || authUser
  const initials = getInitials(displayProfile.nickname)
  const positionLabel = POSITION_LABELS[displayProfile.position as keyof typeof POSITION_LABELS]

  return (
    <SafeArea>
      <Header title="Профиль" />

      <Container className="pb-8">
        <div className="pt-4 space-y-4">
          <Card className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] p-8 text-center">
            <div className="w-24 h-24 bg-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl font-bold text-white">{initials}</span>
            </div>

            <p className="text-2xl font-bold text-white mb-1">{displayProfile.nickname}</p>
            <p className="text-[#AAAAAA] mb-3">{displayProfile.teamName}</p>

            <div className="flex justify-center gap-3">
              <span className="inline-block bg-[rgba(76,175,80,0.2)] text-[#4CAF50] px-3 py-1 rounded text-sm font-semibold">
                {displayProfile.position}
              </span>
              {displayProfile.isCaptain && <span className="text-lg">⭐ Капитан</span>}
            </div>
          </Card>

          {profile && (
            <Card>
              <div className="space-y-4">
                <h3 className="font-bold text-white">Статистика</h3>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white mb-1">{profile.seasonMatches || 0}</p>
                    <p className="text-xs text-[#AAAAAA]">Матчи</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white mb-1">{profile.seasonGoals || 0}</p>
                    <p className="text-xs text-[#AAAAAA]">Голы</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white mb-1">{profile.seasonAssists || 0}</p>
                    <p className="text-xs text-[#AAAAAA]">Передачи</p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          <div className="space-y-2">
            <Button variant="secondary" fullWidth onClick={() => setShowPositionModal(true)} className="justify-start">
              🔄 Изменить позицию
            </Button>

            <Button variant="secondary" fullWidth className="justify-start">
              ⚙️ Настройки
            </Button>

            <Button variant="secondary" fullWidth className="justify-start">
              🔔 Уведомления
            </Button>
          </div>

          <Button variant="danger" fullWidth onClick={handleLogout} loading={loggingOut} disabled={loggingOut}>
            Выйти из приложения
          </Button>

          <p className="text-xs text-[#666666] text-center">Версия: 1.0.0</p>
        </div>
      </Container>

      <Modal isOpen={showPositionModal} onClose={() => setShowPositionModal(false)} title="Выбери новую позицию">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(POSITIONS).map(([code, config]) => (
              <button
                key={code}
                onClick={() => setSelectedPosition(code)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedPosition === code
                    ? "bg-[rgba(76,175,80,0.1)] border-[#4CAF50]"
                    : "bg-[#1A1A1A] border-[#333333]"
                }`}
              >
                <div className="text-3xl mb-2">{config.emoji}</div>
                <p className="font-bold text-white text-sm">{code}</p>
              </button>
            ))}
          </div>

          <Button
            onClick={handleChangePosition}
            loading={updatingPosition}
            disabled={!selectedPosition || updatingPosition}
            fullWidth
          >
            Подтвердить
          </Button>
        </div>
      </Modal>

      <BottomNav />
    </SafeArea>
  )
}
