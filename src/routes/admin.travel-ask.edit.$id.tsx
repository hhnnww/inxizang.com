import { createFileRoute } from "@tanstack/react-router";
import { TravelAskEditPage } from "#/features/travel-ask/page/travel-ask-edit-page";

export const Route = createFileRoute("/admin/travel-ask/edit/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();

	return <TravelAskEditPage id={id} />;
}
