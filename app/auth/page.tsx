"use client"
import { AuthScreen } from "@/components/auth/auth-screen"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const router = useRouter()
  const { isAuthenticated, profileSetupComplete } = useAuth()

  if (isAuthenticated) {
    if (profileSetupComplete) {
      router.replace("/dashboard")
    } else {
      router.replace("/onboarding")
    }
    return null
  }

  return <AuthScreen />
}
