import { and, eq } from "drizzle-orm";

import { db } from "#/db";
import { travelReplyImage } from "#/db/travel-image-schema";
import type {
	CreateTravelReplyImageInput,
	DeleteTravelReplyImageInput,
} from "#/features/travel-ask/schema/travel-image";

export function getTravelReplyImagesServer(replyId: string) {
	return db.query.travelReply.findFirst({
		where: { id: replyId },
		with: { images: true },
	});
}

export async function createTravelReplyImageServer({
	replyId,
	imageId,
}: CreateTravelReplyImageInput) {
	const [row] = await db
		.insert(travelReplyImage)
		.values({ replyId, imageId })
		.returning();

	return row ?? null;
}

export async function deleteTravelReplyImageServer({
	replyId,
	imageId,
}: DeleteTravelReplyImageInput) {
	const [row] = await db
		.delete(travelReplyImage)
		.where(
			and(
				eq(travelReplyImage.replyId, replyId),
				eq(travelReplyImage.imageId, imageId),
			),
		)
		.returning();

	return row ?? null;
}
