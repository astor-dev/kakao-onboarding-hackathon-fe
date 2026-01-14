import { useState } from 'react'
import { TabsContent } from '@/components/ui/Tabs'
import type { FilterType, ExploreItem } from '@/types/drawer'
import { ExploreFilters } from './ExploreFilters'
import { ItemCard } from './ItemCard'

// Mock data
const mockItems: ExploreItem[] = [
  {
    id: '1',
    name: '회의록_2024.pdf',
    type: 'file',
    size: '2.3MB',
    date: '2024.01.10',
  },
  {
    id: '2',
    name: 'IMG_1234.jpg',
    type: 'media',
    size: '1.5MB',
    date: '2024.01.09',
  },
  {
    id: '3',
    name: 'https://example.com/article',
    type: 'link',
    date: '2024.01.08',
  },
  {
    id: '4',
    name: '프로젝트_제안서.docx',
    type: 'file',
    size: '3.1MB',
    date: '2024.01.07',
  },
  {
    id: '5',
    name: 'video_clip.mp4',
    type: 'media',
    size: '15.2MB',
    date: '2024.01.06',
  },
]

export function ExploreTab() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all')

  const filteredItems = mockItems.filter((item) => {
    if (selectedFilter === 'all') return true
    return item.type === selectedFilter
  })

  return (
    <TabsContent value="explore" className="flex-1 flex flex-col m-0 p-0 min-h-0">
      <ExploreFilters selected={selectedFilter} onSelect={setSelectedFilter} />
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </TabsContent>
  )
}
