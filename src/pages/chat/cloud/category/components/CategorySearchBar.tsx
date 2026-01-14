import { Input } from '@/components/ui/Input'
import { HiOutlineSearch, HiOutlineMicrophone } from 'react-icons/hi'

type CategorySearchBarProps = {
  value: string
  onChange: (value: string) => void
}

export function CategorySearchBar({ value, onChange }: CategorySearchBarProps) {
  return (
    <div className="px-4 py-3">
      <div className="relative">
        <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="검색"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 pr-10 bg-gray-100 border-none focus-visible:ring-0"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          <HiOutlineMicrophone className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
