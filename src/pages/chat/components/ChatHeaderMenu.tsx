import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from '@/components/ui/DropdownMenu'
import { HiOutlineDotsVertical } from 'react-icons/hi'

type ChatHeaderMenuProps = {
  onOpenDrawer?: () => void
}

export function ChatHeaderMenu({ onOpenDrawer }: ChatHeaderMenuProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-gray-600">
          <HiOutlineDotsVertical className="w-5 h-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem>
          멤버 초대하기
          <DropdownMenuShortcut>⌘I</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>채팅방 다시 만들기</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onOpenDrawer}>
          채팅방 서랍
        </DropdownMenuItem>
        <DropdownMenuItem>톡게시판</DropdownMenuItem>
        <DropdownMenuItem>브리핑 보드</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          챗봇 (beta)
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={notificationsEnabled}
          onCheckedChange={setNotificationsEnabled}
        >
          알림
          <DropdownMenuShortcut>⌘Y</DropdownMenuShortcut>
        </DropdownMenuCheckboxItem>
        <DropdownMenuItem>
          즐겨찾기
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          항상 위에 유지
          <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          채팅방 설정
          <DropdownMenuShortcut>⌥⌘,</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive">
          채팅방 나가기
          <DropdownMenuShortcut>⌥⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
