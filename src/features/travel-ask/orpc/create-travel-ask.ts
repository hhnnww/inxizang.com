import { ORPCError } from "@orpc/server";
import { adminORPC } from "#/features/auth/orpc/base";
import { createTravelAskSchema } from "#/features/travel-ask/schema";
import { createTravelAskServer } from "#/features/travel-ask/server/create-travel-ask";

export const createTravelAskORPC = adminORPC
	.input(createTravelAskSchema)
	.handler(async () => {
		const item = await createTravelAskServer();

		if (!item) {
			throw new ORPCError("BAD_REQUEST", { message: "创建提问失败" });
		}

		return item;
	});
