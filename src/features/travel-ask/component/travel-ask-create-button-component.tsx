import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "#/components/ui/button";
import { orpc } from "#/orpc/client";

export function TravelAskCreateButtonComponent() {
	const queryClient = useQueryClient();

	const createTravelAskMutation = useMutation(
		orpc.travelAsk.createTravelAsk.mutationOptions({
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: orpc.travelAsk.key(),
				});
			},
		}),
	);

	return (
		<Button
			disabled={createTravelAskMutation.isPending}
			onClick={() => {
				createTravelAskMutation.mutate({});
			}}
		>
			<HugeiconsIcon icon={Add01Icon} data-icon="inline-start" />
			新建提问
		</Button>
	);
}
