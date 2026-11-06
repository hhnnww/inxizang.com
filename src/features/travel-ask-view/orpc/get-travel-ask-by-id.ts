import { ORPCError, os } from "@orpc/server";

import { travelAskViewIdSchema } from "#/features/travel-ask-view/schema";
import { getTravelAskByIdServer } from "#/features/travel-ask-view/server/get-travel-ask-by-id";

export const getTravelAskByIdORPC = os
	.input(travelAskViewIdSchema)
	.handler(async ({ input }) => {
		const item = await getTravelAskByIdServer(input.id);

		if (!item) {
			throw new ORPCError("NOT_FOUND", { message: "提问不存在" });
		}

		return item;
	});
