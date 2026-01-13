import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Link } from 'react-router'
import { RiPushpinLine } from 'react-icons/ri'
import type { ChatRoom } from '@/types/chat-room'

type ChatRoomItemProps = {
  room: ChatRoom
}

export function ChatRoomItem({ room }: ChatRoomItemProps) {
  return (
    <Link
      to={`/chat/${room.id}`}
      className="flex w-full min-w-0 box-border items-center gap-3 px-4 py-3 hover:bg-chat-list-item-hover border-b border-chat-list-border cursor-pointer text-chat-text-primary hover:text-chat-text-primary no-underline"
    >
      <div className="relative">
        <Avatar className="w-12 h-12">
          <AvatarImage src={room.avatar || undefined} />
          <AvatarFallback className="bg-gray-200 text-chat-text-primary">
            {room.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        {room.isSelfChat && (
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center">
            <span className="text-white text-[10px] font-medium">나</span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-sm truncate">{room.name}</span>
          {room.memberCount && (
            <span className="text-xs text-gray-500">{room.memberCount}</span>
          )}
          {room.isPinned && (
            <RiPushpinLine className="w-3 h-3 text-gray-400" />
          )}
        </div>
        <p className="text-sm text-gray-600 truncate">{room.lastMessage}</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="text-xs text-gray-500">
          {room.time.format('A h:mm')}
        </span>
      </div>
    </Link>
  )
}
