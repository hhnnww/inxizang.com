import { os } from "@orpc/server";

import { getTravelAskByIdORPC } from "./get-travel-ask-by-id";

export const travelAskViewORPCRouter = os.router({
	getTravelAskById: getTravelAskByIdORPC,
});
