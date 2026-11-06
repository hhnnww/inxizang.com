import type { CreateAdminUserInput } from "#/features/auth/schema";
import { auth } from "#/lib/auth";

export async function createAdminUserServer(data: CreateAdminUserInput) {
	const { user } = await auth.api.createUser({
		body: {
			email: data.email,
			name: data.name,
			password: data.password ?? "12qwaszx",
			role: data.role === undefined ? "admin" : (data.role as "admin" | "user"),
		},
	});

	return { user };
}
