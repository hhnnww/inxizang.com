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

export function ImageDeleteButtonComponent({ id }: { id: string }) {
	const queryClient = useQueryClient();
	const [open, setOpen] = useState(false);

	const deleteImageMutation = useMutation(
		orpc.image.deleteImage.mutationOptions({
			onSuccess: async () => {
				await queryClient.invalidateQueries({ queryKey: orpc.image.key() });
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
					<AlertDialogTitle>确认删除图片？</AlertDialogTitle>
					<AlertDialogDescription>
						删除后不可恢复，该图片的所有尺寸文件将一并被删除。
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={deleteImageMutation.isPending}>
						取消
					</AlertDialogCancel>
					<Button
						variant="destructive"
						disabled={deleteImageMutation.isPending}
						onClick={() => {
							deleteImageMutation.mutate({ id });
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
