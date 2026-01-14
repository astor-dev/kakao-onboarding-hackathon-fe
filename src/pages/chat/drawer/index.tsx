import { useState, useRef } from 'react'
import { Link, useParams } from 'react-router'
import { Tabs } from '@/components/ui/Tabs'
import { Input } from '@/components/ui/Input'
import { FaArrowLeft } from 'react-icons/fa'
import { HiOutlineSearch } from 'react-icons/hi'
import type { MainTab } from '@/types/drawer'
import { MainTabs } from '@/pages/chat/drawer/components/MainTabs'
import { TalkDrawerTab } from '@/pages/chat/drawer/components/TalkDrawerTab'
import { ExploreTab } from '@/pages/chat/drawer/components/ExploreTab'
import PageWrapper from '@/components/PageWrapper'

export function TalkDrawer() {
  const { id } = useParams<{ id: string }>()
  const [selectedTab, setSelectedTab] = useState<MainTab>('drawer')
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchMode, setIsSearchMode] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleTabChange = (value: string) => {
    setSelectedTab(value as MainTab)
  }

  const handleSearchClick = () => {
    setIsSearchMode(true)
    setTimeout(() => {
      searchInputRef.current?.focus()
    }, 0)
  }

  const handleSearchClose = () => {
    setIsSearchMode(false)
    setSearchQuery('')
  }

  return (
    <PageWrapper>
      <div className="flex flex-col h-screen bg-white">
        {/* 헤더 */}
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-none bg-gray-100 focus-visible:ring-0"
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <Link to={`/chat/${id}`} className="text-gray-600">
                  <FaArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="font-semibold text-lg">톡클라우드</h1>
              </div>
              <button onClick={handleSearchClick} className="text-gray-600">
                <HiOutlineSearch className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* 메인 탭 및 컨텐츠 */}
        <Tabs value={selectedTab} onValueChange={handleTabChange} className="flex-1 flex flex-col min-h-0">
          <MainTabs value={selectedTab} onValueChange={handleTabChange} />
          
          <div className="flex-1 flex flex-col min-h-0">
            <TalkDrawerTab />
            <ExploreTab />
          </div>
        </Tabs>
      </div>
    </PageWrapper>
  )
}
