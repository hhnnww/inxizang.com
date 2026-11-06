import { createFileRoute } from "@tanstack/react-router";
import { ImageListPage } from "#/features/image/page/image-list-page";

export const Route = createFileRoute("/admin/image/list/$page")({
	component: RouteComponent,
});

function RouteComponent() {
	const { page } = Route.useParams();

	return <ImageListPage page={page} />;
}
