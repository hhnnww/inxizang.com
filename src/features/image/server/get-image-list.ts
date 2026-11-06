import { count } from "drizzle-orm";

import { db } from "#/db";
import { image } from "#/db/image-schema";

export async function getImageListServer({
	page,
	pageSize,
}: {
	page: number;
	pageSize: number;
}) {
	const offset = (page - 1) * pageSize;

	const [rows, totalRows] = await Promise.all([
		db.query.image.findMany({
			orderBy: (image, { desc }) => [desc(image.createdAt)],
			limit: pageSize,
			offset,
		}),
		db.select({ value: count() }).from(image),
	]);

	return {
		items: rows,
		total: totalRows[0]?.value ?? 0,
		page,
		pageSize,
	};
}
