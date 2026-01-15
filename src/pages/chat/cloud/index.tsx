import { useState } from 'react'
import { useParams } from 'react-router'
import { TalkDrawerTab } from '@/pages/chat/cloud/components/drawer/TalkDrawerTab'
import { CloudHeader } from '@/pages/chat/cloud/components/CloudHeader'
import PageWrapper from '@/components/PageWrapper'

export function TalkDrawer() {
  const { id } = useParams<{ id: string }>()
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <PageWrapper>
      <div className="flex flex-col h-screen bg-gray-100/40">
        <CloudHeader 
          title="AI 톡서랍" 
          backTo={`/chat/${id}`}
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* 컨텐츠 */}
        <div className="flex-1 overflow-y-auto">
          <TalkDrawerTab />
        </div>
      </div>
    </PageWrapper>
  )
}
