import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Home as HomeIcon } from 'lucide-react'

export function Home() {
  return (
    <div className="px-4">
      <div className="flex flex-col items-center justify-center gap-8 py-12">
        <div className="flex flex-col items-center gap-4">
          <HomeIcon className="size-12 text-primary" />
          <h1 className="text-4xl font-bold">Welcome</h1>
          <p className="text-muted-foreground text-center">
            ShadCN 기반 미니멀 홈 페이지
          </p>
        </div>

        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>샘플 카드</CardTitle>
            <CardDescription>
              ShadCN 컴포넌트를 활용한 보일러플레이트
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="입력해보세요..." />
            <Button className="w-full">버튼</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
