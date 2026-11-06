import { adminORPC } from "#/features/auth/orpc/base";
import { imageListSchema } from "#/features/image/schema";
import { getImageListServer } from "#/features/image/server/get-image-list";

export const getImageListORPC = adminORPC
	.input(imageListSchema)
	.handler(async ({ input }) => {
		const result = await getImageListServer(input);

		return result;
	});
