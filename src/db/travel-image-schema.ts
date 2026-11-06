import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v7 as uuidv7 } from "uuid";

import { image } from "./image-schema.ts";
import { travelAnswer, travelReply } from "./travel-schema.ts";

export const travelAnswerImage = sqliteTable("travel_answer_image", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => uuidv7()),
	answerId: text("answer_id")
		.notNull()
		.references(() => travelAnswer.id, { onDelete: "cascade" }),
	imageId: text("image_id")
		.notNull()
		.references(() => image.id, { onDelete: "cascade" }),
});

export type TravelAnswerImage = typeof travelAnswerImage.$inferSelect;
export type NewTravelAnswerImage = typeof travelAnswerImage.$inferInsert;

export const travelReplyImage = sqliteTable("travel_reply_image", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => uuidv7()),
	replyId: text("reply_id")
		.notNull()
		.references(() => travelReply.id, { onDelete: "cascade" }),
	imageId: text("image_id")
		.notNull()
		.references(() => image.id, { onDelete: "cascade" }),
});

export type TravelReplyImage = typeof travelReplyImage.$inferSelect;
export type NewTravelReplyImage = typeof travelReplyImage.$inferInsert;
