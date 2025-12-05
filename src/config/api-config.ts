export const apiEndpoints = {
  auth: {
    login: "/api/auth/telegram",
    logout: "/api/auth/logout",
    validate: "/api/auth/me",
  },
  players: {
    setup: "/api/players/setup",
    profile: "/api/players/profile",
    dashboard: "/api/players/dashboard",
    matches: "/api/players/matches",
  },
  team: {
    list: "/api/team",
    members: "/api/team/members",
  },
  matches: {
    list: "/api/matches",
    detail: (id: string) => `/api/matches/${id}`,
  },
} as const
