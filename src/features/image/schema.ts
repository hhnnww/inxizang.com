import { z } from "zod";

export const imageSchema = z.object({
	id: z.string().min(1),
	name: z.string().min(1, "名称不能为空"),
	smsizeKey: z.string().min(1),
	smsizeSize: z.number().int().min(0),
	lgsizeKey: z.string().min(1),
	lgsizeSize: z.number().int().min(0),
	orisizeKey: z.string().min(1),
	orisizeSize: z.number().int().min(0),
});

export type ImageInput = z.infer<typeof imageSchema>;

export const imageUploadSchema = z.object({
	id: z.string().min(1),
	name: z.string().min(1, "名称不能为空"),
	sm: z.file().optional(),
	lg: z.file().optional(),
	ori: z.file().optional(),
});

export type ImageUploadInput = z.infer<typeof imageUploadSchema>;

export const imageListSchema = z.object({
	page: z.coerce.number().int().min(1).default(1),
	pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export type ImageListInput = z.infer<typeof imageListSchema>;

export const updateImageNameSchema = z.object({
	id: z.string().min(1, "ID 不能为空"),
	name: z.string().min(1, "名称不能为空"),
});

export type UpdateImageNameInput = z.infer<typeof updateImageNameSchema>;

export const deleteImageSchema = z.object({
	id: z.string().min(1, "ID 不能为空"),
});

export type DeleteImageInput = z.infer<typeof deleteImageSchema>;
