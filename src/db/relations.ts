import { defineRelations } from "drizzle-orm";

import * as schema from "./schema.ts";

export const appRelations = defineRelations(schema);
