import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/DropdownMenu'
import { HiOutlineDotsVertical } from 'react-icons/hi'

export function ChatHeaderMenu() {
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
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            채팅방 서랍
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>사진/동영상</DropdownMenuItem>
            <DropdownMenuItem>파일</DropdownMenuItem>
            <DropdownMenuItem>링크</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
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
