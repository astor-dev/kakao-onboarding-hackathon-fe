import type { FileMessageData } from '@/types/chat-room'
import type { Dayjs } from 'dayjs'
import { HiOutlineDownload, HiOutlineX } from 'react-icons/hi'
import { HiOutlineClock } from 'react-icons/hi2'

type FileMessageProps = {
  fileData: FileMessageData
  isMe: boolean
  time: Dayjs
  showTimeInfo: boolean
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function FileMessage({ fileData, isMe, time, showTimeInfo }: FileMessageProps) {
  const { fileName, fileSize, expiryDate, uploadStatus = 'success' } = fileData

  return (
    <div className={`flex items-end gap-1 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className="w-[280px] rounded-2xl p-4 bg-white border border-gray-200">
        <div className="flex flex-col gap-1">
          {/* 파일명 */}
          <h3 className="text-sm font-medium text-gray-900 break-all">
            {fileName}
          </h3>

          {/* 에러 메시지 */}
          {uploadStatus === 'error' && (
            <p className="text-xs text-red-600">
              지원하지 않는 파일 형식입니다.
            </p>
          )}

          {/* 유효기간 */}
          {expiryDate && (
            <p className="text-xs text-gray-500">
              유효기간 ~{expiryDate.format('YYYY. M. D.')}
            </p>
          )}

          {/* 용량 */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">용량 {formatFileSize(fileSize)}</span>
            
            {/* 다운로드 아이콘 (성공 시에만) */}
            {uploadStatus === 'success' && (
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                <HiOutlineDownload className="w-5 h-5 text-gray-600" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 상태 아이콘 (항상 표시) 또는 시간 (success일 때만 showTimeInfo에 따라) */}
      {uploadStatus === 'pending' && (
        <div className="flex items-center justify-center p-1 bg-gray-100/50 rounded-lg mb-1">
          <HiOutlineClock className="w-3 h-3 text-gray-500 animate-pulse" />
        </div>
      )}
      {uploadStatus === 'error' && (
        <div className="flex items-center justify-center p-1 bg-gray-100/50 rounded-lg mb-1">
          <HiOutlineX className="w-3 h-3 text-red-600" />
        </div>
      )}
      {uploadStatus === 'success' && showTimeInfo && (
        <span className="text-xs text-black whitespace-nowrap">
          {time.format('A h:mm')}
        </span>
      )}
    </div>
  )
}
