import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v7 as uuidv7 } from "uuid";

export const image = sqliteTable("image", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => uuidv7()),

	name: text("name").notNull(),

	smsizeKey: text("smsize_key").notNull(),
	smsizeSize: integer("smsize_size").notNull(),

	lgsizeKey: text("lgsize_key").notNull(),
	lgsizeSize: integer("lgsize_size").notNull(),

	orisizeKey: text("orisize_key").notNull(),
	orisizeSize: integer("orisize_size").notNull(),

	createdAt: integer("created_at", { mode: "timestamp_ms" })
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
		.notNull(),
});

export type Image = typeof image.$inferSelect;
export type NewImage = typeof image.$inferInsert;
