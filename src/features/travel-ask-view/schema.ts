import { z } from "zod";

export const travelAskViewIdSchema = z.object({
	id: z.string().min(1, "ID 不能为空"),
});

export type TravelAskViewIdInput = z.infer<typeof travelAskViewIdSchema>;
