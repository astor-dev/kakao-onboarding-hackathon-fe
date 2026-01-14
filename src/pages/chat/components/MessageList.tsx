import { useEffect, useRef } from 'react'
import type { Message } from '@/types/chat-room'
import { MessageItem } from '@/pages/chat/components/MessageItem'

type MessageListProps = {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // 메시지가 추가될 때마다 스크롤을 최하단으로 이동
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
      {messages.map((message, index) => {
        const showSenderInfo = index === 0 || messages[index - 1].sender !== message.sender
        
        // 다음 메시지가 있고, sender가 같고, time이 같으면 시간을 보여주지 않음
        const nextMessage = messages[index + 1]
        const showTimeInfo = !(
          nextMessage &&
          nextMessage.sender === message.sender &&
          nextMessage.time.format('A h:mm') === message.time.format('A h:mm')
        )
        
        return (
          <MessageItem
            key={message.id}
            message={message}
            showSenderInfo={showSenderInfo}
            showTimeInfo={showTimeInfo}
          />
        )
      })}
    </div>
  )
}
