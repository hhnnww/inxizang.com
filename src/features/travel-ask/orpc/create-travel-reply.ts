import { ORPCError } from "@orpc/server";
import { adminORPC } from "#/features/auth/orpc/base";
import { createTravelReplySchema } from "#/features/travel-ask/schema/travel-reply";
import { createTravelReplyServer } from "#/features/travel-ask/server/create-travel-reply";

export const createTravelReplyORPC = adminORPC
	.input(createTravelReplySchema)
	.handler(async ({ input }) => {
		const item = await createTravelReplyServer(input);

		if (!item) {
			throw new ORPCError("BAD_REQUEST", { message: "创建回复失败" });
		}

		return item;
	});
