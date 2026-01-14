import { useState, useRef } from 'react'
import { Input } from '@/components/ui/Input'
import { HiOutlinePlus, HiOutlineEmojiHappy, HiOutlinePaperClip, HiPaperAirplane } from 'react-icons/hi'
import { RiVoiceprintLine } from 'react-icons/ri'
import { bottomFixedContainer } from '@/lib/bottom-fixed'
import { cn } from '@/lib/utils'

type MessageInputProps = {
  onSend?: (content: string) => void | Promise<void>
  disabled?: boolean
}

export function MessageInput({ onSend, disabled = false }: MessageInputProps) {
  const [message, setMessage] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const hasMessage = message.trim().length > 0
  const showVoicePrint = !isFocused && !hasMessage
  const showPaperClip = !hasMessage

  const handleSend = async () => {
    const trimmedMessage = message.trim()
    if (!trimmedMessage || isSending || disabled || !onSend) return

    setIsSending(true)
    try {
      await onSend(trimmedMessage)
      setMessage('')
      // 전송 후 입력창에 다시 포커스
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    } catch (error) {
      console.error('메시지 전송 실패:', error)
      // 에러 처리 (예: 토스트 메시지 표시)
    } finally {
      setIsSending(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className={cn(bottomFixedContainer, "bg-white border-t border-gray-200 p-4 z-50")}>
      <div className="flex items-end gap-2">
        <button className="text-gray-600 p-2">
          <HiOutlinePlus className="w-5 h-5" />
        </button>
        <div className="flex-1 transition-all duration-150 relative">
          <Input
            ref={inputRef}
            placeholder="메시지 입력"
            className="rounded-full border-gray-300 focus:border-gray-400 transition-all duration-150 pr-12"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyPress}
            disabled={disabled || isSending}
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 p-1 bg-gray-100 rounded-full">
            <HiOutlineEmojiHappy className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="flex items-center gap-1 h-[36px]">
          <div className={cn(
            "transition-all duration-150",
            showPaperClip ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 translate-x-2 pointer-events-none max-w-0 overflow-hidden"
          )}>
            <button className="text-gray-600 p-1 bg-gray-100 rounded-full">
              <HiOutlinePaperClip className="w-5 h-5" />
            </button>
          </div>
          <div className={cn(
            "transition-all duration-150",
            hasMessage ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 translate-x-2 pointer-events-none max-w-0 overflow-hidden"
          )}>
            <button 
              className="text-gray-600 p-1 bg-kakao-yellow rounded-full disabled:opacity-50"
              onClick={handleSend}
              disabled={disabled || isSending || !hasMessage}
            >
              <HiPaperAirplane className="w-5 h-5" />
            </button>
          </div>
          <div className={cn(
            "transition-all duration-150",
            showVoicePrint ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 translate-x-2 pointer-events-none max-w-0 overflow-hidden"
          )}>
            <button className="text-gray-600 p-1 bg-gray-100 rounded-full">
              <RiVoiceprintLine className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
