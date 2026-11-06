import type { ReactNode } from "react";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "#/components/ui/sidebar";
import { AdminSidebar } from "#/features/admin/component/admin-sidebar";

export function AdminLayoutComponent({ children }: { children: ReactNode }) {
	return (
		<SidebarProvider>
			<AdminSidebar />
			<SidebarInset>
				<header className="flex h-12 items-center gap-2 border-b px-4">
					<SidebarTrigger />
				</header>

				<main className="w-full">
					<div className="container mx-auto flex flex-col items-start gap-10 p-10 lg:p-20">
						{children}
					</div>
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
