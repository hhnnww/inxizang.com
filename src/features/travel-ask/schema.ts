import { z } from "zod";

export const travelAskSchema = z.object({
	title: z.string().min(1, "标题不能为空"),
	content: z.string().min(1, "内容不能为空"),
	author: z.string().min(1, "作者不能为空"),
	address: z.string().nullable().optional(),
	star: z.number().int().min(0).default(0),
	like: z.number().int().min(0).default(0),
	views: z.number().int().min(0).default(0),
});

export type TravelAskInput = z.infer<typeof travelAskSchema>;

export const createTravelAskSchema = z.object({});

export type CreateTravelAskInput = z.infer<typeof createTravelAskSchema>;

export const travelAskIdSchema = z.object({
	id: z.string().min(1, "ID 不能为空"),
});

export const updateTravelAskSchema = travelAskSchema.extend({
	id: z.string().min(1, "ID 不能为空"),
});

export type TravelAskIdInput = z.infer<typeof travelAskIdSchema>;
export type UpdateTravelAskInput = z.infer<typeof updateTravelAskSchema>;
