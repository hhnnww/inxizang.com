import { inArray } from "drizzle-orm";

import { db } from "#/db";
import { image } from "#/db/image-schema";

export async function getImageByIdServer(id: string) {
	const rows = await db
		.select()
		.from(image)
		.where(inArray(image.id, [id]));

	return rows[0];
}
