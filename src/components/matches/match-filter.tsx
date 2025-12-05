"use client"

type FilterType = "all" | "upcoming" | "past"

interface MatchFilterProps {
  activeFilter: FilterType
  onFilterChange: (filter: FilterType) => void
}

export function MatchFilter({ activeFilter, onFilterChange }: MatchFilterProps) {
  const filters: { value: FilterType; label: string }[] = [
    { value: "all", label: "Все" },
    { value: "upcoming", label: "Предстоящие" },
    { value: "past", label: "Прошлые" },
  ]

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
            activeFilter === filter.value
              ? "bg-[#4CAF50] text-white font-semibold"
              : "bg-[#1A1A1A] text-[#AAAAAA] border border-[#333333]"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
