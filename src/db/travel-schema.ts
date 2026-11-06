import { sqliteTable, text } from "drizzle-orm/sqlite-core";

import { travelCommonFields } from "./travel-common-fields.ts";

export const travelAsk = sqliteTable("travel_ask", {
	...travelCommonFields,
});

export type TravelAsk = typeof travelAsk.$inferSelect;
export type NewTravelAsk = typeof travelAsk.$inferInsert;

export const travelAnswer = sqliteTable("travel_answer", {
	...travelCommonFields,
	askId: text("ask_id")
		.notNull()
		.references(() => travelAsk.id, { onDelete: "cascade" }),
});

export type TravelAnswer = typeof travelAnswer.$inferSelect;
export type NewTravelAnswer = typeof travelAnswer.$inferInsert;

export const travelReply = sqliteTable("travel_reply", {
	...travelCommonFields,
	answerId: text("answer_id")
		.notNull()
		.references(() => travelAnswer.id, { onDelete: "cascade" }),
});

export type TravelReply = typeof travelReply.$inferSelect;
export type NewTravelReply = typeof travelReply.$inferInsert;
