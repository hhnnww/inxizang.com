import {
	TravelAskViewItemComponent,
	type TravelAskViewReplyItem,
} from "#/features/travel-ask-view/component/travel-ask-view-item-component";

export function TravelAskViewReplyComponent({
	items,
}: {
	items: TravelAskViewReplyItem[];
}) {
	return (
		<div className="flex w-full min-w-0 flex-col gap-16">
			{items.length === 0 ? (
				<p className="text-[14px]">还没有回复</p>
			) : (
				items.map((item) => (
					<TravelAskViewItemComponent
						key={item.id}
						item={item}
						size="sm"
						emptyText="暂无回复内容"
					/>
				))
			)}
		</div>
	);
}
