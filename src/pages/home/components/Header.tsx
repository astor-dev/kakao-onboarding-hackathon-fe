import { HiOutlineChevronDown, HiOutlineSearch, HiOutlinePlus } from 'react-icons/hi'

export function ChatHeader() {
  return (
    <div>
      <div className="h-14 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <h1 className="text-md font-semibold">채팅</h1>
          <button className="text-gray-500">
            <HiOutlineChevronDown className="w-4 h-4 bg-white" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-gray-600">
            <HiOutlineSearch className="w-5 h-5 bg-white" />
          </button>
          <button className="text-gray-600">
            <HiOutlinePlus className="w-5 h-5 bg-white" />
          </button>
        </div>
      </div>
      
      {/* 필터 버튼 섹션 */}
      <div className="px-4 pb-3 flex items-center gap-2">
        <button className="px-4 py-1.5 rounded-full bg-black text-white text-sm font-medium">
          전체
        </button>
        <button className="px-4 py-1.5 rounded-full bg-white border border-gray-200 text-black text-sm font-medium">
          안읽음
        </button>
        <button className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center">
          <HiOutlinePlus className="w-4 h-4 text-black" />
        </button>
      </div>
    </div>
  )
}
