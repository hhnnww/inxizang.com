import {
	createFileRoute,
	isRedirect,
	Outlet,
	redirect,
} from "@tanstack/react-router";
import { AdminLayoutComponent } from "#/features/admin/component/admin-layout-component";
import { orpc } from "#/orpc/client";

export const Route = createFileRoute("/admin")({
	beforeLoad: async ({ context }) => {
		try {
			const session = await context.queryClient.query(
				orpc.auth.getSession.queryOptions(),
			);

			if (!session.isAdmin) {
				throw redirect({ to: "/login" });
			}

			return { session };
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}

			throw redirect({ to: "/login" });
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<AdminLayoutComponent>
			<Outlet />
		</AdminLayoutComponent>
	);
}
