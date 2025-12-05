"use client"
import { TABS } from "@/constants"
import { useApp } from "@/hooks/use-app"

const TAB_CONFIG = [
  { id: TABS.DASHBOARD, label: "Dashboard", icon: "🏠" },
  { id: TABS.MATCHES, label: "Matches", icon: "🗓" },
  { id: TABS.TEAM, label: "Team", icon: "👥" },
  { id: TABS.PROFILE, label: "Profile", icon: "👤" },
]

export function BottomNav() {
  const { currentTab, setCurrentTab } = useApp()

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#0F0F0F] border-t border-[#222222] flex items-center justify-around z-50 px-2 pb-2">
      {TAB_CONFIG.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setCurrentTab(tab.id)}
          className={`flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-all duration-300 flex-1 ${"cursor-pointer"} ${
            currentTab === tab.id
              ? "bg-[rgba(76,175,80,0.1)] text-[#4CAF50]"
              : "text-[#AAAAAA] hover:bg-[rgba(255,255,255,0.05)]"
          }`}
          aria-label={tab.label}
          aria-current={currentTab === tab.id ? "page" : undefined}
        >
          <span className={`text-xl transition-transform ${currentTab === tab.id ? "scale-110" : ""}`}>{tab.icon}</span>
          <span className={`text-xs font-${currentTab === tab.id ? "bold" : "regular"}`}>{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}
