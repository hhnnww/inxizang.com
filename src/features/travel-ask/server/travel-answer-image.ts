import { and, eq } from "drizzle-orm";

import { db } from "#/db";
import { travelAnswerImage } from "#/db/travel-image-schema";
import type {
	CreateTravelAnswerImageInput,
	DeleteTravelAnswerImageInput,
} from "#/features/travel-ask/schema/travel-image";

export function getTravelAnswerImagesServer(answerId: string) {
	return db.query.travelAnswer.findFirst({
		where: { id: answerId },
		with: { images: true },
	});
}

export async function createTravelAnswerImageServer({
	answerId,
	imageId,
}: CreateTravelAnswerImageInput) {
	const [row] = await db
		.insert(travelAnswerImage)
		.values({ answerId, imageId })
		.returning();

	return row ?? null;
}

export async function deleteTravelAnswerImageServer({
	answerId,
	imageId,
}: DeleteTravelAnswerImageInput) {
	const [row] = await db
		.delete(travelAnswerImage)
		.where(
			and(
				eq(travelAnswerImage.answerId, answerId),
				eq(travelAnswerImage.imageId, imageId),
			),
		)
		.returning();

	return row ?? null;
}
