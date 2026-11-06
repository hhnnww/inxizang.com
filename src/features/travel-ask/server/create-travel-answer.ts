import { db } from "#/db";
import { travelAnswer } from "#/db/travel-schema";
import type { CreateTravelAnswerInput } from "#/features/travel-ask/schema/travel-answer";
import { toTraditional } from "#/lib/chinese";
import { faker } from "#/lib/faker/faker";
import { randomNumber } from "#/lib/random";

export async function createTravelAnswerServer({
	askId,
}: CreateTravelAnswerInput) {
	const [row] = await db
		.insert(travelAnswer)
		.values({
			askId,
			title: toTraditional("默认回答标题"),
			content: toTraditional("默认回答内容"),
			author: toTraditional(faker.name()),
			address: toTraditional(faker.address()),
			views: randomNumber({ minNumber: 3000, maxNumber: 5000 }),
			like: randomNumber({ minNumber: 1000, maxNumber: 2000 }),
			star: randomNumber({ minNumber: 4, maxNumber: 5 }),
		})
		.returning();

	return row ?? null;
}
