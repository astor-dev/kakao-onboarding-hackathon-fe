import type { FileItem } from '@/types/file'
import { HiOutlineEllipsisVertical } from 'react-icons/hi2'
import { FilePreview } from '@/components/FilePreview'
import { getPastelColor } from '@/lib/background'

type FileListItemProps = {
  file: FileItem
  onClick?: () => void
}

export function FileListItem({ file, onClick }: FileListItemProps) {
  return (
    <div
      onClick={onClick}
      className="w-full h-auto px-4 py-3 flex items-start gap-3 hover:bg-gray-50 cursor-pointer transition-colors"
    >
      {/* 파일 미리보기/아이콘 */}
      <FilePreview file={file} size="lg" />

      {/* 파일 정보 */}
      <div className="flex-1 min-w-0 text-left">
        <h3 className="text-sm font-medium text-gray-900 truncate mb-1">
          {file.originalFileName}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-1 mb-2">
          {file.fileOverview}
        </p>
        
        {/* 태그 */}
        {file.tags && file.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {file.tags.map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                style={{ 
                  backgroundColor: getPastelColor(tag.description),
                  color: '#374151'
                }}
              >
                {tag.description}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 우측 더보기 */}
      <button 
        onClick={(e) => {
          e.stopPropagation()
          // TODO: 파일 메뉴 열기
        }}
        className="shrink-0 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600"
      >
        <HiOutlineEllipsisVertical className="w-5 h-5" />
      </button>
    </div>
  )
}
