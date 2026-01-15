import { instance, BASE_URL } from '@/services/core/http-instance'
import type { UploadFileRequest, FileResponse } from '@/services/file/file-dto'
import { FileResponseSchema } from '@/services/file/file-dto'
import axios from 'axios'
import z from 'zod'

/**
 * 파일 업로드
 * POST /file
 * Content-Type: multipart/form-data
 */
export const uploadFile = async (request: UploadFileRequest) => {
  const formData = new FormData()
  formData.append('multipartFile', request.file)

  const response = await instance.post(
    '/file',
    formData,
    {
      schema: FileResponseSchema,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )
  
  // instance.post는 이미 파싱된 응답을 반환
  // { success, code, data: {...}, message, requestId }
  return response.data
}

/**
 * 여러 파일 업로드
 */
export const uploadFiles = async (files: File[]) => {
  const uploadPromises = files.map(file => uploadFile({ file }))
  return Promise.all(uploadPromises)
}

/**
 * 파일 다운로드 (바이트 배열을 File 객체로 변환)
 * GET /file/:fileId
 * Response: binary (byte[])
 */
export const getFile = async (fileId: string): Promise<File | null> => {
  try {
    const response = await axios.get(`${BASE_URL}/file/${fileId}`, {
      responseType: 'blob', // 바이너리 데이터를 blob으로 받기
      withCredentials: true,
    })
    
    // Blob을 File 객체로 변환
    const blob = response.data as Blob
    
    // Content-Disposition 헤더에서 파일명 추출 (한글 인코딩 처리)
    const contentDisposition = response.headers['content-disposition']
    let fileName = `file-${fileId}`
    
    if (contentDisposition) {
      // filename*=UTF-8''encoded-name 형식 우선 처리 (RFC 5987)
      const utf8Match = /filename\*=UTF-8''([^;]+)/.exec(contentDisposition)
      if (utf8Match && utf8Match[1]) {
        fileName = decodeURIComponent(utf8Match[1])
      } else {
        // 일반 filename="name" 형식
        const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition)
        if (matches && matches[1]) {
          fileName = decodeURIComponent(matches[1].replace(/['"]/g, ''))
        }
      }
    }
    
    // 텍스트/마크다운 파일인 경우 UTF-8 인코딩 확인
    let finalBlob = blob
    if (blob.type.includes('text') || blob.type.includes('markdown')) {
      // Blob을 텍스트로 읽어서 UTF-8로 다시 생성
      const text = await blob.text()
      finalBlob = new Blob([text], { type: `${blob.type}; charset=utf-8` })
    }
    
    const file = new File([finalBlob], fileName, { type: finalBlob.type })
    return file

  } catch (error) {
    console.error('Failed to fetch file:', error)
    return null
  }
}


/**
 * 파일 리스트 조회
 * GET /file?category={category}&type={type}
 */
export const getFileList = async (category?: string, type?: string): Promise<FileResponse[]> => {
  const params = new URLSearchParams()
  if (category) params.append('category', category)
  if (type) params.append('type', type)
  
  const queryString = params.toString() ? `?${params.toString()}` : ''
  
  const response = await instance.get(`/file${queryString}`, {
    schema: z.array(FileResponseSchema),
  })
  
  return response.data as FileResponse[]
}

/**
 * 파일 검색 (벡터 유사도 검색)
 * GET /file/search?query={query}&topK={topK}&similarityThreshold={threshold}&category={category}&type={type}
 */
export interface SearchFilesParams {
  query: string
  topK?: number
  similarityThreshold?: number
  category?: string
  type?: string
}

export const searchFiles = async (params: SearchFilesParams): Promise<FileResponse[]> => {
  const searchParams = new URLSearchParams()
  searchParams.append('query', params.query)
  if (params.topK !== undefined) searchParams.append('topK', params.topK.toString())
  if (params.similarityThreshold !== undefined) searchParams.append('similarityThreshold', params.similarityThreshold.toString())
  if (params.category) searchParams.append('category', params.category)
  if (params.type) searchParams.append('type', params.type)
  
  const response = await instance.get(`/file/search?${searchParams.toString()}`, {
    schema: z.array(FileResponseSchema),
  })
  
  return response.data as FileResponse[]
}