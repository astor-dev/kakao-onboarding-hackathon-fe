import { useState } from 'react'
import { TabsContent } from '@/components/ui/Tabs'
import type { FilterType } from '@/types/drawer'
import { ExploreFilters } from './ExploreFilters'
import { FileGroupedList } from '@/pages/chat/cloud/components/FileGroupedList'
import { mockFiles } from '@/constants/file-mock-datas'

export function ExploreTab() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all')

  const filteredFiles = mockFiles.filter((file) => {
    if (selectedFilter === 'all') return true
    
    // FilterType을 FileType으로 매핑
    if (selectedFilter === 'media' && file.fileType === 'image') return true
    if (selectedFilter === 'file' && (file.fileType === 'document' || file.fileType === 'etc')) return true
    if (selectedFilter === file.fileType) return true
    
    return false
  })

  const handleFileClick = (fileId: number) => {
    console.log('File clicked:', fileId)
  }

  return (
    <TabsContent value="explore" className="flex-1 flex flex-col m-0 p-0 min-h-0">
      <ExploreFilters selected={selectedFilter} onSelect={setSelectedFilter} />
      
      <div className="flex-1 overflow-y-auto">
        <FileGroupedList files={filteredFiles} onFileClick={handleFileClick} />
      </div>
    </TabsContent>
  )
}
