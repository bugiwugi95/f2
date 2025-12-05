"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { SafeArea } from "@/components/layout/safe-area"
import { Container } from "@/components/layout/container"
import { Step1Nickname } from "@/components/onboarding/step1-nickname"
import { Step2Position } from "@/components/onboarding/step2-position"
import { Step3Confirmation } from "@/components/onboarding/step3-confirmation"
import { ProgressIndicator } from "@/components/onboarding/progress-indicator"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { getErrorMessage, parseApiError } from "@/utils/error-handler"

type OnboardingStep = 1 | 2 | 3

export default function OnboardingPage() {
  const router = useRouter()
  const { setupProfile, profileSetupComplete, isLoading: authLoading } = useAuth()
  const { error: showError } = useToast()

  const [step, setStep] = useState<OnboardingStep>(1)
  const [nickname, setNickname] = useState("")
  const [position, setPosition] = useState("")
  const [loading, setLoading] = useState(false)

  if (profileSetupComplete) {
    router.replace("/dashboard")
    return null
  }

  const handleStep1Continue = (nick: string) => {
    setNickname(nick)
    setStep(2)
  }

  const handleStep1Back = () => {
    router.replace("/auth")
  }

  const handleStep2Continue = (pos: string) => {
    setPosition(pos)
    setStep(3)
  }

  const handleStep2Back = () => {
    setStep(1)
  }

  const handleStep3Confirm = async () => {
    if (!nickname || !position) {
      showError("Заполни все поля")
      return
    }

    setLoading(true)
    try {
      await setupProfile(nickname, position)
      router.replace("/dashboard")
    } catch (err: any) {
      const error = parseApiError(err)
      showError(getErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
    return (
      <SafeArea className="flex items-center justify-center">
        <LoadingSpinner />
      </SafeArea>
    )
  }

  return (
    <SafeArea>
      <Container className="pt-8">
        <div className="mb-8">
          <ProgressIndicator currentStep={step} totalSteps={3} />
        </div>

        <div className="bg-[#1A1A1A] border border-[#333333] rounded-xl p-6">
          {step === 1 && (
            <Step1Nickname onContinue={handleStep1Continue} onBack={handleStep1Back} initialValue={nickname} />
          )}

          {step === 2 && (
            <Step2Position onContinue={handleStep2Continue} onBack={handleStep2Back} initialValue={position} />
          )}

          {step === 3 && (
            <Step3Confirmation
              nickname={nickname}
              position={position}
              onConfirm={handleStep3Confirm}
              onBack={handleStep2Back}
              loading={loading}
            />
          )}
        </div>
      </Container>
    </SafeArea>
  )
}
