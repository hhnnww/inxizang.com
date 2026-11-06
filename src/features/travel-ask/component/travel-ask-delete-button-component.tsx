import { Delete02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "#/components/ui/alert-dialog";
import { Button } from "#/components/ui/button";
import { orpc } from "#/orpc/client";

export function TravelAskDeleteButtonComponent({ id }: { id: string }) {
	const queryClient = useQueryClient();
	const [open, setOpen] = useState(false);

	const deleteTravelAskMutation = useMutation(
		orpc.travelAsk.deleteTravelAsk.mutationOptions({
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: orpc.travelAsk.key(),
				});
				setOpen(false);
			},
		}),
	);

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger
				render={
					<Button variant="destructive" size="sm">
						<HugeiconsIcon icon={Delete02Icon} data-icon="inline-start" />
						删除
					</Button>
				}
			/>
			<AlertDialogContent size="sm">
				<AlertDialogHeader>
					<AlertDialogTitle>确认删除提问？</AlertDialogTitle>
					<AlertDialogDescription>
						删除后不可恢复，该提问及其回答、回复将一并被删除。
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={deleteTravelAskMutation.isPending}>
						取消
					</AlertDialogCancel>
					<Button
						variant="destructive"
						disabled={deleteTravelAskMutation.isPending}
						onClick={() => {
							deleteTravelAskMutation.mutate({ id });
						}}
					>
						<HugeiconsIcon icon={Delete02Icon} data-icon="inline-start" />
						删除
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
