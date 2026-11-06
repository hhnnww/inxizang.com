import { eq } from "drizzle-orm";
import { db } from "#/db";
import { travelAsk } from "#/db/travel-schema";

export async function deleteTravelAskServer({ id }: { id: string }) {
	const [row] = await db
		.delete(travelAsk)
		.where(eq(travelAsk.id, id))
		.returning();

	return row ?? null;
}
