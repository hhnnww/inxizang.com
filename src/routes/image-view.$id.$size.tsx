import { createFileRoute } from "@tanstack/react-router";

import {
	getImageObjectServer,
	type ImageVariantSize,
} from "#/features/image/server/get-image-object";

const VALID_SIZES: ImageVariantSize[] = ["sm", "lg", "ori"];

export const Route = createFileRoute("/image-view/$id/$size")({
	server: {
		handlers: {
			GET: async ({ params }) => {
				const size = params.size as ImageVariantSize;

				if (!VALID_SIZES.includes(size)) {
					return new Response("Bad Request", { status: 400 });
				}

				const object = await getImageObjectServer({
					id: params.id,
					size,
				});

				if (!object) {
					return new Response("Not Found", { status: 404 });
				}

				const headers = new Headers();
				object.writeHttpMetadata(headers);
				headers.set("etag", object.httpEtag);
				headers.set("cache-control", "public, max-age=31536000, immutable");

				return new Response(object.body, { headers });
			},
		},
	},
});
