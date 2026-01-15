import type { ComponentType } from 'react'
import { HiOutlineStar, HiOutlineRocketLaunch, HiOutlineLightBulb, HiOutlineFolder, HiOutlineDocument, HiOutlinePhoto, HiOutlineVideoCamera, HiOutlineMusicalNote, HiOutlineLink, HiOutlineArchiveBox, HiOutlineClipboardDocument } from 'react-icons/hi2'

export type Category = {
  id: string
  label: string
  icon: ComponentType<{ className?: string }>
  isRecommended?: boolean
}

/**
 * 추천 카테고리
 * - 빈번도 높은 카테고리
 */
export const RECOMMENDED_CATEGORIES: Category[] = [
  { id: 'recent-activity', label: '최근 활동', icon: HiOutlineRocketLaunch, isRecommended: true },
  { id: 'all-accounts', label: '개인정보', icon: HiOutlineStar, isRecommended: true },
  { id: 'ideas', label: '여행', icon: HiOutlineLightBulb, isRecommended: true },
  { id: 'files', label: '일상', icon: HiOutlineFolder, isRecommended: true },
  { id: 'documents', label: '게임', icon: HiOutlineDocument, isRecommended: true },
  { id: 'documents', label: '프로젝트', icon: HiOutlineDocument, isRecommended: true },
]

/**
 * 전체 카테고리 목록
 * TODO: 기획 완료 후 실제 카테고리로 대체
 */
export const ALL_CATEGORIES: Category[] = [
  { id: 'category-1', label: '카테고리 1', icon: HiOutlineFolder },
  { id: 'category-2', label: '카테고리 2', icon: HiOutlineDocument },
  { id: 'category-3', label: '카테고리 3', icon: HiOutlinePhoto },
  { id: 'category-4', label: '카테고리 4', icon: HiOutlineVideoCamera },
  { id: 'category-5', label: '카테고리 5', icon: HiOutlineMusicalNote },
  { id: 'category-6', label: '카테고리 6', icon: HiOutlineLink },
  { id: 'category-7', label: '카테고리 7', icon: HiOutlineArchiveBox },
  { id: 'category-8', label: '카테고리 8', icon: HiOutlineClipboardDocument },
]
