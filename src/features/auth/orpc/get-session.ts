import { adminORPC } from "./base";

export const getSessionORPC = adminORPC.handler(async ({ context }) => {
	const { session } = context;

	return {
		isLoggedIn: true,
		isAdmin: session.user.role === "admin",
		user: {
			id: session.user.id,
			name: session.user.name,
			email: session.user.email,
			role: session.user.role ?? "user",
		},
	};
});
