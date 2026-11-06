import { StarIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { TravelImageAttachmentComponent } from "#/features/travel-ask/component/travel-image-attachment-component";
import { TravelReplyCreateButtonComponent } from "#/features/travel-ask/component/travel-reply-create-button-component";
import { TravelReplyDeleteButtonComponent } from "#/features/travel-ask/component/travel-reply-delete-button-component";
import { TravelReplyEditFormComponent } from "#/features/travel-ask/component/travel-reply-edit-form-component";

function formatDate(value: Date | string) {
	return new Date(value).toLocaleString("zh-TW");
}

function StarRating({ value }: { value: number }) {
	return (
		<span className="inline-flex items-center gap-0.5">
			{Array.from({ length: 5 }).map((_, index) => (
				<HugeiconsIcon
					key={index.toString()}
					icon={StarIcon}
					size={12}
					className={index < value ? "text-[#FF5A5F]" : "text-gray-300"}
				/>
			))}
		</span>
	);
}

export function TravelReplyListComponent({
	answerId,
	items,
}: {
	answerId: string;
	items: {
		id: string;
		answerId: string;
		title: string;
		content: string;
		author: string;
		address: string | null;
		star: number;
		like: number;
		views: number;
		createdAt: Date | string;
		images: {
			id: string;
			name: string;
		}[];
	}[];
}) {
	return (
		<div className="flex w-full min-w-0 flex-col gap-3 border-gray-200 border-t pt-4">
			<div className="flex items-center justify-between">
				<span className="font-medium text-gray-900 text-sm">
					共 {items.length} 条回复
				</span>
				<TravelReplyCreateButtonComponent answerId={answerId} />
			</div>
			{items.length === 0 ? (
				<p className="text-gray-400 text-sm">还没有回复</p>
			) : (
				items.map((item) => (
					<div
						key={item.id}
						className="flex w-full min-w-0 gap-3 rounded-xl border border-gray-200 p-4 transition hover:border-gray-300"
					>
						<div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gray-100 font-medium text-gray-700 text-sm">
							{item.author.slice(0, 1).toUpperCase()}
						</div>
						<div className="flex min-w-0 flex-1 flex-col gap-2">
							<div className="flex flex-wrap items-center gap-x-2 gap-y-1">
								<span className="font-medium text-gray-900 text-sm">
									{item.author}
								</span>
								<span className="text-gray-400 text-xs">回复</span>
								<span className="text-gray-400 text-xs">
									{formatDate(item.createdAt)}
								</span>
								{item.address ? (
									<span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-500 text-xs">
										{item.address}
									</span>
								) : null}
							</div>
							<p className="whitespace-pre-wrap wrap-break-word text-gray-700 text-sm leading-relaxed">
								{item.content || "暂无回复内容"}
							</p>
							<TravelImageAttachmentComponent
								target={{ type: "reply", id: item.id }}
								images={item.images}
							/>
							<div className="flex flex-wrap items-center justify-between gap-2">
								<div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-gray-500 text-xs">
									<span>浏览 {item.views}</span>
									<span>点赞 {item.like}</span>
									<StarRating value={item.star} />
								</div>
								<div className="flex items-center gap-1">
									<TravelReplyEditFormComponent
										defaultValues={{
											id: item.id,
											answerId: item.answerId,
											title: item.title,
											content: item.content,
											author: item.author,
											address: item.address,
											star: item.star,
											like: item.like,
											views: item.views,
										}}
									/>
									<TravelReplyDeleteButtonComponent id={item.id} />
								</div>
							</div>
						</div>
					</div>
				))
			)}
		</div>
	);
}
