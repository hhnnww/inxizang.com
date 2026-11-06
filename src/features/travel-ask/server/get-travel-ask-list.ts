import { db } from "#/db";

export async function getTravelAskListServer() {
	const rows = await db.query.travelAsk.findMany({
		orderBy: (ask, { desc }) => [desc(ask.createdAt)],
	});

	return rows;
}
