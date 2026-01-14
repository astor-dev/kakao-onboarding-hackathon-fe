import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { ChatHeader } from '@/pages/chat/components/ChatHeader'
import { MessageList } from '@/pages/chat/components/MessageList'
import { MessageInput } from '@/pages/chat/components/MessageInput'
import { getChatRoomById, getMessagesByRoomId } from '@/services/chat/chat-service'
// import { sendMessage } from '@/services/chat/chat-service' // API 연동 시 주석 해제
import type { ChatRoom, Message } from '@/types/chat-room'
import PageWrapper from '@/components/PageWrapper'
import dayjs from '@/lib/dayjs'

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

  const handleSendMessage = async (content: string) => {
    if (!id) return

    // Optimistic update: UI에 즉시 반영
    const optimisticMessage: Message = {
      id: `temp-${Date.now()}`,
      roomId: id,
      sender: '나', // 실제로는 현재 사용자 정보를 사용해야 함
      content,
      time: dayjs(),
      isMe: true,
      avatar: null,
    }

    setMessages((prev) => [...prev, optimisticMessage])

    try {
      // 실제 API 호출 (현재는 주석 처리되어 있음)
      // const response = await sendMessage({ roomId: id, content })
      // setMessages((prev) => {
      //   // optimistic message를 실제 메시지로 교체
      //   const filtered = prev.filter((msg) => msg.id !== optimisticMessage.id)
      //   return [...filtered, response.message]
      // })

      // 현재는 API가 없으므로 optimistic update만 유지
      // API 연동 시 위 주석을 해제하고 아래 코드를 제거
      console.log('메시지 전송 (API 미연동):', content)
    } catch (error) {
      // 에러 발생 시 optimistic update 롤백
      setMessages((prev) => prev.filter((msg) => msg.id !== optimisticMessage.id))
      throw error
    }
  }

  if (!id || !chatRoom) {
    return null
  }

  return (
    <PageWrapper>
      <div className="relative flex flex-col h-screen bg-kakao-blue">
        <div className="flex-1 flex flex-col overflow-hidden pb-[69px]">
          <ChatHeader chatRoom={chatRoom} />
          <MessageList messages={messages} />
        </div>
        <MessageInput onSend={handleSendMessage} />
      </div>
    </PageWrapper>
  )
}
