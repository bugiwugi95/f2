"use client"

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  const percentage = (currentStep / totalSteps) * 100

  return (
    <div className="space-y-2">
      <p className="text-sm text-[#AAAAAA]">
        Шаг {currentStep} из {totalSteps}
      </p>
      <div className="w-full h-1 bg-[#333333] rounded-full overflow-hidden">
        <div className="h-full bg-[#4CAF50] transition-all duration-300" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}
