import { EyeIcon, HeartIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { TravelAskViewAuthorComponent } from "#/features/travel-ask-view/component/travel-ask-view-author-component";
import { TravelAskViewImageComponent } from "#/features/travel-ask-view/component/travel-ask-view-image-component";

function formatDate(value: Date | string) {
	return new Date(value).toLocaleDateString("zh-TW");
}

export type TravelAskViewReplyItem = {
	id: string;
	title: string;
	content: string;
	author: string;
	address: string | null;
	star: number;
	like: number;
	views: number;
	createdAt: Date | string;
	images?: { id: string; name: string }[];
};

export function TravelAskViewItemComponent({
	item,
	size = "md",
	emptyText,
	children,
}: {
	item: TravelAskViewReplyItem;
	size?: "sm" | "md";
	emptyText: string;
	children?: React.ReactNode;
}) {
	const [like, setLike] = useState(item.like);

	return (
		<div className="flex w-full min-w-0 flex-col gap-4">
			<div className="flex min-w-0 items-center gap-3">
				<TravelAskViewAuthorComponent author={item.author} size={size} />
				<div className="flex min-w-0 flex-col">
					<span className="truncate font-semibold text-[16px]">
						{item.author}
					</span>
					<span className="text-[14px]">
						{item.address ? `${item.address} · ` : ""}
						{formatDate(item.createdAt)}
					</span>
				</div>
			</div>

			<p className="whitespace-pre-wrap wrap-break-word text-[16px] leading-[1.9]">
				{item.content || emptyText}
			</p>

			<div className="flex flex-wrap items-center justify-between gap-4 text-[14px]">
				<span className="inline-flex items-center gap-1">
					<HugeiconsIcon icon={EyeIcon} size={16} />
					浏览 {item.views}
				</span>
				<button
					type="button"
					onClick={() => setLike((value) => value + 1)}
					className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 transition-colors hover:bg-gray-200"
				>
					<HugeiconsIcon icon={HeartIcon} size={16} />
					{like}
				</button>
			</div>

			<TravelAskViewImageComponent images={item.images} />

			{children}
		</div>
	);
}
