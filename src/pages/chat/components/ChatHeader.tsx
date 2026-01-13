import { useState } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/Avatar'
import { Link } from 'react-router'
import { HiOutlineSearch, HiOutlinePhone, HiOutlineVideoCamera, HiOutlineCloud } from 'react-icons/hi'
import { FaArrowLeft } from 'react-icons/fa'
import { HiUsers } from 'react-icons/hi2'
import { ChatHeaderMenu } from '@/pages/chat/components/ChatHeaderMenu'
import { TalkDrawer } from '@/pages/chat/drawer/TalkDrawer'
import type { ChatRoom } from '@/types/chat-room'
import { getPastelColor } from '@/lib/background'

type ChatHeaderProps = {
  chatRoom: ChatRoom
}

export function ChatHeader({ chatRoom }: ChatHeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <div className="h-14 bg-kakao-blue flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-gray-600">
            <FaArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback
                className="text-xs"
                style={{ backgroundColor: getPastelColor(chatRoom.name) }}
              >
                {chatRoom.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-sm line-clamp-1">{chatRoom.name}</h2>
              {chatRoom.memberCount && chatRoom.memberCount > 1 && <div className="flex items-center gap-1 text-xs text-gray-500">
                <HiUsers className="w-3 h-3" />
                <span>{chatRoom.memberCount}</span>
              </div>}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-gray-600">
            <HiOutlineSearch className="w-5 h-5" />
          </button>
          {chatRoom.isSelfChat ? (
            <button 
              className="text-gray-600"
              onClick={() => setDrawerOpen(true)}
            >
              <HiOutlineCloud className="w-5 h-5" />
            </button>
          ) : (
            <>
              <button className="text-gray-600">
                <HiOutlinePhone className="w-5 h-5" />
              </button>
              <button className="text-gray-600">
                <HiOutlineVideoCamera className="w-5 h-5" />
              </button>
            </>
          )}
          <ChatHeaderMenu onOpenDrawer={() => setDrawerOpen(true)} />
        </div>
      </div>
      <TalkDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </>
  )
}
