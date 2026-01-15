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
  const { fileName, fileSize, fileType, expiryDate, uploadStatus = 'success' } = fileData
  const isImageVideo = fileType === 'IMAGE_VIDEO'

  return (
    <div className={`flex items-end gap-1 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`${isImageVideo ? 'max-w-[280px]' : 'w-[280px]'} rounded-2xl ${isImageVideo ? 'p-0' : 'p-4'} bg-white border border-gray-200 ${isImageVideo ? 'overflow-hidden' : ''}`}>
        {isImageVideo ? (
          // IMAGE_VIDEO 타입: 이미지 표시
          <div className="flex flex-col">
            <img 
              src={fileName}
              alt="업로드된 이미지" 
              className="w-full h-auto object-cover max-h-[400px]"
              loading="lazy"
              onError={(e) => {
                // 이미지 로드 실패 시 placeholder
                console.error('Image load failed:', fileName)
                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="280" height="200"%3E%3Crect fill="%23f0f0f0" width="280" height="200"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3E이미지 없음%3C/text%3E%3C/svg%3E'
              }}
            />
          </div>
        ) : (
          // DOCUMENT 및 기타 타입: 파일 카드
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
        )}
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
