import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router'

export function ErrorPage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="size-6 text-destructive" />
          </div>
          <CardTitle className="text-2xl">페이지를 찾을 수 없습니다</CardTitle>
          <CardDescription>
            요청하신 페이지가 존재하지 않거나 이동되었습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => navigate('/')} className="w-full">
            홈으로 돌아가기
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
