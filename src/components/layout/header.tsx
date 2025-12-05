"use client"

interface HeaderProps {
  title: string
  showBack?: boolean
  onBack?: () => void
  showMenu?: boolean
  onMenu?: () => void
}

export function Header({ title, showBack, onBack, showMenu, onMenu }: HeaderProps) {
  return (
    <div className="flex items-center justify-between h-14 px-4 bg-[#1A1A1A] border-b border-[#333333] sticky top-0 z-40">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={onBack}
            className="p-2 text-white hover:bg-[#222222] rounded transition-colors"
            aria-label="Back"
          >
            ←
          </button>
        )}
      </div>

      <h1 className="text-base font-bold text-white text-center flex-1">{title}</h1>

      <div className="flex items-center gap-2">
        {showMenu && (
          <button
            onClick={onMenu}
            className="p-2 text-white hover:bg-[#222222] rounded transition-colors"
            aria-label="Menu"
          >
            ⋮
          </button>
        )}
      </div>
    </div>
  )
}
