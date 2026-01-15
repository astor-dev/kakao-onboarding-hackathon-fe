import { useState, useRef } from 'react'
import { Link } from 'react-router'
import { Input } from '@/components/ui/Input'
import { FaArrowLeft } from 'react-icons/fa'
import { HiOutlineSearch } from 'react-icons/hi'

type CloudHeaderProps = {
  title: string
  backTo: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  onSearchSubmit?: (query: string) => void
}

export function CloudHeader({ title, backTo, searchValue = '', onSearchChange, onSearchSubmit }: CloudHeaderProps) {
  const [isSearchMode, setIsSearchMode] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleSearchClick = () => {
    setIsSearchMode(true)
    setTimeout(() => {
      searchInputRef.current?.focus()
    }, 0)
  }

  const handleSearchClose = () => {
    setIsSearchMode(false)
    onSearchChange?.('')
    onSearchSubmit?.('') // 쿼리스트링 제거
  }

  const handleSearchExecute = () => {
    if (searchValue.trim()) {
      onSearchSubmit?.(searchValue.trim())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchExecute()
    }
  }

  return (
    <div className="h-14 flex items-center justify-between px-4">
      {isSearchMode ? (
        <>
          <button onClick={handleSearchClose} className="text-gray-600">
            <FaArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 mx-3">
            <Input
              ref={searchInputRef}
              placeholder="검색"
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-none bg-gray-100 focus-visible:ring-0"
            />
          </div>
          <button 
            onClick={handleSearchExecute} 
            className="text-gray-600 hover:text-gray-800"
            disabled={!searchValue.trim()}
          >
            <HiOutlineSearch className="w-5 h-5" />
          </button>
        </>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <Link to={backTo} className="text-gray-600">
              <FaArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-semibold text-lg">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleSearchClick} className="text-gray-600">
              <HiOutlineSearch className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}
