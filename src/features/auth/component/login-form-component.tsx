import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import z from "zod";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "#/components/ui/alert-dialog";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { FieldGroup } from "#/components/ui/field";
import { useAppForm } from "#/hooks/form";
import { authClient } from "#/lib/auth-client";

export function LoginFormComponent() {
	const router = useRouter();
	const [open, setOpen] = useState(false);

	const form = useAppForm({
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			const { error: authError } = await authClient.signIn.email({
				email: value.email,
				password: value.password,
			});

			if (authError) {
				setOpen(true);
				return;
			}

			await router.invalidate();
			await router.navigate({ to: "/admin" });
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				void form.handleSubmit();
			}}
			className="w-full sm:max-w-md"
		>
			<Card>
				<CardHeader>
					<CardTitle>登录账号</CardTitle>
					<CardDescription>输入邮箱和密码以登录你的账号。</CardDescription>
				</CardHeader>
				<CardContent>
					<FieldGroup>
						<form.AppField
							name="email"
							validators={{
								onBlur: z.email("请输入有效的邮箱地址"),
								onChange: z.email("请输入有效的邮箱地址"),
							}}
						>
							{(field) => (
								<field.InputField
									label="邮箱"
									placeholder="you@example.com"
									type="email"
									autoComplete="email"
								/>
							)}
						</form.AppField>
						<form.AppField
							name="password"
							validators={{
								onBlur: z.string().min(8, "密码至少需要 8 个字符"),
								onChange: z.string().min(8, "密码至少需要 8 个字符"),
							}}
						>
							{(field) => (
								<field.InputField
									label="密码"
									placeholder="请输入密码"
									type="password"
									autoComplete="current-password"
								/>
							)}
						</form.AppField>
					</FieldGroup>
				</CardContent>
				<CardFooter>
					<form.AppForm>
						<form.SubmitButton label="登录" />
					</form.AppForm>
				</CardFooter>
			</Card>
			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogContent size="sm">
					<AlertDialogHeader>
						<AlertDialogTitle>登录失败</AlertDialogTitle>
						<AlertDialogDescription>账号或密码错误</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel variant="default">知道了</AlertDialogCancel>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</form>
	);
}
