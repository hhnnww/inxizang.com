import { TravelAskCreateButtonComponent } from "#/features/travel-ask/component/travel-ask-create-button-component";
import { TravelAskListComponent } from "#/features/travel-ask/component/travel-ask-list-component";

export function TravelAskListPage() {
	return (
		<>
			<h1 className="font-semibold text-xl">问答列表</h1>
			<TravelAskCreateButtonComponent />
			<TravelAskListComponent />
		</>
	);
}
