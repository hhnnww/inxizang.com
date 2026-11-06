import { Pen01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";
import { Button } from "#/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "#/components/ui/dialog";
import { FieldGroup } from "#/components/ui/field";
import { useAppForm } from "#/hooks/form";
import { orpc } from "#/orpc/client";

export function ImageEditButtonComponent({
	id,
	name,
}: {
	id: string;
	name: string;
}) {
	const queryClient = useQueryClient();
	const [open, setOpen] = useState(false);

	const updateImageNameMutation = useMutation(
		orpc.image.updateImageName.mutationOptions({
			onSuccess: async () => {
				await queryClient.invalidateQueries({ queryKey: orpc.image.key() });
				setOpen(false);
			},
		}),
	);

	const form = useAppForm({
		defaultValues: { name },
		onSubmit: async ({ value }) => {
			await updateImageNameMutation.mutateAsync({ id, name: value.name });
		},
	});

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger
				render={
					<Button variant="outline" size="sm">
						<HugeiconsIcon icon={Pen01Icon} data-icon="inline-start" />
						编辑
					</Button>
				}
			/>
			<DialogContent>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						void form.handleSubmit();
					}}
					className="flex flex-col gap-4"
				>
					<DialogHeader>
						<DialogTitle>编辑图片名称</DialogTitle>
						<DialogDescription>修改该图片的显示名称。</DialogDescription>
					</DialogHeader>
					<FieldGroup>
						<form.AppField
							name="name"
							validators={{
								onBlur: z.string().min(1, "名称不能为空"),
								onChange: z.string().min(1, "名称不能为空"),
							}}
						>
							{(field) => (
								<field.InputField label="名称" placeholder="请输入图片名称" />
							)}
						</form.AppField>
					</FieldGroup>
					<DialogFooter>
						<form.AppForm>
							<form.SubmitButton label="保存" />
						</form.AppForm>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
