import { eq } from "drizzle-orm";
import { db } from "#/db";
import { travelAsk } from "#/db/travel-schema";
import type { UpdateTravelAskInput } from "#/features/travel-ask/schema";
import { toTraditional } from "#/lib/chinese";

export async function updateTravelAskServer({
	id,
	...values
}: UpdateTravelAskInput) {
	const [row] = await db
		.update(travelAsk)
		.set({
			...values,
			title: values.title ? toTraditional(values.title) : values.title,
			content: values.content ? toTraditional(values.content) : values.content,
			author: values.author ? toTraditional(values.author) : values.author,
			address: values.address ? toTraditional(values.address) : values.address,
		})
		.where(eq(travelAsk.id, id))
		.returning();

	return row ?? null;
}
