import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "#/components/ui/button";
import { orpc } from "#/orpc/client";

export function TravelReplyCreateButtonComponent({
	answerId,
}: {
	answerId: string;
}) {
	const queryClient = useQueryClient();

	const createTravelReplyMutation = useMutation(
		orpc.travelAsk.createTravelReply.mutationOptions({
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: orpc.travelAsk.key(),
				});
			},
		}),
	);

	return (
		<div className="pl-40">
			<Button
				disabled={createTravelReplyMutation.isPending}
				onClick={() => {
					createTravelReplyMutation.mutate({ answerId });
				}}
			>
				<HugeiconsIcon icon={Add01Icon} data-icon="inline-start" />
				新建回复
			</Button>
		</div>
	);
}
