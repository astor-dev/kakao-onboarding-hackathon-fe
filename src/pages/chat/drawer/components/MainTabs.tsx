import { TabsList, TabsTrigger } from '@/components/ui/Tabs'
import type { MainTab } from '@/types/drawer'
import { HiOutlineBookmark, HiOutlineSearch } from 'react-icons/hi'

type MainTabsProps = {
  value: MainTab
  onValueChange: (value: string) => void
}

export function MainTabs({ value, onValueChange }: MainTabsProps) {
  return (
    <TabsList className="w-full justify-start bg-transparent border-b border-gray-200 rounded-none h-auto p-0 gap-0">
      <TabsTrigger
        value="drawer"
        className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:font-semibold data-[state=active]:text-black data-[state=inactive]:text-gray-500 px-4 py-3 gap-2"
      >
        <HiOutlineBookmark className="w-5 h-5" />
        <span>AI 톡서랍</span>
      </TabsTrigger>
      <TabsTrigger
        value="explore"
        className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:font-semibold data-[state=active]:text-black data-[state=inactive]:text-gray-500 px-4 py-3 gap-2"
      >
        <HiOutlineSearch className="w-5 h-5" />
        <span>탐색하기</span>
      </TabsTrigger>
    </TabsList>
  )
}
