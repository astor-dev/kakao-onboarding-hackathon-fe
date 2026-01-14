import type { ExploreItem } from '@/types/drawer'
import { HiOutlineDocument, HiOutlineLink } from 'react-icons/hi'
import { HiOutlinePhoto } from 'react-icons/hi2'

type ItemCardProps = {
  item: ExploreItem
}

export function ItemCard({ item }: ItemCardProps) {
  const getIcon = () => {
    switch (item.type) {
      case 'media':
        return <HiOutlinePhoto className="w-12 h-12 text-gray-400" />
      case 'link':
        return <HiOutlineLink className="w-12 h-12 text-gray-400" />
      case 'file':
        return <HiOutlineDocument className="w-12 h-12 text-gray-400" />
      default:
        return <HiOutlineDocument className="w-12 h-12 text-gray-400" />
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
      <div className="flex items-start gap-3">
        {item.thumbnail ? (
          <div className="shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
            <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="shrink-0 w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
            {getIcon()}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm text-gray-900 truncate">{item.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            {item.size && (
              <span className="text-xs text-gray-500">{item.size}</span>
            )}
            {item.date && (
              <span className="text-xs text-gray-500">{item.date}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
