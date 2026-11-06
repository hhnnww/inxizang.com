import { ORPCError } from "@orpc/server";
import { adminORPC } from "#/features/auth/orpc/base";
import { deleteTravelReplySchema } from "#/features/travel-ask/schema/travel-reply";
import { deleteTravelReplyServer } from "#/features/travel-ask/server/delete-travel-reply";

export const deleteTravelReplyORPC = adminORPC
	.input(deleteTravelReplySchema)
	.handler(async ({ input }) => {
		const item = await deleteTravelReplyServer(input.id);

		if (!item) {
			throw new ORPCError("NOT_FOUND", { message: "回复不存在" });
		}

		return item;
	});
