import { useEffect, useState } from 'react'
import { HiOutlinePhoto, HiOutlineDocument, HiOutlineFilm, HiOutlineFolder, HiOutlineLink } from 'react-icons/hi2'
import type { FileType, FileItem } from '@/types/file'
import { getFile } from '@/services/file/file-service'

// 원래 FileUploadModal에 있던 유틸 함수들
function getFileTypeFromFile(file: File): FileType {
  if (file.type.startsWith('image/')) return 'IMAGE_VIDEO'
  if (file.type.startsWith('video/')) return 'IMAGE_VIDEO'
  if (file.type.startsWith('audio/')) return 'IMAGE_VIDEO'
  
  if (
    file.type.includes('pdf') ||
    file.type.includes('document') ||
    file.type.includes('word') ||
    file.type.includes('excel') ||
    file.type.includes('powerpoint') ||
    file.type.includes('text')
  ) {
    return 'DOCUMENT'
  }
  
  return 'ETC'
}

function isImageFile(file: File): boolean {
  return file.type.startsWith('image/')
}

function getImagePreviewUrl(file: File): string {
  return URL.createObjectURL(file)
}

// FileIcon 컴포넌트 - FileType 기반으로 아이콘 표시
function FileIconByType({ fileType, file }: { fileType: FileType; file?: File }) {
  const iconClass = "w-8 h-8 text-gray-400"
  
  // File 객체가 있으면 비디오 체크
  if (file && file.type.startsWith('video/')) {
    return <HiOutlineFilm className={iconClass} />
  }
  
  switch (fileType) {
    case 'IMAGE_VIDEO':
      return <HiOutlinePhoto className={iconClass} />
    case 'DOCUMENT':
      return <HiOutlineDocument className={iconClass} />
    case 'LINK':
      return <HiOutlineLink className={iconClass} />
    case 'TEXT':
      return <HiOutlineDocument className={iconClass} />
    default:
      return <HiOutlineFolder className={iconClass} />
  }
}

type FilePreviewProps = {
  file: File | FileItem
  size?: 'sm' | 'md' | 'lg'
}

/**
 * File 객체 또는 FileItem을 받아서 미리보기를 표시하는 컴포넌트
 * 
 * - File 객체: blob URL 생성하여 이미지 미리보기
 * - FileItem: 이미지인 경우만 getFile API로 실제 파일 가져와서 미리보기
 */
export function FilePreview({ file, size = 'lg' }: FilePreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16',
  }
  
  // File 객체인지 FileItem인지 판별
  const isRealFile = file instanceof File
  const fileType: FileType = isRealFile 
    ? getFileTypeFromFile(file as File)
    : (file as FileItem).fileType
  
  useEffect(() => {
    let isMounted = true
    
    const loadPreview = async () => {
      if (isRealFile) {
        // 실제 File 객체 - 기존 로직 그대로
        const realFile = file as File
        if (isImageFile(realFile)) {
          const url = getImagePreviewUrl(realFile)
          
          setTimeout(() => {
            if (isMounted) {
              setPreviewUrl(url)
            }
          }, 0)
          
          return () => {
            URL.revokeObjectURL(url)
          }
        }
      } else {
        // FileItem - 이미지인 경우만 API 호출
        const fileItem = file as FileItem
        if (fileItem.fileType === 'IMAGE_VIDEO') {
          setIsLoading(true)
          try {
            const realFile = await getFile(fileItem.id.toString())
            if (realFile && isMounted) {
              const url = getImagePreviewUrl(realFile)
              setPreviewUrl(url)
              
              return () => {
                URL.revokeObjectURL(url)
              }
            }
          } catch (error) {
            console.error('Failed to load file preview:', error)
          } finally {
            if (isMounted) {
              setIsLoading(false)
            }
          }
        }
      }
    }
    
    const cleanup = loadPreview()
    
    return () => {
      isMounted = false
      if (cleanup instanceof Promise) {
        cleanup.then(cleanupFn => cleanupFn?.())
      }
    }
  }, [file, isRealFile])
  
  const shouldShowImage = previewUrl && !isLoading
  
  return (
    <div className="shrink-0">
      {shouldShowImage ? (
        <div className={`${sizeClasses[size]} rounded-lg overflow-hidden bg-gray-100`}>
          <img
            key={previewUrl}
            src={previewUrl}
            alt={isRealFile ? (file as File).name : (file as FileItem).originalFileName}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
      ) : (
        <div className={`${sizeClasses[size]} rounded-lg bg-gray-100 flex items-center justify-center`}>
          {isLoading ? (
            <div className="animate-pulse">
              <div className="w-8 h-8 bg-gray-300 rounded" />
            </div>
          ) : (
            <FileIconByType 
              fileType={fileType} 
              file={isRealFile ? (file as File) : undefined} 
            />
          )}
        </div>
      )}
    </div>
  )
}
