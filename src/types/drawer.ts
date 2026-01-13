import type { ComponentType } from 'react'

export type TalkDrawerTab = 'photo' | 'document' | 'link' | 'voice'

export type Filter = {
  id: string
  label: string
  count: number
  icon: ComponentType<{ className?: string }>
  active?: boolean
}

export type FileItem = {
  id: string
  name: string
  type: 'image' | 'document' | 'link' | 'voice'
  size?: string
  expiryDate?: string
  tags: string[]
}
