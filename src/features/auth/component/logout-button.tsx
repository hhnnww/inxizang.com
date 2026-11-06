import { LogoutCircle01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "#/components/ui/sidebar";
import { Spinner } from "#/components/ui/spinner";
import { authClient } from "#/lib/auth-client";
import { orpc } from "#/orpc/client";

export function LogoutButton() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const signOutMutation = useMutation({
		mutationFn: async () => {
			await authClient.signOut();
		},
		onSuccess: async () => {
			queryClient.removeQueries({ queryKey: orpc.auth.key() });
			await navigate({ to: "/login", replace: true });
		},
	});

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton
					tooltip="退出登录"
					disabled={signOutMutation.isPending}
					onClick={() => {
						signOutMutation.mutate();
					}}
				>
					{signOutMutation.isPending ? (
						<Spinner data-icon="inline-start" />
					) : (
						<HugeiconsIcon icon={LogoutCircle01Icon} />
					)}
					<span>退出登录</span>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
