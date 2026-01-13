import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { ChatHeader } from '@/pages/chat/components/ChatHeader'
import { MessageList } from '@/pages/chat/components/MessageList'
import { MessageInput } from '@/pages/chat/components/MessageInput'
import { getChatRoomById, getMessagesByRoomId } from '@/services/chat/chat-service'
import type { ChatRoom, Message } from '@/types/chat-room'

export function ChatRoom() {
  const { id } = useParams()
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null)
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    if (!id) return

    Promise.all([
      getChatRoomById(id),
      getMessagesByRoomId(id),
    ]).then(([room, msgs]) => {
      setChatRoom(room)
      setMessages(msgs)
    })
  }, [id])

  if (!id || !chatRoom) {
    return null
  }

  return (
    <div className="flex flex-col h-screen bg-kakao-blue">
      <ChatHeader chatRoom={chatRoom} />
      <MessageList messages={messages} />
      <MessageInput />
    </div>
  )
}
