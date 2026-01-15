import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router'
import type { FileItem } from '@/types/file'
import { getFileList } from '@/services/file/file-service'
import { mapFileResponsesToFileItems } from '@/services/file/file-mapper'
import { FileListItem } from '@/pages/chat/cloud/components/FileListItem'
import { HiChevronRight } from 'react-icons/hi2'

export function RecentFilesSection() {
  const { id } = useParams<{ id: string }>()
  const [recentFiles, setRecentFiles] = useState<FileItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRecentFiles = async () => {
      try {
        setIsLoading(true)
        const response = await getFileList()
        const mappedFiles = mapFileResponsesToFileItems(response)
        // 최신 3개만 가져오기
        const sorted = mappedFiles.sort((a, b) => b.createdAt.diff(a.createdAt))
        setRecentFiles(sorted.slice(0, 3))
      } catch (error) {
        console.error('최근 파일 조회 실패:', error)
        setRecentFiles([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecentFiles()
  }, [])

  if (isLoading) {
    return (
      <div className="m-4 py-4 rounded-lg bg-white shadow-sm">
        <div className="px-4 py-3 text-center text-gray-400 text-sm">
          로딩 중...
        </div>
      </div>
    )
  }

  if (recentFiles.length === 0) {
    return null
  }

  return (
    <div className="m-4 py-4 mt-0 rounded-lg bg-white">
      
      {/* 헤더 */}
      <div className="px-4 mb-2 flex items-center justify-between">
        <h3 className="text-xs text-kakao-black font-semibold flex items-center gap-1 mb-2">
          최근 파일
        </h3>       
        <Link 
          to={`/chat/${id}/cloud/category/all`}
          className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900"
        >
          <span>더보기</span>
          <HiChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 파일 리스트 */}
      <div className="flex flex-col">
        {recentFiles.map((file) => (
          <FileListItem key={file.id} file={file} />
        ))}
      </div>
    </div>
  )
}
