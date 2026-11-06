import { ORPCError } from "@orpc/server";
import { adminORPC } from "#/features/auth/orpc/base";
import { updateTravelAskSchema } from "#/features/travel-ask/schema";
import { updateTravelAskServer } from "#/features/travel-ask/server/update-travel-ask";

export const updateTravelAskORPC = adminORPC
	.input(updateTravelAskSchema)
	.handler(async ({ input }) => {
		const item = await updateTravelAskServer(input);

		if (!item) {
			throw new ORPCError("NOT_FOUND", { message: "提问不存在" });
		}

		return item;
	});
