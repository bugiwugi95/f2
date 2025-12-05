import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")

    if (!token) {
      return NextResponse.json({ message: "Требуется авторизация" }, { status: 401 })
    }

    const backendUrl = process.env.BACKEND_URL || "http://localhost:8080"
    const endpoint = `${backendUrl}/api/players/me/dashboard`

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
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
