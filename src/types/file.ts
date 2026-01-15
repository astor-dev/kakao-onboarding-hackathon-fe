import type { Dayjs } from "dayjs"

//[ IMAGE_VIDEO, DOCUMENT, LINK, ETC ]
export type FileType = 'IMAGE_VIDEO' | 'DOCUMENT' | 'LINK' | 'ETC' | 'TEXT'

export type FileTag = {
    id: number,
    description: string,
    createdAt: Dayjs,
    modifiedAt: Dayjs,
}

export type FileItem = {
    id: number,
    fileOverview: string,
    fileType: FileType,
    originalFileName: string,
    savedFileName: string,
    tags: FileTag[],
    categories: string[],
    createdAt: Dayjs,
    modifiedAt: Dayjs,
}