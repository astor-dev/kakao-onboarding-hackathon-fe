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
      <div className={`flex flex-col gap-1 ${message.isMe ? 'items-end' : 'items-start'} max-w-[80%]`}>
        {showSenderInfo && !message.isMe && (
          <span className="text-xs text-black px-1">{message.sender}</span>
        )}
        <div className={`flex items-end gap-1 ${message.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
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
        </div>
      </div>
    </div>
  )
}
