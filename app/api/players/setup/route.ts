import { type NextRequest, NextResponse } from "next/server"

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const token = request.headers.get("authorization")

    console.log("[v0] Proxy: Forwarding players/setup request")

    const backendUrl = process.env.BACKEND_URL || "http://localhost:8080"
    const endpoint = `${backendUrl}/api/players/me/setup`

    const response = await fetch(endpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: token }),
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error("[v0] Proxy error:", error.message)
    return NextResponse.json({ message: "Ошибка сервера", error: error.message }, { status: 500 })
  }
}
