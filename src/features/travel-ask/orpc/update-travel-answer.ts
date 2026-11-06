import { ORPCError } from "@orpc/server";
import { adminORPC } from "#/features/auth/orpc/base";
import { updateTravelAnswerSchema } from "#/features/travel-ask/schema/travel-answer";
import { updateTravelAnswerServer } from "#/features/travel-ask/server/update-travel-answer";

export const updateTravelAnswerORPC = adminORPC
	.input(updateTravelAnswerSchema)
	.handler(async ({ input }) => {
		const item = await updateTravelAnswerServer(input);

		if (!item) {
			throw new ORPCError("NOT_FOUND", { message: "回答不存在" });
		}

		return item;
	});
