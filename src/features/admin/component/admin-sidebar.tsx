import {
	Home04Icon,
	Image01Icon,
	MessageQuestionIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link, linkOptions } from "@tanstack/react-router";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "#/components/ui/sidebar";
import { LogoutButton } from "#/features/auth/component/logout-button";

const NAV_GROUPS = [
	{
		label: "概览",
		items: [
			{ label: "概览", link: linkOptions({ to: "/admin" }), icon: Home04Icon },
		],
	},
	{
		label: "旅游问答",
		items: [
			{
				label: "问答列表",
				link: linkOptions({ to: "/admin/travel-ask/list" }),
				icon: MessageQuestionIcon,
			},
		],
	},
	{
		label: "素材管理",
		items: [
			{
				label: "图片列表",
				link: linkOptions({
					to: "/admin/image/list/$page",
					params: { page: "1" },
				}),
				icon: Image01Icon,
			},
		],
	},
] as const;

export function AdminSidebar() {
	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<div className="flex items-center px-2 py-1 pt-4 font-semibold text-sm group-data-[collapsible=icon]:hidden">
					管理后台
				</div>
			</SidebarHeader>
			<SidebarContent>
				{NAV_GROUPS.map((group) => (
					<SidebarGroup key={group.label}>
						<SidebarGroupLabel>{group.label}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{group.items.map((item) => (
									<SidebarMenuItem key={item.label}>
										<Link {...item.link} activeOptions={{ exact: true }}>
											{(active) => (
												<SidebarMenuButton
													isActive={active.isActive}
													tooltip={item.label}
												>
													<HugeiconsIcon icon={item.icon} />
													<span>{item.label}</span>
												</SidebarMenuButton>
											)}
										</Link>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarFooter>
				<LogoutButton />
			</SidebarFooter>
		</Sidebar>
	);
}
