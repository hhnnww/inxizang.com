import { ORPCError } from "@orpc/server";

import { adminORPC } from "#/features/auth/orpc/base";
import { createTravelAnswerImageSchema } from "#/features/travel-ask/schema/travel-image";
import { createTravelAnswerImageServer } from "#/features/travel-ask/server/travel-answer-image";

export const createTravelAnswerImageORPC = adminORPC
	.input(createTravelAnswerImageSchema)
	.handler(async ({ input }) => {
		const item = await createTravelAnswerImageServer(input);

		if (!item) {
			throw new ORPCError("BAD_REQUEST", { message: "创建回答图片失败" });
		}

		return item;
	});
