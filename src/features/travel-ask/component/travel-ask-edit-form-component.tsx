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
import { FieldGroup, FieldLegend, FieldSet } from "#/components/ui/field";
import { useAppForm } from "#/hooks/form";
import { orpc } from "#/orpc/client";

import { TravelAskUpdateErrorDialogComponent } from "./travel-ask-update-error-dialog-component";

type TravelAskEditFormValues = {
	id: string;
	title: string;
	content: string;
	author: string;
	address: string | null;
	star: number;
	like: number;
	views: number;
};

export function TravelAskEditFormComponent({
	defaultValues,
}: {
	defaultValues: TravelAskEditFormValues;
}) {
	const queryClient = useQueryClient();
	const [open, setOpen] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);

	const updateTravelAskMutation = useMutation(
		orpc.travelAsk.updateTravelAsk.mutationOptions({
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: orpc.travelAsk.key(),
				});
			},
		}),
	);

	const form = useAppForm({
		defaultValues: {
			title: defaultValues.title,
			content: defaultValues.content,
			author: defaultValues.author,
			address: defaultValues.address ?? "",
			star: defaultValues.star,
			like: defaultValues.like,
			views: defaultValues.views,
		},
		onSubmit: async ({ value }) => {
			try {
				await updateTravelAskMutation.mutateAsync({
					id: defaultValues.id,
					title: value.title,
					content: value.content,
					author: value.author,
					address: value.address === "" ? null : value.address,
					star: value.star,
					like: value.like,
					views: value.views,
				});
				setDialogOpen(false);
			} catch {
				setOpen(true);
			}
		},
	});

	return (
		<>
			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogTrigger
					render={
						<Button>
							<HugeiconsIcon icon={Pen01Icon} data-icon="inline-start" />
							编辑
						</Button>
					}
				/>
				<DialogContent className="sm:max-w-xl">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							void form.handleSubmit();
						}}
						className="flex flex-col gap-4"
					>
						<DialogHeader>
							<DialogTitle>编辑提问</DialogTitle>
							<DialogDescription>修改该条旅游提问的信息。</DialogDescription>
						</DialogHeader>
						<FieldGroup>
							<form.AppField
								name="title"
								validators={{
									onBlur: z.string().min(1, "标题不能为空"),
									onChange: z.string().min(1, "标题不能为空"),
								}}
							>
								{(field) => (
									<field.InputField label="标题" placeholder="请输入标题" />
								)}
							</form.AppField>
							<FieldGroup className="grid grid-cols-2 gap-3">
								<form.AppField
									name="author"
									validators={{
										onBlur: z.string().min(1, "作者不能为空"),
										onChange: z.string().min(1, "作者不能为空"),
									}}
								>
									{(field) => (
										<field.InputField
											label="作者"
											placeholder="请输入作者名称"
										/>
									)}
								</form.AppField>
								<form.AppField
									name="address"
									validators={{
										onBlur: z.string().min(1, "地点不能为空"),
										onChange: z.string().min(1, "地点不能为空"),
									}}
								>
									{(field) => (
										<field.InputField label="地点" placeholder="请输入地点" />
									)}
								</form.AppField>
							</FieldGroup>
							<form.AppField
								name="content"
								validators={{
									onBlur: z.string().min(1, "内容不能为空"),
									onChange: z.string().min(1, "内容不能为空"),
								}}
							>
								{(field) => (
									<field.TextareaField
										label="内容"
										placeholder="请输入提问内容"
									/>
								)}
							</form.AppField>
							<FieldSet>
								<FieldLegend variant="label">统计数据</FieldLegend>
								<FieldGroup className="grid grid-cols-3 gap-3">
									<form.AppField
										name="views"
										validators={{
											onBlur: z.number().int().min(0, "浏览数不能小于 0"),
											onChange: z.number().int().min(0, "浏览数不能小于 0"),
										}}
									>
										{(field) => (
											<field.InputField
												label="浏览"
												type="number"
												min={0}
												placeholder="0"
											/>
										)}
									</form.AppField>
									<form.AppField
										name="like"
										validators={{
											onBlur: z.number().int().min(0, "点赞数不能小于 0"),
											onChange: z.number().int().min(0, "点赞数不能小于 0"),
										}}
									>
										{(field) => (
											<field.InputField
												label="点赞"
												type="number"
												min={0}
												placeholder="0"
											/>
										)}
									</form.AppField>
									<form.AppField
										name="star"
										validators={{
											onBlur: z.number().int().min(0, "评分不能小于 0"),
											onChange: z.number().int().min(0, "评分不能小于 0"),
										}}
									>
										{(field) => (
											<field.InputField
												label="评分"
												type="number"
												min={0}
												placeholder="0"
											/>
										)}
									</form.AppField>
								</FieldGroup>
							</FieldSet>
						</FieldGroup>
						<DialogFooter>
							<form.AppForm>
								<form.SubmitButton label="保存" />
							</form.AppForm>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
			<TravelAskUpdateErrorDialogComponent open={open} onOpenChange={setOpen} />
		</>
	);
}
