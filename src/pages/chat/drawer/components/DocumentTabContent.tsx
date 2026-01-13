import { TabsContent } from '@/components/ui/Tabs'
import { FilterButtons } from './FilterButtons'
import { FileGrid } from './FileGrid'
import type { FileItem, Filter } from '@/types/drawer'

type DocumentTabContentProps = {
  filters: Filter[]
  files: FileItem[]
}

export function DocumentTabContent({ filters, files }: DocumentTabContentProps) {
  return (
    <TabsContent value="document" className="mt-4 space-y-4">
      <FilterButtons filters={filters} />
      <FileGrid files={files} filterType={(file) => file.type === 'document'} />
    </TabsContent>
  )
}
