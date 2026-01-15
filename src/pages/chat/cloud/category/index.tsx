import { useState, useEffect } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router'
import type { FileType, FileItem } from '@/types/file'
import PageWrapper from '@/components/PageWrapper'
import { CloudHeader } from '@/pages/chat/cloud/components/CloudHeader'
import { FileGroupedList } from '@/pages/chat/cloud/components/FileGroupedList'
import { getFileList, searchFiles } from '@/services/file/file-service'
import { mapFileResponsesToFileItems } from '@/services/file/file-mapper'
import { ALL_CATEGORIES } from '@/constants/categories'
import { CategoryFilters } from '@/pages/chat/cloud/category/components/CategoryFilters'

export function CategoryPage() {
  const { id, categoryId } = useParams<{ id: string; categoryId: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const queryFromUrl = searchParams.get('query') || ''
  const [searchQuery, setSearchQuery] = useState(queryFromUrl)
  const [selectedFilter, setSelectedFilter] = useState<FileType | 'ALL'>('ALL')
  const [files, setFiles] = useState<FileItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // URL 쿼리스트링이 변경되면 검색어 동기화
  useEffect(() => {
    setSearchQuery(queryFromUrl)
  }, [queryFromUrl])

  // 카테고리 이름 가져오기
  const categoryName = categoryId === 'ALL' 
    ? '전체 파일' 
    : ALL_CATEGORIES.find(cat => cat.id === categoryId)?.label || '카테고리'

  // 파일 리스트 조회 또는 검색
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setIsLoading(true)
        
        // 쿼리스트링이 있으면 검색 API 사용
        if (queryFromUrl) {
          const response = await searchFiles({
            query: queryFromUrl,
            category: categoryId === 'ALL' ? undefined : categoryId,
            type: selectedFilter === 'ALL' ? undefined : selectedFilter,
          })
          const mappedFiles = mapFileResponsesToFileItems(response)
          setFiles(mappedFiles)
        } else {
          // 쿼리스트링이 없으면 일반 조회 API 사용
          const response = await getFileList(
            categoryId === 'ALL' ? undefined : categoryId,
            selectedFilter === 'ALL' ? undefined : selectedFilter
          )
          const mappedFiles = mapFileResponsesToFileItems(response)
          setFiles(mappedFiles)
        }
      } catch (error) {
        console.error('파일 조회 실패:', error)
        setFiles([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchFiles()
  }, [categoryId, queryFromUrl, selectedFilter])

  // 검색 실행 핸들러
  const handleSearchSubmit = (query: string) => {
    if (query.trim()) {
      // URL에 쿼리스트링 추가
      navigate(`/chat/${id}/cloud/category/${categoryId}?query=${encodeURIComponent(query)}`)
    } else {
      // 검색어가 비어있으면 쿼리스트링 제거
      navigate(`/chat/${id}/cloud/category/${categoryId}`)
    }
  }

  // 검색어 변경 핸들러
  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    // 검색어가 비워지면 쿼리스트링 제거
    if (!value.trim() && queryFromUrl) {
      navigate(`/chat/${id}/cloud/category/${categoryId}`)
    }
  }

  // 총 파일 크기 계산
  const totalSize = files.reduce((acc, file) => {
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
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
        />
        <CategoryFilters selected={selectedFilter} onSelect={handleFilterChange} />

        {/* 파일 리스트 */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">로딩 중...</p>
            </div>
          ) : files.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">
                {queryFromUrl ? '검색 결과가 없습니다' : '파일이 없습니다'}
              </p>
            </div>
          ) : (
            <FileGroupedList files={files} isSearchMode={!!queryFromUrl} />
          )}
        </div>
      </div>
    </PageWrapper>
  )
}
