import { Card, CardContent } from '@/components/ui/Card'
import { HiOutlinePhoto, HiOutlineDocument } from 'react-icons/hi2'
import type { FileItem } from '@/types/drawer'

type FileCardProps = {
  file: FileItem
}

export function FileCard({ file }: FileCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-0 space-y-3">
        <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
          {file.type === 'image' ? (
            <HiOutlinePhoto className="w-6 h-6 text-green-600" />
          ) : (
            <HiOutlineDocument className="w-6 h-6 text-green-600" />
          )}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium truncate" title={file.name}>
            {file.name}
          </p>
          {file.expiryDate && (
            <p className="text-xs text-gray-500">유효기간 {file.expiryDate}</p>
          )}
          {file.size && <p className="text-xs text-gray-500">{file.size}</p>}
          <div className="flex flex-wrap gap-1 mt-2">
            {file.tags.map((tag: string, idx: number) => (
              <span
                key={idx}
                className="text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
