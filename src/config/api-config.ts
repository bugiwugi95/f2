export const apiEndpoints = {
  auth: {
    login: "/auth/telegram",
    logout: "/auth/logout",
    validate: "/auth/me",
  },
  players: {
    setup: "/players/me/setup",
    profile: "/players/me/profile",
    dashboard: "/players/me/dashboard",
    matches: "/players/me/matches",
  },
  team: {
    list: "/team",
    members: "/team/members",
  },
  matches: {
    list: "/matches",
    detail: (id: string) => `/matches/${id}`,
  },
} as const
