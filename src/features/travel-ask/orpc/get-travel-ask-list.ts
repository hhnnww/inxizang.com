import { adminORPC } from "#/features/auth/orpc/base";
import { getTravelAskListServer } from "#/features/travel-ask/server/get-travel-ask-list";

export const getTravelAskListORPC = adminORPC.handler(async () => {
	const items = await getTravelAskListServer();

	return items;
});
