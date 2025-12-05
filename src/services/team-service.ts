import { apiClient } from "./api-client"
import type { TeamData } from "@/types"
import { apiEndpoints } from "@/config/api-config"

export const teamService = {
  async getTeam(): Promise<TeamData> {
    return await apiClient.get(apiEndpoints.team.list)
  },

  async getTeamMembers(position?: string): Promise<any[]> {
    const query = position ? `?position=${position}` : ""
    return await apiClient.get(`${apiEndpoints.team.members}${query}`)
  },
}
