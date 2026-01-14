import type { ChatRoom, Message } from "@/types/chat-room"
import dayjs from '@/lib/dayjs'

const BASE_TIME = dayjs('2026-01-01 15:41')

export const chatRooms: ChatRoom[] = [
    {
      id: '1',
      name: 'astor.star',
      lastMessage: '이 채팅을 클릭해 주세요!',
      time: BASE_TIME,
      avatar: null,
      isSelfChat: true,
    },
    {
      id: '11',
      name: '공지',
      lastMessage: '나와의 채팅을 이용해주세요.',
      time: BASE_TIME,
      avatar: null,
      isSelfChat: false,
    },
    {
      id: '2',
      name: '2026 그룹공채 원 카카오 온보딩',
      lastMessage: '여러분~~~~ 내일 아침 10시, CEO와의 만남 시간에는...',
      time: BASE_TIME.subtract(2, 'hour').subtract(23, 'minute'), // 오후 1:18
      avatar: null,
      memberCount: 144,
    },
    {
      id: '3',
      name: '동기사랑 6조',
      lastMessage: 'Same here too',
      time: BASE_TIME.subtract(2, 'hour').subtract(31, 'minute'), // 오후 1:10
      avatar: null,
      memberCount: 8,
    },
    {
      id: '4',
      name: '페둥이들',
      lastMessage: 'ㄷㄷㄷ저희도 얼떨떨해요',
      time: BASE_TIME.subtract(3, 'hour').subtract(8, 'minute'), // 오후 12:33
      avatar: null,
      memberCount: 13,
    },
    {
      id: '5',
      name: '해커톤 22조',
      lastMessage: '#춘식도락메뉴 분석 챌린지 1. 2 번...',
      time: BASE_TIME.subtract(3, 'hour').subtract(18, 'minute'), // 오후 12:23
      avatar: null,
      memberCount: 4,
    },
  ]
  
export const chatMessages: Message[] = [
    {
      id: '1',
      roomId: '1',
      sender: '채팅봇',
      content: `📚 AI 톡서랍 사용 안내

🔧 사용 방법
우측 상단의 클라우드 버튼을 눌러 톡클라우드에 진입해주세요
드래그앤드롭, 붙여넣기, +버튼으로 파일을 업로드할 수 있어요

✨ 기능
[카테고리 분류]
파일을 업로드하면 AI가 카테고리를 자동으로 분류해요
[태그 추출]
파일을 업로드하면 AI가 태그를 자동으로 추출해요
[파일 요약]
파일을 업로드하면 AI가 요약을 자동으로 생성해요
[파일 검색]
파일의 내용, 특징을 입력해도 유사한 파일을 검색할 수 있어요

⚠️ 주의 사항
톡서랍을 제외한 다른 데이터/UI는 카카오톡을 가상으로 흉내낸 것이며 실제로 동작하지 않아요`,
      time: BASE_TIME,
      isMe: false,
      type: 'text',
      avatar: null,
    },
    {
      id: '2',
      roomId: '2',
      sender: 'olive',
      content: '여러분~~~~ 내일 아침 10시, CEO와의 만남 시간에는...',
      time: BASE_TIME.subtract(2, 'hour').subtract(23, 'minute'), // 오후 1:18
      isMe: false,
      type: 'text',
      avatar: null,
    },  
    {
      id: '3',
      roomId: '3',
      sender: '카카오게임즈 james(한승준)',
      content: '식사 순서에 따라 다르지 않을까요?',
      time: BASE_TIME.subtract(2, 'hour').subtract(56, 'minute'), // 오후 12:45
      isMe: false,
      type: 'text',
      avatar: null,
    },
    {
      id: '4',
      roomId: '3',
      sender: '카카오게임즈 james(한승준)',
      content: '여쭤보기가',
      time: BASE_TIME.subtract(2, 'hour').subtract(46, 'minute'), // 오후 12:55
      isMe: false,
      type: 'text',
      avatar: null,
    },
    {
      id: '5',
      roomId: '3',
      sender: '카카오게임즈 james(한승준)',
      content: '애매한디요',
      time: BASE_TIME.subtract(2, 'hour').subtract(33, 'minute'), // 오후 1:08
      isMe: false,
      type: 'text',
      avatar: null,
    },
    {
      id: '6',
      roomId: '3',
      sender: '카카오페이 astor(김도훈)',
      content: '저희는 해커톤조끼리 먹어요',
      time: BASE_TIME.subtract(2, 'hour').subtract(32, 'minute'), // 오후 1:09
      isMe: true,
      type: 'text',
      avatar: null,
    },
    {
      id: '7',
      roomId: '3',
      sender: '카카오게임즈 james(한승준)',
      content: 'Same here',
      time: BASE_TIME.subtract(2, 'hour').subtract(31, 'minute'), // 오후 1:10
      isMe: false,
      type: 'text',
      avatar: null,
    },
    {
      id: '8',
      roomId: '3',
      sender: '카카오게임즈 james(한승준)',
      content: 'Same here too',
      time: BASE_TIME.subtract(2, 'hour').subtract(31, 'minute'), // 오후 1:10
      isMe: false,
      type: 'text',
      avatar: null,
    },
    {
      id: '9',
      roomId: '4',
      sender: '페둥이들',
      content: 'ㄷㄷㄷ저희도 얼떨떨해요',
      time: BASE_TIME.subtract(3, 'hour').subtract(8, 'minute'), // 오후 12:33
      isMe: false,
      type: 'text',
      avatar: null,
    },
    {
      id: '10',
      roomId: '5',
      sender: '해커톤 22조',
      content: '#춘식도락메뉴 분석 챌린지 1. 2 번...',
      time: BASE_TIME.subtract(3, 'hour').subtract(18, 'minute'), // 오후 12:23
      isMe: false,
      avatar: null,
      type: 'text',
    },
    {
      id: '11',
      roomId: '1',
      sender: 'astor.star',
      content: '22조 화이팅~',
      time: BASE_TIME.add(1, 'hour'),
      isMe: true,
      type: 'text',
      avatar: null,
    },
    {
      id: '12',
      roomId: '11',
      sender: '공지',
      content: '나와의 채팅을 이용해주세요.',
      time: BASE_TIME,
      isMe: false,
      type: 'text',
      avatar: null,
    },
]
