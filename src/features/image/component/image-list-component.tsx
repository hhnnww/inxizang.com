import { useQuery } from "@tanstack/react-query";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "#/components/ui/empty";
import { Skeleton } from "#/components/ui/skeleton";
import { orpc } from "#/orpc/client";
import { ImageDeleteButtonComponent } from "./image-delete-button-component";
import { ImageEditButtonComponent } from "./image-edit-button-component";
import { getImageVariantUrl } from "./image-variant";

export function ImageListComponent({ page }: { page: number }) {
	const query = useQuery(
		orpc.image.getImageList.queryOptions({ input: { page, pageSize: 20 } }),
	);
	const items = query.data?.items ?? [];

	if (query.isPending) {
		return (
			<div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
				<Skeleton className="h-64 w-full" />
				<Skeleton className="h-64 w-full" />
				<Skeleton className="h-64 w-full" />
			</div>
		);
	}

	if (items.length === 0) {
		return (
			<Card className="w-full">
				<CardContent>
					<Empty>
						<EmptyHeader>
							<EmptyTitle>暂无图片</EmptyTitle>
							<EmptyDescription>还没有任何图片数据。</EmptyDescription>
						</EmptyHeader>
					</Empty>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
			{items.map((item) => (
				<Card key={item.id} className="gap-3 pb-0">
					<div className="aspect-square w-full overflow-hidden bg-muted">
						<img
							src={getImageVariantUrl(item.id, "sm")}
							alt={item.name}
							loading="lazy"
							className="size-full object-cover"
						/>
					</div>
					<CardHeader className="px-4">
						<CardTitle className="truncate">{item.name}</CardTitle>
						<CardDescription className="truncate text-xs">
							{new Date(item.createdAt).toLocaleString("zh-TW")}
						</CardDescription>
					</CardHeader>
					<CardFooter className="justify-end gap-2">
						<ImageEditButtonComponent id={item.id} name={item.name} />
						<ImageDeleteButtonComponent id={item.id} />
					</CardFooter>
				</Card>
			))}
		</div>
	);
}
