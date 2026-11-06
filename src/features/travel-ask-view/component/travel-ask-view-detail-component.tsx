import { useSuspenseQuery } from "@tanstack/react-query";
import { Separator } from "#/components/ui/separator";
import { TravelAskViewAnswerComponent } from "#/features/travel-ask-view/component/travel-ask-view-answer-component";
import { TravelAskViewAskComponent } from "#/features/travel-ask-view/component/travel-ask-view-ask-component";
import { orpc } from "#/orpc/client";

export function TravelAskViewDetailComponent({ id }: { id: string }) {
	const query = useSuspenseQuery(
		orpc.travelAskView.getTravelAskById.queryOptions({ input: { id } }),
	);
	const travelAsk = query.data;

	return (
		<div className="flex w-full min-w-0 flex-col gap-12">
			<TravelAskViewAskComponent travelAsk={travelAsk} />

			<Separator />

			<div className="flex w-full min-w-0 flex-col gap-16">
				<h2 className="font-semibold text-[22px] leading-[1.3]">
					{travelAsk.answers.length} 条回答
				</h2>

				{travelAsk.answers.length === 0 ? (
					<p className="text-[14px] text-gray-500">还没有回答</p>
				) : (
					travelAsk.answers.map((answer, index) => (
						<div
							key={answer.id}
							className="flex w-full min-w-0 flex-col gap-16"
						>
							<TravelAskViewAnswerComponent answer={answer} />
							{index < travelAsk.answers.length - 1 ? <Separator /> : null}
						</div>
					))
				)}
			</div>
		</div>
	);
}
