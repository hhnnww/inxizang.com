import { ORPCError } from "@orpc/server";

import { adminORPC } from "#/features/auth/orpc/base";
import { updateImageNameSchema } from "#/features/image/schema";
import { updateImageNameServer } from "#/features/image/server/update-image-name";

export const updateImageNameORPC = adminORPC
	.input(updateImageNameSchema)
	.handler(async ({ input }) => {
		const item = await updateImageNameServer(input);

		if (!item) {
			throw new ORPCError("NOT_FOUND", { message: "图片不存在" });
		}

		return item;
	});
