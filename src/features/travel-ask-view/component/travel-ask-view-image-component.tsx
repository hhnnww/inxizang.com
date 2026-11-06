import { ScrollArea, ScrollBar } from "#/components/ui/scroll-area";

export type TravelAskViewImage = {
	id: string;
	name: string;
};

function imageUrl(id: string, variant: "sm" | "lg") {
	return `/image-view/${id}/${variant}`;
}

export function TravelAskViewImageComponent({
	images,
	showCover = false,
}: {
	images?: TravelAskViewImage[];
	showCover?: boolean;
}) {
	const list = images ?? [];

	if (list.length === 0) {
		return null;
	}

	if (showCover) {
		const cover = list[0];

		return (
			<div className="aspect-3/2 max-h-115 w-full min-w-0 overflow-hidden rounded-xl bg-gray-100">
				<img
					src={imageUrl(cover.id, "lg")}
					alt={cover.name}
					className="h-full w-full object-cover"
				/>
			</div>
		);
	}

	return (
		<ScrollArea className="w-full max-w-full">
			<div className="flex w-max gap-2 pb-3">
				{list.map((item) => (
					<div key={item.id} className="w-42 shrink-0">
						<div className="aspect-4/3 w-full overflow-hidden rounded-lg bg-gray-100">
							<img
								src={imageUrl(item.id, "sm")}
								alt={item.name}
								className="h-full w-full object-cover"
							/>
						</div>
					</div>
				))}
			</div>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
}
