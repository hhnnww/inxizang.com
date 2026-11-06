import { EyeIcon, HeartIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { TravelAskViewAuthorComponent } from "#/features/travel-ask-view/component/travel-ask-view-author-component";

function formatDate(value: Date | string) {
	return new Date(value).toLocaleDateString("zh-TW");
}

export function TravelAskViewAskComponent({
	travelAsk,
}: {
	travelAsk: {
		id: string;
		title: string;
		content: string;
		author: string;
		address: string | null;
		star: number;
		like: number;
		views: number;
		createdAt: Date | string;
	};
}) {
	const [like, setLike] = useState(travelAsk.like);

	return (
		<div className="flex w-full min-w-0 flex-col gap-8">
			<h1 className="font-semibold text-[26px] leading-[1.18] tracking-tight sm:text-[32px]">
				{travelAsk.title || "暂无提问标题"}
			</h1>

			<div className="flex w-full min-w-0 flex-col gap-5">
				<div className="flex min-w-0 flex-col gap-4">
					<div className="flex min-w-0 items-center gap-3">
						<TravelAskViewAuthorComponent author={travelAsk.author} />
						<div className="flex min-w-0 flex-col">
							<span className="truncate font-semibold text-[16px]">
								{travelAsk.author}
							</span>
							<span className="text-[14px]">
								{travelAsk.address ? `${travelAsk.address} · ` : ""}
								{formatDate(travelAsk.createdAt)}
							</span>
						</div>
					</div>

					<p className="whitespace-pre-wrap wrap-break-word text-[16px] leading-[1.9]">
						{travelAsk.content || "暂无提问内容"}
					</p>

					<div className="flex flex-wrap items-center justify-between gap-4 text-[14px]">
						<span className="inline-flex items-center gap-1">
							<HugeiconsIcon icon={EyeIcon} size={16} />
							浏览 {travelAsk.views}
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
				</div>
			</div>
		</div>
	);
}
