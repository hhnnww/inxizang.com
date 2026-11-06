import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import type { TravelAsk } from "#/db/travel-schema";
import { TravelAskEditFormComponent } from "#/features/travel-ask/component/travel-ask-edit-form-component";

export function TravelAskDetailCardComponent({
	travelAsk,
}: {
	travelAsk: TravelAsk;
}) {
	return (
		<Card className="w-full" size="sm">
			<CardHeader>
				<CardTitle>{travelAsk.title || "暂无提问标题"}</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-3">
				<p className="whitespace-pre-wrap">
					{travelAsk.content || "暂无提问内容"}
				</p>
				<div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground text-sm">
					<span>作者：{travelAsk.author}</span>
					<span>地点：{travelAsk.address ?? "-"}</span>
				</div>
				<div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground text-sm">
					<span>浏览：{travelAsk.views}</span>
					<span>点赞：{travelAsk.like}</span>
					<span>评分：{travelAsk.star}</span>
				</div>
			</CardContent>
			<CardFooter className="justify-start gap-2">
				<TravelAskEditFormComponent
					defaultValues={{
						id: travelAsk.id,
						title: travelAsk.title,
						content: travelAsk.content,
						author: travelAsk.author,
						address: travelAsk.address,
						star: travelAsk.star,
						like: travelAsk.like,
						views: travelAsk.views,
					}}
				/>
			</CardFooter>
		</Card>
	);
}
