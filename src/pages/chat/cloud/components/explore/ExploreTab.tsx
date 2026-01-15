import { useState, useEffect } from 'react'
import { TabsContent } from '@/components/ui/Tabs'
import type { FilterType } from '@/types/drawer'
import type { FileType, FileItem } from '@/types/file'
import { FileTypeFilters } from '@/pages/chat/cloud/components/FileTypeFilters'
import { FileGroupedList } from '@/pages/chat/cloud/components/FileGroupedList'
import { getFileList } from '@/services/file/file-service'
import { mapFileResponsesToFileItems } from '@/services/file/file-mapper'

export function ExploreTab() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all')
  const [files, setFiles] = useState<FileItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // 파일 리스트 조회
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setIsLoading(true)
        const response = await getFileList()
        const mappedFiles = mapFileResponsesToFileItems(response)
        setFiles(mappedFiles)
      } catch (error) {
        console.error('파일 리스트 조회 실패:', error)
        setFiles([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchFiles()
  }, [])

  const filteredFiles = files.filter((file) => {
    if (selectedFilter === 'all') return true
    
    // FilterType을 FileType으로 매핑
    if (selectedFilter === 'media' && file.fileType === 'image') return true
    if (selectedFilter === 'file' && (file.fileType === 'document' || file.fileType === 'etc')) return true
    if (selectedFilter === file.fileType) return true
    
    return false
  })

  const handleFilterChange = (filter: FileType | 'all' | 'media' | 'file') => {
    setSelectedFilter(filter as FilterType)
  }

  return (
    <TabsContent value="explore" className="flex-1 flex flex-col m-0 p-0 min-h-0">
      <FileTypeFilters selected={selectedFilter} onSelect={handleFilterChange} />
      
      <div className="flex-1 overflow-y-auto">
        <FileGroupedList files={filteredFiles} />
      </div>
    </TabsContent>
  )
}
