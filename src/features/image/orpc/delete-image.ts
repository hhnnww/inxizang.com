import { ORPCError } from "@orpc/server";

import { adminORPC } from "#/features/auth/orpc/base";
import { deleteImageSchema } from "#/features/image/schema";
import { deleteImageServer } from "#/features/image/server/delete-image";
import { deleteImageObjectServer } from "#/features/image/server/delete-image-object";

export const deleteImageORPC = adminORPC
	.input(deleteImageSchema)
	.handler(async ({ input }) => {
		const deleted = await deleteImageObjectServer(input.id);

		if (!deleted) {
			throw new ORPCError("NOT_FOUND", { message: "图片不存在" });
		}

		const item = await deleteImageServer(input.id);

		if (!item) {
			throw new ORPCError("NOT_FOUND", { message: "图片不存在" });
		}

		return item;
	});
