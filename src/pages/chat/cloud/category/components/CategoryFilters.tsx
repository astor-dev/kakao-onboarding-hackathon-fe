import type { FileType } from '@/types/file'
import { Button } from '@/components/ui/Button'
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2'

type CategoryFiltersProps = {
  selected: FileType | 'all'
  onSelect: (filter: FileType | 'all') => void
}

const filters: { id: FileType | 'all'; label: string }[] = [
  { id: 'all', label: '모두' },
  { id: 'image', label: '사진/영상' },
  { id: 'document', label: '문서' },
  { id: 'link', label: '링크' },
  { id: 'etc', label: '기타' },
]

export function CategoryFilters({ selected, onSelect }: CategoryFiltersProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 ">
      <div className="flex-1 flex items-center gap-2 overflow-x-auto">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant={selected === filter.id ? 'default' : 'ghost'}
            onClick={() => onSelect(filter.id)}
            className={`shrink-0 h-8 px-3 text-sm rounded-full ${
              selected === filter.id
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'bg-transparent text-gray-600 hover:bg-gray-100'
            }`}
          >
            {filter.label}
          </Button>
        ))}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 w-8 h-8 text-gray-600"
      >
        <HiOutlineAdjustmentsHorizontal className="w-5 h-5" />
      </Button>
    </div>
  )
}
