import { z } from "zod";

export const createTravelAnswerImageSchema = z.object({
	answerId: z.string().min(1, "回答 ID 不能为空"),
	imageId: z.string().min(1, "图片 ID 不能为空"),
});

export type CreateTravelAnswerImageInput = z.infer<
	typeof createTravelAnswerImageSchema
>;

export const deleteTravelAnswerImageSchema = createTravelAnswerImageSchema;

export type DeleteTravelAnswerImageInput = z.infer<
	typeof deleteTravelAnswerImageSchema
>;

export const createTravelReplyImageSchema = z.object({
	replyId: z.string().min(1, "回复 ID 不能为空"),
	imageId: z.string().min(1, "图片 ID 不能为空"),
});

export type CreateTravelReplyImageInput = z.infer<
	typeof createTravelReplyImageSchema
>;

export const deleteTravelReplyImageSchema = createTravelReplyImageSchema;

export type DeleteTravelReplyImageInput = z.infer<
	typeof deleteTravelReplyImageSchema
>;
