import { env } from "cloudflare:workers";

import { getImageByIdServer } from "#/features/image/server/get-image-by-id";

const VARIANT_KEYS = ["smsizeKey", "lgsizeKey", "orisizeKey"] as const;

export async function deleteImageObjectServer(id: string) {
	const item = await getImageByIdServer(id);

	if (!item) {
		return false;
	}

	for (const keyField of VARIANT_KEYS) {
		const key = item[keyField];

		if (key) {
			await env.inxizang_bucket.delete(key);
		}
	}

	return true;
}
