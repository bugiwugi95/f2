"use client"

import { useState } from "react"
import { Input } from "@/components/common/input"
import { Button } from "@/components/common/button"
import { validateNickname } from "@/utils/validators"
import { NICKNAME_VALIDATION } from "@/constants"

interface Step1Props {
  onContinue: (nickname: string) => void
  onBack: () => void
  initialValue?: string
}

export function Step1Nickname({ onContinue, onBack, initialValue = "" }: Step1Props) {
  const [nickname, setNickname] = useState(initialValue)
  const [error, setError] = useState<string>()

  const validation = validateNickname(nickname)

  const handleContinue = () => {
    if (validation.valid) {
      onContinue(nickname)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-2">Как тебя зовут в клубе?</h2>
        <p className="text-[#AAAAAA]">Выбери никнейм для профиля</p>
      </div>

      <Input
        value={nickname}
        onChange={(e) => {
          setNickname(e.target.value)
          setError(undefined)
        }}
        placeholder="Введи никнейм..."
        error={error || (nickname && !validation.valid ? validation.error : undefined)}
        helpText={`${NICKNAME_VALIDATION.MIN_LENGTH}-${NICKNAME_VALIDATION.MAX_LENGTH} символов, латинские буквы и цифры`}
      />

      <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg p-4 space-y-2 text-sm">
        <p className="font-semibold text-white">Советы:</p>
        <ul className="text-[#AAAAAA] space-y-1">
          <li>• Латинские буквы и цифры</li>
          <li>
            • {NICKNAME_VALIDATION.MIN_LENGTH}-{NICKNAME_VALIDATION.MAX_LENGTH} символов
          </li>
          <li>• Уникальный в команде</li>
        </ul>
      </div>

      <div className="flex gap-3 pt-4">
        <Button variant="secondary" onClick={onBack} className="flex-1">
          Назад
        </Button>
        <Button onClick={handleContinue} disabled={!validation.valid} className="flex-1">
          Продолжить
        </Button>
      </div>
    </div>
  )
}
