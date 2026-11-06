import { eq } from "drizzle-orm";

import { db } from "#/db";
import { image } from "#/db/image-schema";

export async function deleteImageServer(id: string) {
	const [row] = await db.delete(image).where(eq(image.id, id)).returning();

	return row ?? null;
}
