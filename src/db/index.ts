import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";

import { authRelations } from "./auth-schema.ts";
import { appRelations } from "./relations.ts";
import { travelRelations } from "./travel-relations.ts";

export const db = drizzle(env.inxizang_db, {
	relations: {
		...appRelations,
		...authRelations,
		...travelRelations,
	},
});
