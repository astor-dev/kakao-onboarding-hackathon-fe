export type MainTab = 'drawer' | 'explore'

export type FilterType = 'all' | 'media' | 'link' | 'file'

export type ExploreItem = {
  id: string
  name: string
  type: FilterType
  thumbnail?: string
  size?: string
  date?: string
}
