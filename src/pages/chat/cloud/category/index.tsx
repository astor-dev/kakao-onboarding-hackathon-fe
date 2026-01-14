import { useState } from 'react'
import { useParams } from 'react-router'
import type { FileType } from '@/types/file'
import PageWrapper from '@/components/PageWrapper'
import { CategoryFilters } from '@/pages/chat/cloud/category/components/CategoryFilters'
import { CategoryHeader } from '@/pages/chat/cloud/category/components/CategoryHeader'
import { CategorySearchBar } from '@/pages/chat/cloud/category/components/CategorySearchBar'
import { FileGroupedList } from '@/pages/chat/cloud/components/FileGroupedList'
import { mockFiles } from '@/constants/file-mock-datas'

export function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<FileType | 'all'>('all')

  // 카테고리 이름 가져오기 (실제로는 categoryId로 조회)
  const categoryName = '카카오' // TODO: categoryId로 실제 카테고리 이름 조회

  // 필터링
  const filteredFiles = mockFiles.filter((file) => {
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
    if (selectedFilter !== 'all' && file.fileType !== selectedFilter) {
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

  const handleFileClick = (fileId: number) => {
    // TODO: 파일 상세보기 또는 다운로드
    console.log('File clicked:', fileId)
  }

  return (
    <PageWrapper>
      <div className="flex flex-col h-screen bg-white">
        <CategoryHeader title={categoryName} />
        <CategorySearchBar value={searchQuery} onChange={setSearchQuery} />
        <CategoryFilters selected={selectedFilter} onSelect={setSelectedFilter} />

        {/* 파일 리스트 (날짜별 그룹) */}
        <div className="flex-1 overflow-y-auto">
          <FileGroupedList files={filteredFiles} onFileClick={handleFileClick} />
        </div>
      </div>
    </PageWrapper>
  )
}
