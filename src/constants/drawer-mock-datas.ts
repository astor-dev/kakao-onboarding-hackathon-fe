import {
  HiOutlineUser,
  HiOutlineBriefcase,
  HiOutlineReceiptTax,
  HiOutlineArrowUp,
  HiOutlineDocumentText,
} from 'react-icons/hi'
import type { Filter, FileItem } from '@/types/drawer'

export const filters: Filter[] = [
  { id: 'official', label: '공식 문서', count: 3, icon: HiOutlineUser },
  { id: 'work', label: '업무/학업', count: 5, icon: HiOutlineBriefcase },
  { id: 'receipt', label: '영수증/증빙', count: 2, icon: HiOutlineReceiptTax, active: true },
  { id: 'share', label: '제출/공유용', count: 2, icon: HiOutlineArrowUp },
  { id: 'other', label: '기타', count: 1, icon: HiOutlineDocumentText },
]

export const fileItems: FileItem[] = [
  {
    id: '1',
    name: '202507_대학리스트.docx',
    type: 'document',
    expiryDate: '2026. 1. 27.',
    tags: ['#댕단란리', '#재즐응', '#2025학년도'],
  },
  {
    id: '2',
    name: '20260107_132040-1.jpg',
    type: 'image',
    size: '20.2MB',
    expiryDate: '2026. 1. 27.',
    tags: ['#업무', '#최종분'],
  },
  {
    id: '3',
    name: '202507_대학리스트.xlsx',
    type: 'document',
    expiryDate: '2026. 1. 27.',
    tags: ['#학업', '#엑셀파업'],
  },
  {
    id: '4',
    name: '20260107_132040-2.jpg',
    type: 'image',
    size: '15.8MB',
    expiryDate: '2026. 1. 27.',
    tags: ['#기타파일', '#미넌뮤'],
  },
]
