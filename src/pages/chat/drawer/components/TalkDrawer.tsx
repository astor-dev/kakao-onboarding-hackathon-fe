import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog'
import { Input } from '@/components/ui/Input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { Card, CardContent } from '@/components/ui/Card'
import {
  HiOutlineSearch,
  HiOutlineDocument,
  HiOutlineLink,
} from 'react-icons/hi'
import {
  HiPhoto, HiOutlinePhoto,
  HiOutlineSpeakerWave,
  HiEllipsisHorizontalCircle
} from 'react-icons/hi2'
import type { TalkDrawerTab, FileItem } from '@/types/drawer'
import { filters, fileItems } from '@/constants/drawer-mock-datas'

type TalkDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TalkDrawer({ open, onOpenChange }: TalkDrawerProps) {
  const [selectedTab, setSelectedTab] = useState<TalkDrawerTab>('photo')
  const [searchQuery, setSearchQuery] = useState('')

  const handleTabChange = (value: string) => {
    setSelectedTab(value as TalkDrawerTab)
  }

  const filteredFiles: FileItem[] = fileItems.filter((file: FileItem) => {
    if (searchQuery) {
      return file.name.toLowerCase().includes(searchQuery.toLowerCase())
    }
    return true
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[80vw] h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>톡서랍</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 flex-1 min-h-0">
          {/* 검색 바 */}
          <div className="relative">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="톡서랍 내 파일 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50"
            />
          </div>

          {/* 탭 */}
          <Tabs value={selectedTab} onValueChange={handleTabChange} className="flex-1 flex flex-col min-h-0">
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

            {/* 탭 컨텐츠 */}
            <div className="flex-1 overflow-y-auto">
              <TabsContent value="photo" className="mt-4 space-y-4">
                {/* 필터 버튼들 */}
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => {
                    const Icon = filter.icon
                    return (
                      <button
                        key={filter.id}
                        className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm border transition-colors ${
                          filter.active
                            ? 'bg-green-50 border-green-200 text-green-700'
                            : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{filter.label}</span>
                        <span className="text-xs">{filter.count}개</span>
                      </button>
                    )
                  })}
                </div>

                {/* 파일 그리드 */}
                <div className="grid grid-cols-3 gap-4">
                  {filteredFiles
                    .filter((file: FileItem) => file.type === 'image' || file.type === 'document')
                    .map((file: FileItem) => (
                      <Card key={file.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-0 space-y-3">
                          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
                            {file.type === 'image' ? (
                              <HiOutlinePhoto className="w-6 h-6 text-green-600" />
                            ) : (
                              <HiOutlineDocument className="w-6 h-6 text-green-600" />
                            )}
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium truncate" title={file.name}>{file.name}</p>
                            {file.expiryDate && (
                              <p className="text-xs text-gray-500">
                                유효기간 {file.expiryDate}
                              </p>
                            )}
                            {file.size && (
                              <p className="text-xs text-gray-500">{file.size}</p>
                            )}
                            <div className="flex flex-wrap gap-1 mt-2">
                              {file.tags.map((tag: string, idx: number) => (
                                <span
                                  key={idx}
                                  className="text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="document" className="mt-4 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => {
                    const Icon = filter.icon
                    return (
                      <button
                        key={filter.id}
                        className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm border transition-colors ${
                          filter.active
                            ? 'bg-green-50 border-green-200 text-green-700'
                            : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{filter.label}</span>
                        <span className="text-xs">{filter.count}개</span>
                      </button>
                    )
                  })}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {filteredFiles
                    .filter((file: FileItem) => file.type === 'document')
                    .map((file: FileItem) => (
                      <Card key={file.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-0 space-y-3">
                          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
                            <HiOutlineDocument className="w-6 h-6 text-green-600" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium truncate" title={file.name}>{file.name}</p>
                            {file.expiryDate && (
                              <p className="text-xs text-gray-500">
                                유효기간 {file.expiryDate}
                              </p>
                            )}
                            <div className="flex flex-wrap gap-1 mt-2">
                              {file.tags.map((tag: string, idx: number) => (
                                <span
                                  key={idx}
                                  className="text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="link" className="mt-4 space-y-4">
                <div className="text-center text-gray-500 py-8">
                  링크가 없습니다.
                </div>
              </TabsContent>

              <TabsContent value="voice" className="mt-4 space-y-4">
                <div className="text-center text-gray-500 py-8">
                  음성이 없습니다.
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
