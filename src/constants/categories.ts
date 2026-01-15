import type { ComponentType } from 'react'
import {
  HiHeart,
  HiShieldCheck,
  HiBanknotes,
  HiTicket,
  HiGlobeAlt,
  HiHome,
  HiSparkles,
  HiShoppingBag,
  HiBriefcase,
  HiCake,
  HiLightBulb,
  HiPuzzlePiece,
  HiAcademicCap,
  HiFolder,
} from 'react-icons/hi2'

export type Category = {
  id: string
  label: string
  icon: ComponentType<{ className?: string }>
  color: string
  isRecommended?: boolean
}

/**
 * 전체 카테고리 목록
 * 카테고리 그룹별로 색상 통일:
 * - 개인/생활: 건강(#FF6B9D), 개인정보(#FF6B9D), 금융(#FF6B9D)
 * - 쇼핑/혜택: 쿠폰(#FF7043), 쇼핑(#FF7043)
 * - 라이프: 여행(#42A5F5), 리빙(#42A5F5), 반려동물(#42A5F5)
 * - 자기계발: 업무(#BA68C8), 학습(#BA68C8), 인사이트(#BA68C8)
 * - 취미/여가: 요리(#66BB6A), 취미(#66BB6A)
 * - 기타: 기타(#BDBDBD)
 */

/**
 * HEALTH, PRIVACY, FINANCE, COUPON, TRAVEL, LIVING, PET, SHOPPING, JOB, COOKING, INSIGHT, HOBBY, STUDY, ETC
 */
export const ALL_CATEGORIES: Category[] = [
  // 개인/생활 그룹 (핑크 계열 - 더 쨍한 색)
  { id: 'HEALTH', label: '건강', icon: HiHeart, color: '#FF6B9D' },
  { id: 'PRIVACY', label: '개인정보', icon: HiShieldCheck, color: '#FF6B9D' },
  { id: 'FINANCE', label: '금융', icon: HiBanknotes, color: '#FF6B9D' },
  
  // 쇼핑/혜택 그룹 (오렌지 계열 - 더 쨍한 색)
  { id: 'COUPON', label: '쿠폰', icon: HiTicket, color: '#FF7043' },
  { id: 'SHOPPING', label: '쇼핑', icon: HiShoppingBag, color: '#FF7043' },
  
  // 라이프 그룹 (블루 계열 - 더 쨍한 색)
  { id: 'TRAVEL', label: '여행', icon: HiGlobeAlt, color: '#42A5F5' },
  { id: 'LIVING', label: '리빙', icon: HiHome, color: '#42A5F5' },
  { id: 'PET', label: '반려동물', icon: HiSparkles, color: '#42A5F5' },
  
  // 자기계발 그룹 (퍼플 계열 - 더 쨍한 색)
  { id: 'JOB', label: '업무', icon: HiBriefcase, color: '#BA68C8' },
  { id: 'STUDY', label: '학습', icon: HiAcademicCap, color: '#BA68C8' },
  { id: 'INSIGHT', label: '인사이트', icon: HiLightBulb, color: '#BA68C8' },
  
  // 취미/여가 그룹 (그린 계열 - 더 쨍한 색)
  { id: 'COOKING', label: '요리', icon: HiCake, color: '#66BB6A' },
  { id: 'HOBBY', label: '취미', icon: HiPuzzlePiece, color: '#66BB6A' },
  
  // 기타
  { id: 'ETC', label: '기타', icon: HiFolder, color: '#BDBDBD' },
]

/**
 * 추천 카테고리 (ALL_CATEGORIES에서 랜덤하게 8개)
 */
function getRandomCategories<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export const RECOMMENDED_CATEGORIES: Category[] = getRandomCategories(ALL_CATEGORIES, 8).map(cat => ({
  ...cat,
  isRecommended: true,
}))
