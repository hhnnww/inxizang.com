import { ScrollArea, ScrollBar } from "#/components/ui/scroll-area";
import { getImageVariantUrl } from "#/features/image/component/image-variant";

type TravelImage = {
	id: string;
	name: string;
};

export function TravelImageAttachmentComponent({
	images,
	showCover = false,
}: {
	images?: TravelImage[];
	showCover?: boolean;
}) {
	const list = images ?? [];

	if (list.length === 0) {
		return null;
	}

	if (showCover) {
		const cover = list[0];

		return (
			<div className="flex w-full min-w-0 flex-col gap-2">
				<div className="flex aspect-3/2 max-h-115 w-full min-w-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
					<img
						src={getImageVariantUrl(cover.id, "lg")}
						alt={cover.name}
						className="h-full w-full object-cover"
					/>
				</div>
			</div>
		);
	}

	return (
		<div className="flex w-full min-w-0 flex-col gap-4">
			<ScrollArea className="w-full max-w-full">
				<div className="flex w-max gap-2 pb-3">
					{list.map((item) => (
						<div key={item.id} className="w-32 shrink-0">
							<div className="aspect-4/3 w-full overflow-hidden rounded-lg bg-gray-100">
								<img
									src={getImageVariantUrl(item.id, "sm")}
									alt={item.name}
									className="h-full w-full object-cover"
								/>
							</div>
						</div>
					))}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</div>
	);
}
