import { ORPCError } from "@orpc/server";

import { adminORPC } from "#/features/auth/orpc/base";
import { deleteImageServer } from "#/features/image/server/delete-image";
import { deleteImageObjectServer } from "#/features/image/server/delete-image-object";
import { deleteTravelAnswerImageSchema } from "#/features/travel-ask/schema/travel-image";
import { deleteTravelAnswerImageServer } from "#/features/travel-ask/server/travel-answer-image";

export const deleteTravelAnswerImageORPC = adminORPC
	.input(deleteTravelAnswerImageSchema)
	.handler(async ({ input }) => {
		const relation = await deleteTravelAnswerImageServer(input);

		if (!relation) {
			throw new ORPCError("NOT_FOUND", { message: "图片关系不存在" });
		}

		await deleteImageObjectServer(input.imageId);
		await deleteImageServer(input.imageId);

		return relation;
	});
