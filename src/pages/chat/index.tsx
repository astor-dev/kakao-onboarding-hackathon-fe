import { useEffect, useState, useCallback, useRef } from 'react'
import { useParams } from 'react-router'
import { ChatHeader } from '@/pages/chat/components/ChatHeader'
import { MessageList } from '@/pages/chat/components/MessageList'
import { MessageInput } from '@/pages/chat/components/MessageInput'
import { FileUploadModal } from '@/pages/chat/components/FileUploadModal'
import { getChatRoomById, getMessagesByRoomId } from '@/services/chat/chat-service'
// import { sendMessage } from '@/services/chat/chat-service' // API 연동 시 주석 해제
import type { ChatRoom, Message } from '@/types/chat-room'
import PageWrapper from '@/components/PageWrapper'
import dayjs from '@/lib/dayjs'

export function ChatRoom() {
  const { id } = useParams()
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isFileModalOpen, setIsFileModalOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
      type: 'text',
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
    } catch (error) {
      // 에러 발생 시 optimistic update 롤백
      setMessages((prev) => prev.filter((msg) => msg.id !== optimisticMessage.id))
      throw error
    }
  }

  const handleFiles = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files)
    if (fileArray.length > 0) {
      setSelectedFiles(fileArray)
      setIsFileModalOpen(true)
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFiles(files)
    }
  }, [handleFiles])

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items
      if (!items) return

      const files: File[] = []

      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (item.kind === 'file') {
          const file = item.getAsFile()
          if (file) {
            files.push(file)
          }
        }
      }

      if (files.length > 0) {
        e.preventDefault()
        e.stopPropagation()
        handleFiles(files)
      }
    }

    window.addEventListener('paste', handlePaste, true)
    
    const container = containerRef.current
    if (container) {
      container.addEventListener('paste', handlePaste as EventListener)
    }
    
    return () => {
      window.removeEventListener('paste', handlePaste, true)
      if (container) {
        container.removeEventListener('paste', handlePaste as EventListener)
      }
    }
  }, [handleFiles])

  const handleFileModalClose = useCallback(() => {
    setIsFileModalOpen(false)
    setSelectedFiles([])
  }, [])

  const handleFileSend = useCallback(() => {
    // TODO: 실제 파일 업로드 로직 구현
    handleFileModalClose()
  }, [handleFileModalClose])

  const handlePlusClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFiles(files)
      // input 초기화 (같은 파일 재선택 가능하게)
      e.target.value = ''
    }
  }

  if (!id || !chatRoom) {
    return null
  }

  return (
    <PageWrapper>
      <div
        ref={containerRef}
        className="relative flex flex-col h-screen bg-kakao-blue"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        tabIndex={-1}
      >
            <div className="flex-1 flex flex-col overflow-hidden pb-[69px]">
              <ChatHeader chatRoom={chatRoom} />
              <MessageList messages={messages} />
            </div>
            
            {/* 숨겨진 파일 input */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="*/*"
              onChange={handleFileInputChange}
              className="hidden"
            />
            
            <MessageInput onSend={handleSendMessage} onPlusClick={handlePlusClick} />
      </div>

      {/* 파일 전송 모달 */}
      {selectedFiles.length > 0 && (
        <FileUploadModal
          open={isFileModalOpen}
          onOpenChange={setIsFileModalOpen}
          files={selectedFiles}
          onCancel={handleFileModalClose}
          onSend={handleFileSend}
        />
      )}
    </PageWrapper>
  )
}
