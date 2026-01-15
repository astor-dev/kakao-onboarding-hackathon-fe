import { TabsContent } from '@/components/ui/Tabs'
import { ALL_CATEGORIES } from '@/constants/categories'
import { CategoryItem } from '@/pages/chat/cloud/components/drawer/CategoryItem'
import { RecommendedCategoryCarousel } from '@/pages/chat/cloud/components/drawer/RecommendedCategoryCarousel'
import { IoSparkles } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router'

export function TalkDrawerTab() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/chat/${id}/cloud/category/${categoryId}`)
  }

  return (
    <TabsContent value="drawer" className="flex-1 m-0 p-0 overflow-y-auto">
      <div className="flex flex-col">
        {/* AI 추천 카테고리 섹션 */}
        <div className="my-4">
          <div className="px-4 mb-4">
            <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <IoSparkles className="w-5 h-5 text-kanana-main" />
              AI 추천 카테고리
            </h2>
          </div>
          <RecommendedCategoryCarousel onCategoryClick={handleCategoryClick} />
        </div>
        
        {/* 전체 카테고리 섹션 */}
        <div className="mb-4">
          <div className="h-px mx-4 bg-gray-200 mb-4" />
          <h3 className="px-4 text-xs text-gray-600 flex items-center gap-1">
            전체 카테고리
          </h3>
          <div className="flex flex-col">
            {ALL_CATEGORIES.map((category) => (
              <CategoryItem
                key={category.id}
                category={category}
                onClick={() => handleCategoryClick(category.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </TabsContent>
  )
}
