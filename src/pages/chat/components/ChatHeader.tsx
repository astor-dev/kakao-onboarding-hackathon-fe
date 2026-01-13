import { Avatar, AvatarFallback } from '@/components/ui/Avatar'
import { Link } from 'react-router'
import { HiOutlineSearch, HiOutlinePhone, HiOutlineVideoCamera } from 'react-icons/hi'
import { FaArrowLeft } from 'react-icons/fa'
import { HiUsers } from 'react-icons/hi2'
import { ChatHeaderMenu } from '@/pages/chat/components/ChatHeaderMenu'
import type { ChatRoomInfo } from '@/types/chat-room'

type ChatHeaderProps = {
  chatRoomInfo: ChatRoomInfo
}

export function ChatHeader({ chatRoomInfo }: ChatHeaderProps) {
  return (
    <div className="h-14 bg-white flex items-center justify-between px-4 border-b border-gray-200">
      <div className="flex items-center gap-3">
        <Link to="/" className="text-gray-600">
          <FaArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8 border-2 border-white">
            <AvatarFallback className="bg-blue-200 text-xs">
              {chatRoomInfo.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-sm line-clamp-1">{chatRoomInfo.name}</h2>
            {chatRoomInfo.memberCount > 1 && <div className="flex items-center gap-1 text-xs text-gray-500">
              <HiUsers className="w-3 h-3" />
              <span>{chatRoomInfo.memberCount}</span>
            </div>}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="text-gray-600">
          <HiOutlineSearch className="w-5 h-5" />
        </button>
        <button className="text-gray-600">
          <HiOutlinePhone className="w-5 h-5" />
        </button>
        <button className="text-gray-600">
          <HiOutlineVideoCamera className="w-5 h-5" />
        </button>
        <ChatHeaderMenu />
      </div>
    </div>
  )
}
