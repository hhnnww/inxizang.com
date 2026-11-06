import { ORPCError } from "@orpc/server";
import { adminORPC } from "#/features/auth/orpc/base";
import { travelAskIdSchema } from "#/features/travel-ask/schema";
import { deleteTravelAskServer } from "#/features/travel-ask/server/delete-travel-ask";

export const deleteTravelAskORPC = adminORPC
	.input(travelAskIdSchema)
	.handler(async ({ input }) => {
		const item = await deleteTravelAskServer(input);

		if (!item) {
			throw new ORPCError("NOT_FOUND", { message: "提问不存在" });
		}

		return item;
	});
