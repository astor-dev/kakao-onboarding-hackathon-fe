import { TabsContent } from '@/components/ui/Tabs'
import { FilterButtons } from './FilterButtons'
import { FileGrid } from './FileGrid'
import type { FileItem, Filter } from '@/types/drawer'

type PhotoTabContentProps = {
  filters: Filter[]
  files: FileItem[]
}

export function PhotoTabContent({ filters, files }: PhotoTabContentProps) {
  return (
    <TabsContent value="photo" className="mt-4 space-y-4">
      <FilterButtons filters={filters} />
      <FileGrid
        files={files}
        filterType={(file) => file.type === 'image' || file.type === 'document'}
      />
    </TabsContent>
  )
}
