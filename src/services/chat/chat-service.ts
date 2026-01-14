import { chatMessages, chatRooms } from '@/constants/chat-mock-datas'
import type { ChatRoom, Message } from '@/types/chat-room'
// import { instance } from '@/services/core/http-instance' // API 연동 시 주석 해제


/**
 * 채팅방 목록 조회
 * 추후 API 연동 시 이 함수만 수정하면 됨
 */
export async function getChatRooms(): Promise<ChatRoom[]> {
  // TODO: 실제 API 연동 시 아래 주석 해제하고 mock data 반환 제거
  // const response = await httpInstance.get<ChatRoom[]>('/api/chat/rooms')
  // return response.data
  
  return chatRooms
}

/**
 * 채팅방 ID로 채팅방 정보 조회
 * 추후 API 연동 시 이 함수만 수정하면 됨
 */
export async function getChatRoomById(roomId: string): Promise<ChatRoom | null> {
  // TODO: 실제 API 연동 시 아래 주석 해제하고 mock data 반환 제거
  // const response = await httpInstance.get<ChatRoom>(`/api/chat/rooms/${roomId}`)
  // return response.data
  
  const room = chatRooms.find((room) => room.id === roomId)
  return room || null
}

/**
 * 채팅방 ID로 메시지 목록 조회
 * 추후 API 연동 시 이 함수만 수정하면 됨
 */
export async function getMessagesByRoomId(roomId: string): Promise<Message[]> {
  // TODO: 실제 API 연동 시 아래 주석 해제하고 mock data 반환 제거
  // const response = await httpInstance.get<Message[]>(`/api/chat/rooms/${roomId}/messages`)
  // return response.data
  
  return chatMessages.filter((message) => message.roomId === roomId) || []
}

/**
 * 메시지 전송
 * 추후 API 연동 시 이 함수만 수정하면 됨
 */
export type SendMessageRequest = {
  roomId: string
  content: string
}

export type SendMessageResponse = {
  message: Message
}

export async function sendMessage(request: SendMessageRequest): Promise<SendMessageResponse> {
  // TODO: 실제 API 연동 시 아래 주석 해제하고 mock data 반환 제거
  // import { instance } from '@/services/core/http-instance'
  // import { z } from 'zod'
  // const response = await instance.post<z.ZodTypeAny>(
  //   `/api/chat/rooms/${_request.roomId}/messages`,
  //   {
  //     content: _request.content,
  //   }
  // )
  // return response.data
  
  // 현재는 API가 없으므로 에러 발생
  // 실제로는 서버에서 생성된 메시지를 반환해야 함
  throw new Error('API 연동 필요: sendMessage 함수의 주석을 해제하고 mock 반환을 제거하세요')
}
