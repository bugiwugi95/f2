import { apiClient } from "./api-client"
import type { DashboardData, UserProfile } from "@/types"
import { apiEndpoints } from "@/config/api-config"

export const playersService = {
  async getDashboard(): Promise<DashboardData> {
    return await apiClient.get(apiEndpoints.players.dashboard)
  },

  async getProfile(): Promise<UserProfile> {
    return await apiClient.get(apiEndpoints.players.profile)
  },

  async getMatches(status?: string): Promise<any[]> {
    const query = status ? `?status=${status}` : ""
    return await apiClient.get(`${apiEndpoints.players.matches}${query}`)
  },

  async updatePosition(position: string): Promise<UserProfile> {
    return await apiClient.patch(apiEndpoints.players.setup, { position })
  },
}
