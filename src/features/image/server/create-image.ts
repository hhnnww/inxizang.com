import { db } from "#/db";
import { image } from "#/db/image-schema";
import type { ImageInput } from "#/features/image/schema";

export async function createImageServer(input: ImageInput) {
	const [item] = await db.insert(image).values(input).returning();

	return item;
}
