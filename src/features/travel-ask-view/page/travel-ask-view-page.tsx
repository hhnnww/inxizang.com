import { TravelAskViewDetailComponent } from "#/features/travel-ask-view/component/travel-ask-view-detail-component";

export function TravelAskViewPage({ id }: { id: string }) {
	return (
		<div className="min-h-screen w-full bg-[#f8f8f8]">
			<div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col gap-4 py-10 lg:py-20 ">
				<TravelAskViewDetailComponent id={id} />
			</div>
		</div>
	);
}
