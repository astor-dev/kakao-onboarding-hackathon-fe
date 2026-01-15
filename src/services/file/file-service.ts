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
    
    // Content-Disposition 헤더에서 파일명 추출
    const contentDisposition = response.headers['content-disposition']
    let fileName = `file-${fileId}`
    if (contentDisposition) {
      const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition)
      if (matches && matches[1]) {
        fileName = matches[1].replace(/['"]/g, '')
      }
    }
    
    const file = new File([blob], fileName, { type: blob.type })
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