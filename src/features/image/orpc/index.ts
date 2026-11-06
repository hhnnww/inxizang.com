import { os } from "@orpc/server";

import { createImageORPC } from "./create-image";
import { deleteImageORPC } from "./delete-image";
import { getImageListORPC } from "./get-image-list";
import { updateImageNameORPC } from "./update-image-name";

export const imageORPCRouter = os.router({
	getImageList: getImageListORPC,
	createImage: createImageORPC,
	updateImageName: updateImageNameORPC,
	deleteImage: deleteImageORPC,
});
