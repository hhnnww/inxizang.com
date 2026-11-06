import { createFileRoute } from "@tanstack/react-router";
import { TravelAskListPage } from "#/features/travel-ask/page/travel-ask-list-page";

export const Route = createFileRoute("/admin/travel-ask/list")({
	component: RouteComponent,
});

function RouteComponent() {
	return <TravelAskListPage />;
}
