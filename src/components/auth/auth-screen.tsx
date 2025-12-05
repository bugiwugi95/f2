"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useTelegram } from "@/hooks/use-telegram"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/common/button"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { getErrorMessage, parseApiError } from "@/utils/error-handler"

export function AuthScreen() {
  const router = useRouter()
  const { login } = useAuth()
  const { initData, isReady } = useTelegram()
  const { error: showError } = useToast()
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!initData) {
      showError("Ошибка инициализации Telegram")
      return
    }

    setLoading(true)
    try {
      const response = await login(initData)

      if (response.profileSetupComplete) {
        router.replace("/dashboard")
      } else {
        router.replace("/onboarding")
      }
    } catch (err: any) {
      const error = parseApiError(err)
      showError(getErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }

  if (!isReady) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#0F0F0F]">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-[#0F0F0F] flex flex-col">
      <div className="flex-1 overflow-y-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-12">
            <div className="text-5xl mb-4">⚽</div>
            <h1 className="text-2xl font-bold text-white mb-2">FK BEZPONT</h1>
            <p className="text-[#AAAAAA]">Футбольный клуб</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-[#1A1A1A] border border-[#333333] rounded-xl p-4">
              <div className="flex gap-3">
                <span className="text-2xl">📱</span>
                <div>
                  <h3 className="font-semibold text-white mb-1">Одна кнопка для входа</h3>
                  <p className="text-sm text-[#AAAAAA]">Используем только твой ID и имя из Telegram</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1A1A] border border-[#333333] rounded-xl p-4">
              <div className="flex gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <h3 className="font-semibold text-white mb-1">Статистика сезона</h3>
                  <p className="text-sm text-[#AAAAAA]">Отслеживай свои матчи и голы</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1A1A] border border-[#333333] rounded-xl p-4">
              <div className="flex gap-3">
                <span className="text-2xl">👥</span>
                <div>
                  <h3 className="font-semibold text-white mb-1">Вся команда в одном месте</h3>
                  <p className="text-sm text-[#AAAAAA]">Видь статистику и результаты товарищей</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 bg-[#0F0F0F] border-t border-[#222222]">
        <Button
          fullWidth
          size="lg"
          onClick={handleLogin}
          loading={loading}
          disabled={loading}
          className="mb-4 bg-[#0088cc] hover:bg-[#0077b3]"
        >
          Войти через Telegram
        </Button>

        <p className="text-xs text-[#666666] text-center italic">
          Мы используем только твой ID и имя из Telegram. Никаких данных не передаются третьим лицам.
        </p>
      </div>
    </div>
  )
}
