import { HiOutlineSearch } from 'react-icons/hi'
import { Input } from '@/components/ui/Input'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = '톡서랍 내 파일 검색' }: SearchBarProps) {
  return (
    <div className="relative">
      <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 bg-gray-50"
      />
    </div>
  )
}
