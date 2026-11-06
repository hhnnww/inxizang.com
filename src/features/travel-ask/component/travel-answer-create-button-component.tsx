import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "#/components/ui/button";
import { orpc } from "#/orpc/client";

export function TravelAnswerCreateButtonComponent({
	askId,
}: {
	askId: string;
}) {
	const queryClient = useQueryClient();

	const createTravelAnswerMutation = useMutation(
		orpc.travelAsk.createTravelAnswer.mutationOptions({
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: orpc.travelAsk.key(),
				});
			},
		}),
	);

	return (
		<Button
			disabled={createTravelAnswerMutation.isPending}
			onClick={() => {
				createTravelAnswerMutation.mutate({ askId });
			}}
		>
			<HugeiconsIcon icon={Add01Icon} data-icon="inline-start" />
			新建回答
		</Button>
	);
}
