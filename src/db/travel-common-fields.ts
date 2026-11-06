import { sql } from "drizzle-orm";
import { integer, text } from "drizzle-orm/sqlite-core";
import { v7 as uuidv7 } from "uuid";

export const travelCommonFields = {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => uuidv7()),
	title: text("title").notNull(),
	content: text("content").notNull(),
	author: text("author").notNull(),
	address: text("address"),
	star: integer("star").default(0).notNull(),
	like: integer("like").default(0).notNull(),
	views: integer("views").default(0).notNull(),
	createdAt: integer("created_at", { mode: "timestamp_ms" })
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
		.notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp_ms" })
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
};
