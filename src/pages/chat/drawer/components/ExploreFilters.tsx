import type { FilterType } from '@/types/drawer'

type ExploreFiltersProps = {
  selected: FilterType
  onSelect: (filter: FilterType) => void
}

const filters: { id: FilterType; label: string }[] = [
  { id: 'all', label: '전체보기' },
  { id: 'media', label: '사진/동영상' },
  { id: 'link', label: '링크' },
  { id: 'file', label: '파일' },
]

export function ExploreFilters({ selected, onSelect }: ExploreFiltersProps) {
  return (
    <div className="flex gap-2 px-4 py-3">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onSelect(filter.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selected === filter.id
              ? 'bg-black text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
