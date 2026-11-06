import { ORPCError } from "@orpc/server";

import { adminORPC } from "#/features/auth/orpc/base";
import { deleteImageServer } from "#/features/image/server/delete-image";
import { deleteImageObjectServer } from "#/features/image/server/delete-image-object";
import { deleteTravelReplyImageSchema } from "#/features/travel-ask/schema/travel-image";
import { deleteTravelReplyImageServer } from "#/features/travel-ask/server/travel-reply-image";

export const deleteTravelReplyImageORPC = adminORPC
	.input(deleteTravelReplyImageSchema)
	.handler(async ({ input }) => {
		const relation = await deleteTravelReplyImageServer(input);

		if (!relation) {
			throw new ORPCError("NOT_FOUND", { message: "图片关系不存在" });
		}

		await deleteImageObjectServer(input.imageId);
		await deleteImageServer(input.imageId);

		return relation;
	});
