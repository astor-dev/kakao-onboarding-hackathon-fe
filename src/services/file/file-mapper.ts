import type { FileResponse } from '@/services/file/file-dto'
import type { FileItem, FileType } from '@/types/file'
import dayjs from '@/lib/dayjs'

/**
 * API 응답(FileResponse)을 View 타입(FileItem)으로 변환
 */
export function mapFileResponseToFileItem(response: FileResponse): FileItem {
  return {
    id: response.id,
    fileOverview: response.fileOverview,
    fileType: mapBackendFileTypeToFrontend(response.fileType as FileType | null | undefined),
    originalFileName: response.originalFileName,
    savedFileName: response.savedFileName,
    tags: response.tags.map(tag => ({
      id: tag.id,
      description: tag.description,
      createdAt: dayjs(tag.createdAt),
      modifiedAt: dayjs(tag.modifiedAt),
    })),
    categories: response.categories,
    createdAt: dayjs(response.createdAt),
    modifiedAt: dayjs(response.modifiedAt),
  }
}

/**
 * 여러 FileResponse를 FileItem 배열로 변환
 */
export function mapFileResponsesToFileItems(responses: FileResponse[]): FileItem[] {
  return responses.map(mapFileResponseToFileItem)
}

/**
 * 백엔드 파일 타입을 프론트엔드 FileType으로 매핑
 * TODO: 백엔드 enum과 맞추기
 */
function mapBackendFileTypeToFrontend(backendType: FileType | null | undefined): FileType {
  if (!backendType) {
    return 'ETC'
  }
  return backendType
}
