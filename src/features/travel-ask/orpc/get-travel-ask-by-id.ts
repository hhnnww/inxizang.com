import { ORPCError } from "@orpc/server";
import { adminORPC } from "#/features/auth/orpc/base";
import { travelAskIdSchema } from "#/features/travel-ask/schema";
import { getTravelAskByIdServer } from "#/features/travel-ask/server/get-travel-ask-by-id";

export const getTravelAskByIdORPC = adminORPC
	.input(travelAskIdSchema)
	.handler(async ({ input }) => {
		const item = await getTravelAskByIdServer(input.id);

		if (!item) {
			throw new ORPCError("NOT_FOUND", { message: "提问不存在" });
		}

		return item;
	});
