import { useQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import {
	Card,
	CardContent,
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
import { TravelAnswerDeleteButtonComponent } from "#/features/travel-ask/component/travel-answer-delete-button-component";
import { TravelAnswerEditFormComponent } from "#/features/travel-ask/component/travel-answer-edit-form-component";
import { TravelImageAttachmentComponent } from "#/features/travel-ask/component/travel-image-attachment-component";
import { TravelReplyListComponent } from "#/features/travel-ask/component/travel-reply-list-component";
import { orpc } from "#/orpc/client";

export function TravelAnswerListComponent({ askId }: { askId: string }) {
	const query = useQuery(
		orpc.travelAsk.getTravelAskById.queryOptions({ input: { id: askId } }),
	);
	const items = query.data?.answers ?? [];

	if (query.isPending) {
		return (
			<div className="flex w-full flex-col gap-2">
				<Skeleton className="h-24 w-full" />
				<Skeleton className="h-24 w-full" />
			</div>
		);
	}

	if (items.length === 0) {
		return (
			<Empty>
				<EmptyHeader>
					<EmptyTitle>暂无回答</EmptyTitle>
					<EmptyDescription>该提问还没有任何回答。</EmptyDescription>
				</EmptyHeader>
			</Empty>
		);
	}

	return (
		<>
			{items.map((item, index) => (
				<Fragment key={item.id}>
					<Card className="w-full min-w-0" size="sm">
						<CardHeader>
							<CardTitle>回答 {index + 1}</CardTitle>
						</CardHeader>
						<CardContent className="flex min-w-0 flex-col gap-3">
							<p className="whitespace-pre-wrap">
								{item.content || "暂无回答内容"}
							</p>
							<div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground text-sm">
								<span>作者：{item.author}</span>
								<span>地点：{item.address ?? "-"}</span>
							</div>
							<div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground text-sm">
								<span>浏览：{item.views}</span>
								<span>点赞：{item.like}</span>
								<span>评分：{item.star}</span>
							</div>
							<TravelImageAttachmentComponent
								target={{ type: "answer", id: item.id }}
								images={item.images}
							/>
						</CardContent>
						<CardFooter className="justify-start gap-2">
							<TravelAnswerEditFormComponent
								defaultValues={{
									id: item.id,
									title: item.title,
									content: item.content,
									author: item.author,
									address: item.address,
									star: item.star,
									like: item.like,
									views: item.views,
								}}
							/>
							<TravelAnswerDeleteButtonComponent id={item.id} />
						</CardFooter>
					</Card>
					<TravelReplyListComponent answerId={item.id} items={item.replies} />
				</Fragment>
			))}
		</>
	);
}
