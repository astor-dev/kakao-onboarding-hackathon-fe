import { TabsList, TabsTrigger } from '@/components/ui/Tabs'
import {
  HiPhoto,
  HiOutlineDocument,
  HiOutlineLink,
  HiOutlineSpeakerWave,
  HiEllipsisHorizontalCircle,
} from 'react-icons/hi2'

export function DrawerTabs() {
  return (
    <TabsList className="w-full justify-start bg-transparent border-b border-gray-200 rounded-none h-auto p-0 gap-0">
      <TabsTrigger
        value="photo"
        className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:font-semibold data-[state=active]:text-black data-[state=inactive]:text-gray-500 px-4 py-3 gap-2"
      >
        <HiPhoto className="w-5 h-5" />
        <span>사진/동영상</span>
      </TabsTrigger>
      <TabsTrigger
        value="document"
        className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:font-semibold data-[state=active]:text-black data-[state=inactive]:text-gray-500 px-4 py-3 gap-2"
      >
        <HiOutlineDocument className="w-5 h-5" />
        <span>문서</span>
      </TabsTrigger>
      <TabsTrigger
        value="link"
        className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:font-semibold data-[state=active]:text-black data-[state=inactive]:text-gray-500 px-4 py-3 gap-2"
      >
        <HiOutlineLink className="w-5 h-5" />
        <span>링크</span>
      </TabsTrigger>
      <TabsTrigger
        value="voice"
        className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:font-semibold data-[state=active]:text-black data-[state=inactive]:text-gray-500 px-4 py-3 gap-2"
      >
        <HiOutlineSpeakerWave className="w-5 h-5" />
        <span>음성</span>
      </TabsTrigger>
      <TabsTrigger
        value="more"
        className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3"
        disabled
      >
        <HiEllipsisHorizontalCircle className="w-5 h-5 text-gray-400" />
      </TabsTrigger>
    </TabsList>
  )
}
