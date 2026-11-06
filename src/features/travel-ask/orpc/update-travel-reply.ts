import { ORPCError } from "@orpc/server";
import { adminORPC } from "#/features/auth/orpc/base";
import { updateTravelReplySchema } from "#/features/travel-ask/schema/travel-reply";
import { updateTravelReplyServer } from "#/features/travel-ask/server/update-travel-reply";

export const updateTravelReplyORPC = adminORPC
	.input(updateTravelReplySchema)
	.handler(async ({ input }) => {
		const item = await updateTravelReplyServer(input);

		if (!item) {
			throw new ORPCError("NOT_FOUND", { message: "回复不存在" });
		}

		return item;
	});
