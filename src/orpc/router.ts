import { authORPCRouter } from "#/features/auth/orpc";
import { imageORPCRouter } from "#/features/image/orpc";
import { travelAskORPCRouter } from "#/features/travel-ask/orpc";
import { travelAskViewORPCRouter } from "#/features/travel-ask-view/orpc";

export default {
	auth: authORPCRouter,
	image: imageORPCRouter,
	travelAsk: travelAskORPCRouter,
	travelAskView: travelAskViewORPCRouter,
};
