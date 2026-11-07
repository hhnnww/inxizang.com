import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "#/components/ui/dialog";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "#/components/ui/empty";
import { Skeleton } from "#/components/ui/skeleton";
import { formatFileSize } from "#/lib/format-file-size";
import { orpc } from "#/orpc/client";
import { ImageDeleteButtonComponent } from "./image-delete-button-component";
import { ImageEditButtonComponent } from "./image-edit-button-component";
import { getImageVariantUrl } from "./image-variant";

export function ImageListComponent({ page }: { page: number }) {
	const query = useQuery(
		orpc.image.getImageList.queryOptions({ input: { page, pageSize: 20 } }),
	);
	const items = query.data?.items ?? [];
	const [preview, setPreview] = useState<{ id: string; name: string } | null>(
		null,
	);

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
		<div className="grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-3">
			{items.map((item) => (
				<Card key={item.id} className="gap-3 pt-0">
					<div className="aspect-video w-full overflow-hidden">
						<button
							type="button"
							className="size-full cursor-zoom-in"
							onClick={() => setPreview({ id: item.id, name: item.name })}
							onKeyDown={(event) => {
								if (event.key === "Enter" || event.key === " ") {
									event.preventDefault();
									setPreview({ id: item.id, name: item.name });
								}
							}}
						>
							<img
								src={getImageVariantUrl(item.id, "sm")}
								alt={item.name}
								loading="lazy"
								className="size-full object-cover"
							/>
						</button>
					</div>
					<CardHeader className="px-4">
						<CardTitle className="truncate">{item.name}</CardTitle>
						<CardDescription className="truncate text-xs">
							{new Date(item.createdAt).toLocaleString("zh-TW")}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex flex-row gap-3 text-xs text-muted-foreground">
							<span>小图 {formatFileSize(item.smsizeSize)}</span>
							<span>大图 {formatFileSize(item.lgsizeSize)}</span>
							<span>原图 {formatFileSize(item.orisizeSize)}</span>
						</div>
					</CardContent>
					<CardFooter className="justify-end gap-2">
						<ImageEditButtonComponent id={item.id} name={item.name} />
						<ImageDeleteButtonComponent id={item.id} />
					</CardFooter>
				</Card>
			))}

			<Dialog
				open={preview !== null}
				onOpenChange={(open) => {
					if (!open) {
						setPreview(null);
					}
				}}
			>
				<DialogContent className="flex max-h-[92vh] w-auto sm:max-w-[92vw] flex-col items-center gap-3">
					<DialogHeader className="w-full">
						<DialogTitle className="truncate">{preview?.name}</DialogTitle>
					</DialogHeader>
					{preview ? (
						<img
							src={getImageVariantUrl(preview.id, "lg")}
							alt={preview.name}
							className="max-h-[78vh] max-w-full object-contain"
						/>
					) : null}
				</DialogContent>
			</Dialog>
		</div>
	);
}
