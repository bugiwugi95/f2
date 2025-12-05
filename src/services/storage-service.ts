export const storageService = {
  setItem(key: string, value: any): void {
    if (typeof window === "undefined") return

    try {
      const serialized = typeof value === "string" ? value : JSON.stringify(value)
      localStorage.setItem(key, serialized)
    } catch (error) {
      console.error("[v0] Storage set error:", error)
    }
  },

  getItem(key: string): any {
    if (typeof window === "undefined") return null

    try {
      const item = localStorage.getItem(key)
      if (!item) return null

      try {
        return JSON.parse(item)
      } catch {
        return item
      }
    } catch (error) {
      console.error("[v0] Storage get error:", error)
      return null
    }
  },

  removeItem(key: string): void {
    if (typeof window === "undefined") return

    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error("[v0] Storage remove error:", error)
    }
  },

  clear(): void {
    if (typeof window === "undefined") return

    try {
      localStorage.clear()
    } catch (error) {
      console.error("[v0] Storage clear error:", error)
    }
  },

  getAllKeys(): string[] {
    if (typeof window === "undefined") return []

    try {
      const keys: string[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key) keys.push(key)
      }
      return keys
    } catch (error) {
      console.error("[v0] Storage keys error:", error)
      return []
    }
  },
}
