import type React from "react"
import type { Metadata } from "next"
import { Providers } from "@/context/providers"
import { ToastContainer } from "@/components/common/toast-container"
import "./globals.css"

export const metadata: Metadata = {
  title: "FK BEZPONT - Football Club",
  description: "Manage your football club profile and statistics",
  viewport: {
    width: "device-width",
    initialScale: 1,
    userScalable: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <meta name="theme-color" content="#0F0F0F" />
        <meta name="apple-mobile-web-app-capable" content="true" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="bg-[#0F0F0F] text-white">
        <Providers>
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  )
}
