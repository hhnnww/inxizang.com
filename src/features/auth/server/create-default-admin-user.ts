import { eq } from "drizzle-orm";
import { db } from "#/db";
import { user as userTable } from "#/db/auth-schema";
import { createAdminUserServer } from "#/features/auth/server/create-admin-user";

const DEFAULT_ADMIN = {
	email: "175990271@qq.com",
	name: "wuweihua",
	password: "12qwaszx",
};

export async function createDefaultAdminUserServer() {
	const existing = await db
		.select({ id: userTable.id })
		.from(userTable)
		.where(eq(userTable.email, DEFAULT_ADMIN.email))
		.limit(1);

	if (existing.length > 0) {
		return { created: false, email: DEFAULT_ADMIN.email };
	}

	const { user } = await createAdminUserServer({
		email: DEFAULT_ADMIN.email,
		name: DEFAULT_ADMIN.name,
		password: DEFAULT_ADMIN.password,
		role: "admin",
	});

	return { created: true, email: user.email };
}
