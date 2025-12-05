"use client"
import { Button } from "@/components/common/button"
import { getInitials } from "@/utils/formatters"
import { POSITIONS } from "@/constants"

interface Step3Props {
  nickname: string
  position: string
  onConfirm: () => Promise<void>
  onBack: () => void
  loading?: boolean
}

export function Step3Confirmation({ nickname, position, onConfirm, onBack, loading = false }: Step3Props) {
  const initials = getInitials(nickname)
  const posConfig = POSITIONS[position as keyof typeof POSITIONS]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-2">Проверь свой профиль</h2>
        <p className="text-[#AAAAAA]">Убедись, что все верно</p>
      </div>

      <div className="bg-[#1A1A1A] border border-[#333333] rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-[#4CAF50] rounded-full flex items-center justify-center">
            <span className="text-3xl font-bold text-white">{initials}</span>
          </div>

          <div className="flex-1">
            <p className="font-bold text-white text-lg mb-1">{nickname}</p>
            <div className="flex gap-2">
              <span className="inline-block bg-[rgba(76,175,80,0.2)] text-[#4CAF50] px-3 py-1 rounded text-sm font-semibold">
                {position}
              </span>
              <span className="text-2xl">{posConfig.emoji}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#333333] space-y-2">
          <p className="text-sm text-[#AAAAAA]">
            <span className="text-[#4CAF50]">✓</span> Профиль готов к запуску
          </p>
          <p className="text-xs text-[#666666]">Сейчас мы подготовим твой профиль в команде...</p>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button variant="secondary" onClick={onBack} disabled={loading} className="flex-1">
          Назад
        </Button>
        <Button onClick={onConfirm} loading={loading} disabled={loading} className="flex-1">
          Завершить
        </Button>
      </div>
    </div>
  )
}
