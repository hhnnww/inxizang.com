import { ORPCError, os } from "@orpc/server";
import { and, eq } from "drizzle-orm";
import { db } from "#/db";
import { user as userTable } from "#/db/auth-schema";
import { createDefaultAdminUserServer } from "#/features/auth/server/create-default-admin-user";

export const createDefaultAdminUserORPC = os.handler(async () => {
	const admins = await db
		.select({ id: userTable.id })
		.from(userTable)
		.where(and(eq(userTable.role, "admin"), eq(userTable.banned, false)))
		.limit(1);

	if (admins.length > 0) {
		throw new ORPCError("FORBIDDEN", { message: "管理员账号已存在" });
	}

	const result = await createDefaultAdminUserServer();

	return result;
});
