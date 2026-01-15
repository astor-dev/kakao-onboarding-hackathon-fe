import { useMemo } from 'react'
import type { FileItem } from '@/types/file'
import { DateGroupHeader } from '@/pages/chat/cloud/category/components/DateGroupHeader'
import { FileListItem } from '@/pages/chat/cloud/components/FileListItem'
import dayjs from '@/lib/dayjs'

type FileGroupedListProps = {
  files: FileItem[]
  isSearchMode?: boolean
}

export function FileGroupedList({ files, isSearchMode = false }: FileGroupedListProps) {
  // 날짜별로 그룹핑 (항상 실행, 검색 모드일 때는 사용하지 않음)
  const groupedFiles = useMemo(() => {
    if (isSearchMode) return []
    
    const groups = new Map<string, FileItem[]>()
    
    files.forEach((file) => {
      const dateKey = file.createdAt.format('YYYY-MM-DD')
      if (!groups.has(dateKey)) {
        groups.set(dateKey, [])
      }
      groups.get(dateKey)!.push(file)
    })

    // 날짜 내림차순 정렬
    return Array.from(groups.entries())
      .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
      .map(([dateKey, files]) => ({
        date: dayjs(dateKey),
        files: files.sort((a, b) => b.createdAt.diff(a.createdAt))
      }))
  }, [files, isSearchMode])

  if (files.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 mb-4">
        <p>파일이 없습니다</p>
      </div>
    )
  }

  // 검색 모드일 때는 날짜 그룹화 없이 유사도 순서대로 표시
  if (isSearchMode) {
    return (
      <div className="flex flex-col mb-4">
        {files.map((file) => (
          <FileListItem
            key={file.id}
            file={file}
          />
        ))}
      </div>
    )
  }

  // 일반 모드: 날짜별 그룹화
  return (
    <div className="flex flex-col mb-4">
      {groupedFiles.map(({ date, files }) => (
        <div key={date.format('YYYY-MM-DD')}>
          <DateGroupHeader date={date} />
          {files.map((file) => (
            <FileListItem
              key={file.id}
              file={file}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
