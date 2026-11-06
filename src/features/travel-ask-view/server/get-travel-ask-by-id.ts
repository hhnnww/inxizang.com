import { asc } from "drizzle-orm";

import { db } from "#/db";

export async function getTravelAskByIdServer(id: string) {
	const row = await db.query.travelAsk.findFirst({
		where: { id },
		orderBy: (t) => asc(t.createdAt),
		with: {
			answers: {
				orderBy: (t) => asc(t.createdAt),
				with: {
					images: true,
					replies: {
						orderBy: (t) => asc(t.createdAt),
						with: {
							images: true,
						},
					},
				},
			},
		},
	});

	return row ?? null;
}
