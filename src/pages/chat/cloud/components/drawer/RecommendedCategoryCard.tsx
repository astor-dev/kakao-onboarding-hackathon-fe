import type { Category } from '@/constants/categories'
import { getPastelColor } from '@/lib/background'

type RecommendedCategoryCardProps = {
  category: Category
  onClick?: () => void
}

export function RecommendedCategoryCard({ category, onClick }: RecommendedCategoryCardProps) {
  const Icon = category.icon

  return (
    <button
      onClick={onClick}
      className="shrink-0 p-2 flex flex-col items-center gap-3 cursor-pointer group"
    >
      <div 
        className="w-20 h-20 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105"
        style={{ background: getPastelColor(category.label) }}
      >
        <Icon className="w-8 h-8 text-gray-900 stroke-1" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-gray-900 line-clamp-2">{category.label}</p>
      </div>
    </button>
  )
}
