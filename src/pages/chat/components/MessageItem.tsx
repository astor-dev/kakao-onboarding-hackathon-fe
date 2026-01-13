import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { getPastelColor } from '@/lib/background'
import type { Message } from '@/types/chat-room'

type MessageItemProps = {
  message: Message
  showSenderInfo: boolean
  showTimeInfo: boolean
}

export function MessageItem({ message, showSenderInfo, showTimeInfo }: MessageItemProps) {
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
      <div className={`flex flex-col gap-1 ${message.isMe ? 'items-end' : 'items-start'} max-w-[70%]`}>
        {showSenderInfo && !message.isMe && (
          <span className="text-xs text-gray-500 px-1">{message.sender}</span>
        )}
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
          <div className="flex items-center gap-1 px-1">
            <span className="text-xs text-gray-400">
              {message.time.format('A h:mm')}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
