"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useTelegram } from "@/hooks/use-telegram"

export default function SplashPage() {
  const router = useRouter()
  const { isLoading, isAuthenticated, profileSetupComplete } = useAuth()
  const { isReady } = useTelegram()
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!showLoading && !isLoading && isReady) {
      if (isAuthenticated) {
        if (profileSetupComplete) {
          router.replace("/dashboard")
        } else {
          router.replace("/onboarding")
        }
      } else {
        router.replace("/auth")
      }
    }
  }, [showLoading, isLoading, isAuthenticated, profileSetupComplete, isReady, router])

  return (
    <div className="w-full h-screen bg-[#0F0F0F] flex flex-col items-center justify-center">
      <div className="animate-spin mb-8">
        <div className="text-6xl">⚽</div>
      </div>

      <h1 className="text-3xl font-bold text-white mb-2 text-center">FK BEZPONT</h1>
      <p className="text-[#AAAAAA] text-center mb-12">Управляй своим профилем</p>

      <div className="w-48 h-1 bg-[#333333] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#4CAF50] rounded-full animate-pulse"
          style={{
            animation: "loading 2s ease-in-out infinite",
          }}
        />
      </div>

      <p className="text-[#888888] text-sm mt-4">Загрузка...</p>

      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          50% { width: 100%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  )
}
