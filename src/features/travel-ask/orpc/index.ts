import { os } from "@orpc/server";
import { createTravelAnswerORPC } from "./create-travel-answer";
import { createTravelAnswerImageORPC } from "./create-travel-answer-image";
import { createTravelAskORPC } from "./create-travel-ask";
import { createTravelReplyORPC } from "./create-travel-reply";
import { createTravelReplyImageORPC } from "./create-travel-reply-image";
import { deleteTravelAnswerORPC } from "./delete-travel-answer";
import { deleteTravelAnswerImageORPC } from "./delete-travel-answer-image";
import { deleteTravelAskORPC } from "./delete-travel-ask";
import { deleteTravelReplyORPC } from "./delete-travel-reply";
import { deleteTravelReplyImageORPC } from "./delete-travel-reply-image";
import { getTravelAskByIdORPC } from "./get-travel-ask-by-id";
import { getTravelAskListORPC } from "./get-travel-ask-list";
import { updateTravelAnswerORPC } from "./update-travel-answer";
import { updateTravelAskORPC } from "./update-travel-ask";
import { updateTravelReplyORPC } from "./update-travel-reply";

export const travelAskORPCRouter = os.router({
	getTravelAskList: getTravelAskListORPC,
	getTravelAskById: getTravelAskByIdORPC,
	createTravelAsk: createTravelAskORPC,
	updateTravelAsk: updateTravelAskORPC,
	deleteTravelAsk: deleteTravelAskORPC,
	createTravelAnswer: createTravelAnswerORPC,
	updateTravelAnswer: updateTravelAnswerORPC,
	deleteTravelAnswer: deleteTravelAnswerORPC,
	createTravelReply: createTravelReplyORPC,
	updateTravelReply: updateTravelReplyORPC,
	deleteTravelReply: deleteTravelReplyORPC,
	createTravelAnswerImage: createTravelAnswerImageORPC,
	deleteTravelAnswerImage: deleteTravelAnswerImageORPC,
	createTravelReplyImage: createTravelReplyImageORPC,
	deleteTravelReplyImage: deleteTravelReplyImageORPC,
});
