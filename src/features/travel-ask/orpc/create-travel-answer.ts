import { ORPCError } from "@orpc/server";
import { adminORPC } from "#/features/auth/orpc/base";
import { createTravelAnswerSchema } from "#/features/travel-ask/schema/travel-answer";
import { createTravelAnswerServer } from "#/features/travel-ask/server/create-travel-answer";

export const createTravelAnswerORPC = adminORPC
	.input(createTravelAnswerSchema)
	.handler(async ({ input }) => {
		const item = await createTravelAnswerServer(input);

		if (!item) {
			throw new ORPCError("BAD_REQUEST", { message: "创建回答失败" });
		}

		return item;
	});
