import type { Dayjs } from 'dayjs'

type DateGroupHeaderProps = {
  date: Dayjs
}

export function DateGroupHeader({ date }: DateGroupHeaderProps) {
  return (
    <div className="px-4 py-3 bg-white sticky top-0 z-10">
      <h3 className="text-base font-medium text-gray-900">
        {date.format('YYYY. M. D')}
      </h3>
    </div>
  )
}
