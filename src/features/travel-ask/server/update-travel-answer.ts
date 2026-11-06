import { eq } from "drizzle-orm";
import { db } from "#/db";
import { travelAnswer } from "#/db/travel-schema";
import type { UpdateTravelAnswerInput } from "#/features/travel-ask/schema/travel-answer";
import { toTraditional } from "#/lib/chinese";

export async function updateTravelAnswerServer({
	id,
	...values
}: UpdateTravelAnswerInput) {
	const [row] = await db
		.update(travelAnswer)
		.set({
			...values,
			title: values.title ? toTraditional(values.title) : values.title,
			content: values.content ? toTraditional(values.content) : values.content,
			author: values.author ? toTraditional(values.author) : values.author,
			address: values.address ? toTraditional(values.address) : values.address,
		})
		.where(eq(travelAnswer.id, id))
		.returning();

	return row ?? null;
}
