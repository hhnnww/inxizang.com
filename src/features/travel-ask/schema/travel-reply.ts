import { z } from "zod";

export const travelReplySchema = z.object({
	answerId: z.string().min(1, "回答 ID 不能为空"),
	title: z.string().min(1, "标题不能为空"),
	content: z.string().min(1, "内容不能为空"),
	author: z.string().min(1, "作者不能为空"),
	address: z.string().min(1, "地点不能为空"),
	star: z.number().int().min(0).default(0),
	like: z.number().int().min(0).default(0),
	views: z.number().int().min(0).default(0),
});

export type TravelReplyInput = z.infer<typeof travelReplySchema>;

export const createTravelReplySchema = z.object({
	answerId: z.string().min(1, "回答 ID 不能为空"),
});

export type CreateTravelReplyInput = z.infer<typeof createTravelReplySchema>;

export const updateTravelReplySchema = travelReplySchema.extend({
	id: z.string().min(1, "ID 不能为空"),
});

export type UpdateTravelReplyInput = z.infer<typeof updateTravelReplySchema>;

export const deleteTravelReplySchema = z.object({
	id: z.string().min(1, "ID 不能为空"),
});

export type DeleteTravelReplyInput = z.infer<typeof deleteTravelReplySchema>;
