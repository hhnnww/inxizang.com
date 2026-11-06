import { createFileRoute } from "@tanstack/react-router";
import { TravelAskViewPage } from "#/features/travel-ask-view/page/travel-ask-view-page";

export const Route = createFileRoute("/travel-ask/view/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();

	return <TravelAskViewPage id={id} />;
}
