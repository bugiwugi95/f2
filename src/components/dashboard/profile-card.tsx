"use client"
import type { UserProfile } from "@/types"
import { getInitials } from "@/utils/formatters"
import { POSITION_LABELS } from "@/utils/constants"
import { Card } from "@/components/common/card"

interface ProfileCardProps {
  profile: UserProfile
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const initials = getInitials(profile.nickname)
  const positionLabel = POSITION_LABELS[profile.position as keyof typeof POSITION_LABELS]

  return (
    <Card className="p-6 bg-gradient-to-br from-[#1A1A2E] to-[#16213E]">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-[#4CAF50] rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-2xl font-bold text-white">{initials}</span>
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-bold text-white text-lg truncate">{profile.nickname}</p>
          <p className="text-sm text-[#AAAAAA] truncate">{profile.teamName}</p>

          <div className="flex items-center gap-2 mt-2">
            <span className="inline-block bg-[rgba(76,175,80,0.2)] text-[#4CAF50] px-2 py-1 rounded text-xs font-semibold">
              {profile.position}
            </span>
            {profile.isCaptain && <span className="text-lg">⭐</span>}
          </div>
        </div>
      </div>
    </Card>
  )
}
