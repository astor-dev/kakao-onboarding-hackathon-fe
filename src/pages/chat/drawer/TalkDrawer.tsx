import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog'
import { Tabs } from '@/components/ui/Tabs'
import type { TalkDrawerTab, FileItem } from '@/types/drawer'
import { filters, fileItems } from '@/constants/drawer-mock-datas'
import { DocumentTabContent } from '@/pages/chat/drawer/components/DocumentTabContent'
import { DrawerTabs } from '@/pages/chat/drawer/components/DrawerTabs'
import { EmptyTabContent } from '@/pages/chat/drawer/components/EmptyTabContent'
import { PhotoTabContent } from '@/pages/chat/drawer/components/PhotoTabContent'
import { SearchBar } from '@/pages/chat/drawer/components/SearchBar'

type TalkDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TalkDrawer({ open, onOpenChange }: TalkDrawerProps) {
  const [selectedTab, setSelectedTab] = useState<TalkDrawerTab>('photo')
  const [searchQuery, setSearchQuery] = useState('')

  const handleTabChange = (value: string) => {
    setSelectedTab(value as TalkDrawerTab)
  }

  const filteredFiles: FileItem[] = fileItems.filter((file: FileItem) => {
    if (searchQuery) {
      return file.name.toLowerCase().includes(searchQuery.toLowerCase())
    }
    return true
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[80vw] h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>톡서랍</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 flex-1 min-h-0">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />

          <Tabs value={selectedTab} onValueChange={handleTabChange} className="flex-1 flex flex-col min-h-0">
            <DrawerTabs />

            <div className="flex-1 overflow-y-auto px-4 [scrollbar-gutter:stable]">
              <PhotoTabContent filters={filters} files={filteredFiles} />
              <DocumentTabContent filters={filters} files={filteredFiles} />
              <EmptyTabContent value="link" message="링크가 없습니다." />
              <EmptyTabContent value="voice" message="음성이 없습니다." />
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
