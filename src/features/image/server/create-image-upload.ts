import { ORPCError } from "@orpc/server";

import { getImageVariantKey } from "#/features/image/component/image-variant";
import type { ImageInput } from "#/features/image/schema";
import { createImageServer } from "#/features/image/server/create-image";
import { getImageByIdServer } from "#/features/image/server/get-image-by-id";
import { uploadImageObjectServer } from "#/features/image/server/upload-image-object";

const IMAGE_UPLOAD_MAX_BYTES = 20 * 1024 * 1024;

const IMAGE_VARIANTS = [
	{ name: "sm", keyField: "smsizeKey", sizeField: "smsizeSize" },
	{ name: "lg", keyField: "lgsizeKey", sizeField: "lgsizeSize" },
	{ name: "ori", keyField: "orisizeKey", sizeField: "orisizeSize" },
] as const;

export type ImageUploadInput = {
	id: string;
	name: string;
	sm?: File | null;
	lg?: File | null;
	ori?: File | null;
};

export async function createImageUploadServer({
	id,
	name,
	sm,
	lg,
	ori,
}: ImageUploadInput) {
	const existing = await getImageByIdServer(id);

	if (existing) {
		return null;
	}

	const files = { sm, lg, ori } as const;
	const keys: Record<string, string> = {};
	const sizes: Record<string, number> = {};

	for (const variant of IMAGE_VARIANTS) {
		const file = files[variant.name];

		if (!file) {
			throw new ORPCError("BAD_REQUEST", {
				message: "图片文件不完整",
			});
		}

		if (file.size > IMAGE_UPLOAD_MAX_BYTES) {
			throw new ORPCError("PAYLOAD_TOO_LARGE", {
				message: "图片体积过大",
			});
		}

		const key = getImageVariantKey(id, variant.name);
		const body = await file.arrayBuffer();

		const object = await uploadImageObjectServer({ key, body });

		if (!object) {
			throw new ORPCError("INTERNAL_SERVER_ERROR", {
				message: "图片上传失败",
			});
		}

		keys[variant.keyField] = object.key;
		sizes[variant.sizeField] = object.size;
	}

	return await createImageServer({
		id,
		name,
		...keys,
		...sizes,
	} as ImageInput);
}
