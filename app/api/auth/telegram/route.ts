import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("[v0] Proxy: Forwarding auth/telegram request")

    const backendUrl = process.env.BACKEND_URL || "http://localhost:8080"
    const endpoint = `${backendUrl}/api/auth/telegram`

    console.log("[v0] Proxy: Calling backend at", endpoint)

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("[v0] Proxy: Backend returned error", response.status, data)
      return NextResponse.json(data, { status: response.status })
    }

    console.log("[v0] Proxy: Success response from backend")
    return NextResponse.json(data)
  } catch (error: any) {
    console.error("[v0] Proxy error:", error.message)
    return NextResponse.json({ message: "Ошибка сервера", error: error.message }, { status: 500 })
  }
}
