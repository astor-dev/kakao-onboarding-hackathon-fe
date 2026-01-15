import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { getPastelColor } from '@/lib/background'
import type { Message, FileMessageData } from '@/types/chat-room'
import { FileMessage } from './FileMessage'
import dayjs from '@/lib/dayjs'

type MessageItemProps = {
  message: Message
  showSenderInfo: boolean
  showTimeInfo: boolean
}

export function MessageItem({ message, showSenderInfo, showTimeInfo }: MessageItemProps) {
  // TEXT 타입이 아니면 FileMessage로 표시
  const isFileMessage = message.type !== 'TEXT'
  
  // content를 기반으로 fileData 생성 (모킹)
  const generateFileData = (): FileMessageData => {
    if (message.fileData) {
      return message.fileData
    }
    
    // content를 기반으로 fileData 생성
    const content = message.content || ''
    
    // message.id를 기반으로 일관된 파일 크기 생성
    const hashCode = message.id.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0)
    }, 0)
    
    if (message.type === 'IMAGE_VIDEO') {
      // IMAGE_VIDEO 타입: content가 URL이라고 가정
      return {
        fileName: content,
        fileSize: 1000000 + (hashCode % 5000000), // 1MB~6MB
        fileType: 'IMAGE_VIDEO',
        uploadStatus: 'success',
      }
    }
    
    if (message.type === 'DOCUMENT') {
      // DOCUMENT 타입: content가 파일명이라고 가정
      return {
        fileName: content || 'document.pdf',
        fileSize: 500000 + (hashCode % 10000000), // 0.5MB~10MB
        fileType: 'DOCUMENT',
        expiryDate: dayjs().add(30, 'day'),
        uploadStatus: 'success',
      }
    }
    
    // 기본값
    return {
      fileName: content || 'file',
      fileSize: 1024000,
      fileType: message.type,
      uploadStatus: 'success',
    }
  }

  return (
    <div className={`flex gap-2 ${message.isMe ? 'justify-end' : ''}`}>
      {!message.isMe && (
        <div className="flex flex-col items-center gap-1">
          {showSenderInfo ? (
            <>
              <Avatar className="w-8 h-8">
                <AvatarImage src={message.avatar || undefined} />
                <AvatarFallback
                  className="text-xs"
                  style={{ backgroundColor: getPastelColor(message.sender) }}
                >
                  {message.sender.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </>
          ) : (
            <div className="w-8" />
          )}
        </div>
      )}
      <div className={`flex flex-col gap-1 ${message.isMe ? 'items-end' : 'items-start'} max-w-[80%]`}>
        {showSenderInfo && !message.isMe && (
          <span className="text-xs text-black px-1">{message.sender}</span>
        )}
        <div className={`flex items-end gap-1 ${message.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
          {isFileMessage ? (
            <FileMessage 
              fileData={generateFileData()} 
              isMe={message.isMe} 
              time={message.time}
              showTimeInfo={showTimeInfo}
            />
          ) : (
            <>
              <div
                className={`rounded-lg px-3 py-2 ${
                  message.isMe
                    ? 'bg-yellow-300 text-black'
                    : 'bg-white text-black'
                }`}
                style={{
                  borderRadius: message.isMe ? '18px 18px 4px 18px' : '4px 18px 18px 18px',
                }}
              >
                <p className="text-sm whitespace-pre-wrap wrap-break-words">{message.content}</p>
              </div>
              {showTimeInfo && (
                <span className="text-xs text-black whitespace-nowrap">
                  {message.time.format('A h:mm')}
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
