import { TabsContent } from '@/components/ui/Tabs'

type EmptyTabContentProps = {
  value: string
  message: string
}

export function EmptyTabContent({ value, message }: EmptyTabContentProps) {
  return (
    <TabsContent value={value} className="mt-4 space-y-4">
      <div className="text-center text-gray-500 py-8">{message}</div>
    </TabsContent>
  )
}
