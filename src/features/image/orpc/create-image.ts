import { ORPCError } from "@orpc/server";

import { adminORPC } from "#/features/auth/orpc/base";
import { imageUploadSchema } from "#/features/image/schema";
import { createImageUploadServer } from "#/features/image/server/create-image-upload";

export const createImageORPC = adminORPC
	.input(imageUploadSchema)
	.handler(async ({ input }) => {
		const item = await createImageUploadServer(input);

		if (!item) {
			throw new ORPCError("CONFLICT", { message: "图片已存在" });
		}

		return item;
	});
