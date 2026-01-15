import z from "zod";

export type UploadFileRequest = {
    file: File;
};

export const TagResponseSchema = z.object({
    id: z.number(),
    description: z.string(),
    createdAt: z.string(),
    modifiedAt: z.string().nullable(),
});

export type TagResponse = z.infer<typeof TagResponseSchema>;

export const FileResponseSchema = z.object({
    id: z.number(),
    categories: z.array(z.string()),
    fileType: z.string(), //TODO: file type enum backend와 맞추기
    fileOverview: z.string(),
    originalFileName: z.string(),
    savedFileName: z.string(),
    tags: z.array(TagResponseSchema),
    createdAt: z.string(),
    modifiedAt: z.string().nullable(),
});

export type FileResponse = z.infer<typeof FileResponseSchema>;