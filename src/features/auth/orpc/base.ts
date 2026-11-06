import { ORPCError, os } from "@orpc/server";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "#/lib/auth";

export type AuthSession = NonNullable<
	Awaited<ReturnType<typeof auth.api.getSession>>
>;

export const requireAuth = os.middleware(async ({ next }) => {
	const session = await auth.api.getSession({
		headers: getRequestHeaders(),
	});

	if (!session) {
		throw new ORPCError("UNAUTHORIZED", { message: "未登录" });
	}

	return next({
		context: {
			session,
		},
	});
});

export const requireAdmin = os.middleware(async ({ next }) => {
	const session = await auth.api.getSession({
		headers: getRequestHeaders(),
	});

	if (!session) {
		throw new ORPCError("UNAUTHORIZED", { message: "未登录" });
	}

	if (session.user.role !== "admin") {
		throw new ORPCError("FORBIDDEN", { message: "需要管理员权限" });
	}

	return next({
		context: {
			session,
		},
	});
});

export const authedORPC = os.use(requireAuth);
export const adminORPC = os.use(requireAdmin);
