import {
	TravelAskViewItemComponent,
	type TravelAskViewReplyItem,
} from "#/features/travel-ask-view/component/travel-ask-view-item-component";
import { TravelAskViewReplyComponent } from "#/features/travel-ask-view/component/travel-ask-view-reply-component";

export function TravelAskViewAnswerComponent({
	answer,
}: {
	answer: TravelAskViewReplyItem & {
		replies: TravelAskViewReplyItem[];
	};
}) {
	return (
		<TravelAskViewItemComponent
			item={answer}
			size="md"
			emptyText="暂无回答内容"
		>
			<div className="mt-8 pl-10 lg:pl-20">
				<TravelAskViewReplyComponent items={answer.replies} />
			</div>
		</TravelAskViewItemComponent>
	);
}
