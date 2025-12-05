import { apiClient } from "./api-client"
import type { MatchCard } from "@/types"
import { apiEndpoints } from "@/config/api-config"

export const matchesService = {
  async getMatches(): Promise<MatchCard[]> {
    return await apiClient.get(apiEndpoints.matches.list)
  },

  async getMatchDetail(matchId: string): Promise<MatchCard> {
    return await apiClient.get(apiEndpoints.matches.detail(matchId))
  },
}
