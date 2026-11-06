import { ORPCError } from "@orpc/server";
import { adminORPC } from "#/features/auth/orpc/base";
import { deleteTravelAnswerSchema } from "#/features/travel-ask/schema/travel-answer";
import { deleteTravelAnswerServer } from "#/features/travel-ask/server/delete-travel-answer";

export const deleteTravelAnswerORPC = adminORPC
	.input(deleteTravelAnswerSchema)
	.handler(async ({ input }) => {
		const item = await deleteTravelAnswerServer(input);

		if (!item) {
			throw new ORPCError("NOT_FOUND", { message: "回答不存在" });
		}

		return item;
	});
