import { ORPCError } from "@orpc/server";

import { adminORPC } from "#/features/auth/orpc/base";
import { createTravelReplyImageSchema } from "#/features/travel-ask/schema/travel-image";
import { createTravelReplyImageServer } from "#/features/travel-ask/server/travel-reply-image";

export const createTravelReplyImageORPC = adminORPC
	.input(createTravelReplyImageSchema)
	.handler(async ({ input }) => {
		const item = await createTravelReplyImageServer(input);

		if (!item) {
			throw new ORPCError("BAD_REQUEST", { message: "创建回复图片失败" });
		}

		return item;
	});
