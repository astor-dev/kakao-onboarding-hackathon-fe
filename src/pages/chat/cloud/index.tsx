import { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { TalkDrawerTab } from '@/pages/chat/cloud/components/drawer/TalkDrawerTab'
import { CloudHeader } from '@/pages/chat/cloud/components/CloudHeader'
import PageWrapper from '@/components/PageWrapper'

export function TalkDrawer() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchSubmit = (query: string) => {
    if (query.trim()) {
      // 전체 파일에서 검색
      navigate(`/chat/${id}/cloud/category/ALL?query=${encodeURIComponent(query)}`)
    }
  }

  return (
    <PageWrapper>
      <div className="flex flex-col h-screen bg-gray-100/40">
        <CloudHeader 
          title="AI 톡서랍" 
          backTo={`/chat/${id}`}
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={handleSearchSubmit}
        />

        {/* 컨텐츠 */}
        <div className="flex-1 overflow-y-auto">
          <TalkDrawerTab />
        </div>
      </div>
    </PageWrapper>
  )
}
