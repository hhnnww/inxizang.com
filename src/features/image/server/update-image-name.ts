import { eq } from "drizzle-orm";

import { db } from "#/db";
import { image } from "#/db/image-schema";
import type { UpdateImageNameInput } from "#/features/image/schema";

export async function updateImageNameServer({
	id,
	name,
}: UpdateImageNameInput) {
	const [row] = await db
		.update(image)
		.set({ name })
		.where(eq(image.id, id))
		.returning();

	return row ?? null;
}
