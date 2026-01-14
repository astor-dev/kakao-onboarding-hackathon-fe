import { z } from 'zod'

const UploadFileResponseSchema = z.object({
  id: z.string(),
  url: z.string(),
  name: z.string(),
  size: z.number(),
  type: z.string(),
  createdAt: z.string(),
})

export type UploadFileResponse = z.infer<typeof UploadFileResponseSchema>

export type UploadFileRequest = {
  file: File
  roomId?: string
}

/**
 * 파일 업로드
 * POST /file
 * Content-Type: multipart/form-data
 */
export async function uploadFile(request: UploadFileRequest): Promise<UploadFileResponse> {
  // TODO: 실제 API 연동 시 아래 주석 해제
  // const formData = new FormData()
  // formData.append('multipartFile', request.file)
  // if (request.roomId) {
  //   formData.append('roomId', request.roomId)
  // }
  // 
  // const response = await instance.post<typeof UploadFileResponseSchema>(
  //   '/file',
  //   formData,
  //   {
  //     schema: UploadFileResponseSchema,
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   }
  // )
  // 
  // return response.data

  // Mock 응답 (개발용)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `file-${Date.now()}`,
        url: URL.createObjectURL(request.file),
        name: request.file.name,
        size: request.file.size,
        type: request.file.type,
        createdAt: new Date().toISOString(),
      })
    }, 500)
  })
}

/**
 * 여러 파일 업로드
 */
export async function uploadFiles(files: File[], roomId?: string): Promise<UploadFileResponse[]> {
  const uploadPromises = files.map(file => uploadFile({ file, roomId }))
  return Promise.all(uploadPromises)
}
