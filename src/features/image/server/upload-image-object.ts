import { env } from "cloudflare:workers";

export async function uploadImageObjectServer({
	key,
	body,
}: {
	key: string;
	body: ArrayBuffer;
}) {
	const object = await env.inxizang_bucket.put(key, body, {
		httpMetadata: {
			contentType: "image/webp",
			cacheControl: "public, max-age=31536000, immutable",
		},
	});

	if (!object) {
		return null;
	}

	return {
		key: object.key,
		size: object.size,
	};
}
