import { eq } from "drizzle-orm";
import { db } from "#/db";
import { travelReply } from "#/db/travel-schema";

export async function deleteTravelReplyServer(id: string) {
	const [row] = await db
		.delete(travelReply)
		.where(eq(travelReply.id, id))
		.returning();

	return row ?? null;
}
