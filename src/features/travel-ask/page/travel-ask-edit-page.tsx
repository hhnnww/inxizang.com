import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import { TravelAnswerCreateButtonComponent } from "#/features/travel-ask/component/travel-answer-create-button-component";
import { TravelAnswerListComponent } from "#/features/travel-ask/component/travel-answer-list-component";
import { TravelAskDetailCardComponent } from "#/features/travel-ask/component/travel-ask-detail-card-component";
import { orpc } from "#/orpc/client";

export function TravelAskEditPage({ id }: { id: string }) {
	const query = useSuspenseQuery(
		orpc.travelAsk.getTravelAskById.queryOptions({ input: { id } }),
	);

	return (
		<>
			<Button
				render={(props) => <Link to="/admin/travel-ask/list" {...props} />}
			>
				<HugeiconsIcon icon={ArrowLeft01Icon} data-icon="inline-start" />
				返回提问列表
			</Button>
			<TravelAskDetailCardComponent travelAsk={query.data} />
			<TravelAnswerCreateButtonComponent askId={query.data.id} />
			<TravelAnswerListComponent askId={query.data.id} />
		</>
	);
}
