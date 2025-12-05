// API Response Types
export interface AuthResponse {
  token: string
  profileSetupComplete: boolean
  profile: UserProfile
}

export interface UserProfile {
  id: string
  nickname: string
  position: "GK" | "DF" | "MF" | "FW"
  teamName: string
  isCaptain: boolean
  number?: number
}

export interface DashboardData {
  nickname: string
  position: string
  teamName: string
  seasonGoals: number
  seasonAssists: number
  seasonMatches: number
  isCaptain: boolean
  nextMatch: MatchInfo | null
  teamProgress: TeamProgress
}

export interface MatchInfo {
  id: string
  opponentTeamName: string
  matchDate: string | null
  matchTime: string | null
  location: string | null
  status?: "upcoming" | "completed" | "cancelled"
  result?: string
}

export interface TeamProgress {
  points: number
  wins: number
  draws: number
  losses: number
  place: number
  gamesPlayed: number
}

export interface MatchCard {
  id: string
  date: string
  time: string
  opponentTeamName: string
  location: string
  result: string | null
  status: "upcoming" | "completed" | "cancelled"
  homeTeam?: string
  awayTeam?: string
  homeScore?: number
  awayScore?: number
}

export interface Player {
  id: string
  nickname: string
  position: "GK" | "DF" | "MF" | "FW"
  isCaptain: boolean
  number?: number
}

export interface TeamData {
  teamName: string
  players: Player[]
}

export interface Toast {
  id: string
  message: string
  type: "success" | "error" | "info"
  duration: number
}

export interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
}

export interface ApiError {
  status: number
  message: string
  code?: string
}
