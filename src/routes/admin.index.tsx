import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "#/features/admin/page/admin-page";

export const Route = createFileRoute("/admin/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <AdminPage />;
}
