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

export function TravelReplyDeleteButtonComponent({ id }: { id: string }) {
	const queryClient = useQueryClient();
	const [open, setOpen] = useState(false);

	const deleteTravelReplyMutation = useMutation(
		orpc.travelAsk.deleteTravelReply.mutationOptions({
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
					<Button size="sm" variant="destructive">
						<HugeiconsIcon icon={Delete02Icon} data-icon="inline-start" />
						删除
					</Button>
				}
			/>
			<AlertDialogContent size="sm">
				<AlertDialogHeader>
					<AlertDialogTitle>确认删除回复？</AlertDialogTitle>
					<AlertDialogDescription>
						删除后不可恢复，该回复将被永久删除。
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={deleteTravelReplyMutation.isPending}>
						取消
					</AlertDialogCancel>
					<Button
						variant="destructive"
						disabled={deleteTravelReplyMutation.isPending}
						onClick={() => {
							deleteTravelReplyMutation.mutate({ id });
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
