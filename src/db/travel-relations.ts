import { defineRelationsPart } from "drizzle-orm";

import { image } from "./image-schema.ts";
import { travelAnswerImage, travelReplyImage } from "./travel-image-schema.ts";
import { travelAnswer, travelAsk, travelReply } from "./travel-schema.ts";

export const travelRelations = defineRelationsPart(
	{
		travelAsk,
		travelAnswer,
		travelReply,
		image,
		travelAnswerImage,
		travelReplyImage,
	},
	(r) => ({
		travelAsk: {
			answers: r.many.travelAnswer({
				from: r.travelAsk.id,
				to: r.travelAnswer.askId,
			}),
		},
		travelAnswer: {
			ask: r.one.travelAsk({
				from: r.travelAnswer.askId,
				to: r.travelAsk.id,
			}),
			replies: r.many.travelReply({
				from: r.travelAnswer.id,
				to: r.travelReply.answerId,
			}),
			images: r.many.image({
				from: r.travelAnswer.id.through(r.travelAnswerImage.answerId),
				to: r.image.id.through(r.travelAnswerImage.imageId),
			}),
		},
		travelReply: {
			answer: r.one.travelAnswer({
				from: r.travelReply.answerId,
				to: r.travelAnswer.id,
			}),
			images: r.many.image({
				from: r.travelReply.id.through(r.travelReplyImage.replyId),
				to: r.image.id.through(r.travelReplyImage.imageId),
			}),
		},
	}),
);
