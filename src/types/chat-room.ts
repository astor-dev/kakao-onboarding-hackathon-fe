export type ChatRoom = {
  id: string
  name: string
  lastMessage: string
  time: string
  avatar: string | null
  memberCount?: number
  isPinned?: boolean
  isSelfChat?: boolean
}

export type Message = {
  id: string
  roomId: string
  sender: string
  content: string
  time: string
  isMe: boolean
  avatar: string | null
}

export type ChatRoomInfo = {
  id: string
  name: string
  memberCount: number
}
