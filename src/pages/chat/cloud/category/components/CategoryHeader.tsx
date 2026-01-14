import { Link, useParams } from 'react-router'
import { FaArrowLeft } from 'react-icons/fa'
import { HiOutlineDotsVertical } from 'react-icons/hi'

type CategoryHeaderProps = {
  title: string
}

export function CategoryHeader({ title }: CategoryHeaderProps) {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="h-14 flex items-center justify-between px-4 border-b border-gray-200">
      <div className="flex items-center gap-3">
        <Link to={`/chat/${id}/cloud`} className="text-gray-600">
          <FaArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-semibold text-lg">{title}</h1>
      </div>
      <button className="text-gray-600">
        <HiOutlineDotsVertical className="w-5 h-5" />
      </button>
    </div>
  )
}
