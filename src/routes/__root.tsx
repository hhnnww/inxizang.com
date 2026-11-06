import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
	useRouterState,
} from "@tanstack/react-router";
import { TooltipProvider } from "#/components/ui/tooltip";
import { client } from "#/orpc/client";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

const THEME_INIT_SCRIPT = `(function(){try{var path=window.location.pathname;var root=document.documentElement;root.classList.remove('light','dark');if(path.indexOf('/admin')===0){root.classList.add('dark');root.removeAttribute('data-theme');root.style.colorScheme='dark';}else{root.classList.add('light');root.removeAttribute('data-theme');root.style.colorScheme='light';}}catch(e){}})();`;

let defaultAdminBootstrapPromise: Promise<void> | undefined;

function bootstrapDefaultAdmin() {
	defaultAdminBootstrapPromise ??= client.auth.createDefaultAdminUser().then(
		() => undefined,
		() => undefined,
	);

	return defaultAdminBootstrapPromise;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	beforeLoad: async () => {
		await bootstrapDefaultAdmin();
	},
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const isAdminRoute = useRouterState({
		select: (state) => state.location.pathname.startsWith("/admin"),
	});

	const theme = isAdminRoute ? "dark" : "light";

	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={`${theme} bg-background`}
			style={{ colorScheme: theme }}
		>
			<head>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: inline theme script must run before paint to prevent flash of wrong theme */}
				<script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
				<HeadContent />
			</head>
			<body className="bg-background font-sans text-foreground">
				<TooltipProvider>{children}</TooltipProvider>
				<Scripts />
			</body>
		</html>
	);
}
