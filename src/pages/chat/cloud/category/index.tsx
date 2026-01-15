import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import type { FileType, FileItem } from '@/types/file'
import PageWrapper from '@/components/PageWrapper'
import { CloudHeader } from '@/pages/chat/cloud/components/CloudHeader'
import { FileGroupedList } from '@/pages/chat/cloud/components/FileGroupedList'
import { getFileList } from '@/services/file/file-service'
import { mapFileResponsesToFileItems } from '@/services/file/file-mapper'
import { ALL_CATEGORIES } from '@/constants/categories'
import { CategoryFilters } from '@/pages/chat/cloud/category/components/CategoryFilters'

export function CategoryPage() {
  const { id, categoryId } = useParams<{ id: string; categoryId: string }>()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<FileType | 'ALL'>('ALL')
  const [files, setFiles] = useState<FileItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // 카테고리 이름 가져오기
  const categoryName = categoryId === 'ALL' 
    ? '전체 파일' 
    : ALL_CATEGORIES.find(cat => cat.id === categoryId)?.label || '카테고리'

  // 파일 리스트 조회
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setIsLoading(true)
        // 'all'이면 카테고리 필터 없이 전체 조회
        const response = await getFileList(categoryId === 'ALL' ? undefined : categoryId)
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
  }, [categoryId])

  // 필터링
  const filteredFiles = files.filter((file) => {
    // 검색어 필터
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      if (
        !file.fileOverview?.toLowerCase().includes(query) &&
        !file.originalFileName.toLowerCase().includes(query)
      ) {
        return false
      }
    }

    // 파일 타입 필터
    if (selectedFilter !== 'ALL' && file.fileType !== selectedFilter) {
      return false
    }

    return true
  })

  // 총 파일 크기 계산
  const totalSize = filteredFiles.reduce((acc, file) => {
    return acc + (parseInt(file.savedFileName) || 0)
  }, 0)

  const formatTotalSize = (bytes: number): string => {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const handleFilterChange = (filter: FileType | 'ALL' | 'IMAGE_VIDEO' | 'DOCUMENT' | 'LINK' | 'ETC') => {
    // media와 file은 실제 FileType으로 변환
    if (filter === 'IMAGE_VIDEO') {
      setSelectedFilter('IMAGE_VIDEO')
    } else if (filter === 'DOCUMENT') {
      setSelectedFilter('DOCUMENT')
    } else {
      setSelectedFilter(filter as FileType | 'ALL')
    }
  }

  return (
    <PageWrapper>
      <div className="flex flex-col h-screen bg-white">
        <CloudHeader 
          title={categoryName}
          backTo={`/chat/${id}/cloud`}
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <CategoryFilters selected={selectedFilter} onSelect={handleFilterChange} />

        {/* 파일 리스트 (날짜별 그룹) */}
        <div className="flex-1 overflow-y-auto">
          <FileGroupedList files={filteredFiles} />
        </div>
      </div>
    </PageWrapper>
  )
}
