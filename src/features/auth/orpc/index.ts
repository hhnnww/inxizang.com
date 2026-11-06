import { os } from "@orpc/server";
import { createDefaultAdminUserORPC } from "./create-default-admin-user";
import { getSessionORPC } from "./get-session";

export const authORPCRouter = os.router({
	createDefaultAdminUser: createDefaultAdminUserORPC,
	getSession: getSessionORPC,
});
