import { db } from "#/db";
import { travelReply } from "#/db/travel-schema";
import type { CreateTravelReplyInput } from "#/features/travel-ask/schema/travel-reply";
import { toTraditional } from "#/lib/chinese";
import { faker } from "#/lib/faker/faker";
import { randomNumber } from "#/lib/random";

export async function createTravelReplyServer({
	answerId,
}: CreateTravelReplyInput) {
	const [row] = await db
		.insert(travelReply)
		.values({
			answerId,
			title: toTraditional("默认回复标题"),
			content: toTraditional("默认回复内容"),
			author: toTraditional(faker.name()),
			address: toTraditional(faker.address()),
			views: randomNumber({ minNumber: 3000, maxNumber: 5000 }),
			like: randomNumber({ minNumber: 1000, maxNumber: 2000 }),
			star: randomNumber({ minNumber: 4, maxNumber: 5 }),
		})
		.returning();

	return row ?? null;
}
