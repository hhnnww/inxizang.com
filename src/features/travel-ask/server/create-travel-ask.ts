import { db } from "#/db";
import { travelAsk } from "#/db/travel-schema";
import { toTraditional } from "#/lib/chinese";
import { faker } from "#/lib/faker/faker";
import { randomNumber } from "#/lib/random";

export async function createTravelAskServer() {
	const [row] = await db
		.insert(travelAsk)
		.values({
			title: toTraditional("默认提问标题"),
			content: toTraditional("默认提问内容"),
			author: toTraditional(faker.name()),
			address: toTraditional(faker.address()),
			views: randomNumber({ minNumber: 3000, maxNumber: 5000 }),
			like: randomNumber({ minNumber: 1000, maxNumber: 2000 }),
			star: randomNumber({ minNumber: 4, maxNumber: 5 }),
		})
		.returning();

	return row ?? null;
}
