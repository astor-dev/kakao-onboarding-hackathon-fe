import type { FileItem } from '@/types/drawer'
import { FileCard } from './FileCard'

type FileGridProps = {
  files: FileItem[]
  filterType?: (file: FileItem) => boolean
}

export function FileGrid({ files, filterType }: FileGridProps) {
  const filteredFiles = filterType ? files.filter(filterType) : files

  if (filteredFiles.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        파일이 없습니다.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {filteredFiles.map((file: FileItem) => (
        <FileCard key={file.id} file={file} />
      ))}
    </div>
  )
}
