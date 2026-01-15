import { ALL_CATEGORIES } from '@/constants/categories'
import { CategoryItem } from '@/pages/chat/cloud/components/drawer/CategoryItem'
import { RecommendedCategoryCarousel } from '@/pages/chat/cloud/components/drawer/RecommendedCategoryCarousel'
import { RecentFilesSection } from '@/pages/chat/cloud/components/drawer/RecentFilesSection'
import { useNavigate, useParams } from 'react-router'


export function TalkDrawerTab() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/chat/${id}/cloud/category/${categoryId}`)
  }

  return (
    <div className="flex flex-col">
      {/* AI 추천 카테고리 섹션 */}
      <div className="py-4 m-4 mt-0 rounded-lg bg-white shadow-sm">
        <div className="px-4 mb-4">
          <h3 className="text-xs text-kakao-black font-semibold flex items-center gap-1 mb-2">
            {/* <IoSparkles className="w-5 h-5 text-kanana-main" /> */}
            AI 추천 카테고리
          </h3>
        </div>
        <RecommendedCategoryCarousel onCategoryClick={handleCategoryClick} />
      </div>

      {/* 최근 파일 섹션 */}
      <RecentFilesSection />
      
      {/* 전체 카테고리 섹션 */}
      <div className="m-4 mt-0 py-4 rounded-lg bg-white shadow-sm">
        <h3 className="px-4 text-xs text-kakao-black font-semibold flex items-center gap-1 mb-2">
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
  )
}
