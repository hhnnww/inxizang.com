import { env } from "cloudflare:workers";

import { getImageByIdServer } from "#/features/image/server/get-image-by-id";

export type ImageVariantSize = "sm" | "lg" | "ori";

const SIZE_KEYS = {
	sm: "smsizeKey",
	lg: "lgsizeKey",
	ori: "orisizeKey",
} as const;

export async function getImageObjectServer({
	id,
	size,
}: {
	id: string;
	size: ImageVariantSize;
}) {
	const item = await getImageByIdServer(id);

	if (!item) {
		return null;
	}

	const key = item[SIZE_KEYS[size]];

	if (!key) {
		return null;
	}

	const object = await env.inxizang_bucket.get(key);

	if (!object) {
		return null;
	}

	return object;
}
