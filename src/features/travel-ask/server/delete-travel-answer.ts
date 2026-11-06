import { eq } from "drizzle-orm";
import { db } from "#/db";
import { travelAnswer } from "#/db/travel-schema";
import type { DeleteTravelAnswerInput } from "#/features/travel-ask/schema/travel-answer";

export async function deleteTravelAnswerServer({
	id,
}: DeleteTravelAnswerInput) {
	const [row] = await db
		.delete(travelAnswer)
		.where(eq(travelAnswer.id, id))
		.returning();

	return row ?? null;
}
