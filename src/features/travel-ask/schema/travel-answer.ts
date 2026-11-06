import { z } from "zod";

export const travelAnswerSchema = z.object({
	askId: z.string().min(1, "提问 ID 不能为空"),
	title: z.string().min(1, "标题不能为空"),
	content: z.string().min(1, "内容不能为空"),
	author: z.string().min(1, "作者不能为空"),
	address: z.string().min(1, "地点不能为空"),
});

export type TravelAnswerInput = z.infer<typeof travelAnswerSchema>;

export const createTravelAnswerSchema = z.object({
	askId: z.string().min(1, "提问 ID 不能为空"),
});

export type CreateTravelAnswerInput = z.infer<typeof createTravelAnswerSchema>;

export const deleteTravelAnswerSchema = z.object({
	id: z.string().min(1, "ID 不能为空"),
});

export type DeleteTravelAnswerInput = z.infer<typeof deleteTravelAnswerSchema>;

export const updateTravelAnswerSchema = z.object({
	id: z.string().min(1, "ID 不能为空"),
	title: z.string().min(1, "标题不能为空"),
	content: z.string().min(1, "内容不能为空"),
	author: z.string().min(1, "作者不能为空"),
	address: z.string().min(1, "地点不能为空"),
	star: z.number().int().min(0).default(0),
	like: z.number().int().min(0).default(0),
	views: z.number().int().min(0).default(0),
});

export type UpdateTravelAnswerInput = z.infer<typeof updateTravelAnswerSchema>;
