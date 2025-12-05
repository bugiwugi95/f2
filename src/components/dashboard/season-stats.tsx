"use client"
import { Card } from "@/components/common/card"

interface SeasonStatsProps {
  matches: number
  goals: number
  assists: number
}

export function SeasonStats({ matches, goals, assists }: SeasonStatsProps) {
  const stats = [
    { label: "Матчи", value: matches },
    { label: "Голы", value: goals },
    { label: "Передачи", value: assists },
  ]

  return (
    <Card>
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-xs text-[#AAAAAA]">{stat.label}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
