import { ImageAdd01Icon, ImageUpload01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import {
	Attachment,
	AttachmentContent,
	AttachmentDescription,
	AttachmentMedia,
	AttachmentTitle,
} from "#/components/ui/attachment";
import { Button } from "#/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "#/components/ui/dialog";
import { orpc } from "#/orpc/client";

import { createImageVariants } from "./image-compress";

export const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/avif",
	"image/gif",
];

type ImageItem = {
	id: string;
	name: string;
	previewUrl: string;
	status: "pending" | "success" | "failed";
};

export function getBaseName(fileName: string) {
	return fileName.replace(/\.[^.]+$/, "") || "未命名图片";
}

export function ImageCreateButtonComponent({
	onSuccess,
}: {
	onSuccess?: (item: { id: string; name: string }) => void | Promise<void>;
} = {}) {
	const queryClient = useQueryClient();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [items, setItems] = useState<ImageItem[]>([]);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [dragging, setDragging] = useState(false);

	const itemsRef = useRef<ImageItem[]>([]);
	itemsRef.current = items;

	const createImageMutation = useMutation(
		orpc.image.createImage.mutationOptions(),
	);

	useEffect(() => {
		return () => {
			for (const item of itemsRef.current) {
				URL.revokeObjectURL(item.previewUrl);
			}
		};
	}, []);

	function resetItems() {
		setItems((previous) => {
			for (const item of previous) {
				URL.revokeObjectURL(item.previewUrl);
			}

			return [];
		});
		setErrorMessage(null);
		setDragging(false);
	}

	function updateItem(id: string, patch: Partial<ImageItem>) {
		setItems((previous) =>
			previous.map((item) => (item.id === id ? { ...item, ...patch } : item)),
		);
	}

	async function uploadFile(file: File) {
		const id = crypto.randomUUID();
		const name = getBaseName(file.name);
		const previewUrl = URL.createObjectURL(file);

		let hasInvalid = false;

		if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
			hasInvalid = true;
		}

		setErrorMessage(hasInvalid ? "文件不是支持的图片格式" : null);

		if (hasInvalid) {
			setItems((previous) => [
				...previous,
				{ id, name, previewUrl, status: "failed" },
			]);
			return true;
		}

		setItems((previous) => [
			...previous,
			{ id, name, previewUrl, status: "pending" },
		]);

		try {
			const variants = await createImageVariants(file);

			await createImageMutation.mutateAsync({ id, name, ...variants });
			updateItem(id, { status: "success" });
			await queryClient.invalidateQueries({ queryKey: orpc.image.key() });

			if (onSuccess) {
				await onSuccess({ id, name });
			}

			return false;
		} catch {
			updateItem(id, { status: "failed" });
			setErrorMessage("部分图片上传失败，请重试");

			return true;
		}
	}

	function addFiles(files: File[]) {
		const tasks = files.map((file) => uploadFile(file));

		void Promise.all(tasks).then((results) => {
			const hasFailed = results.some((hasFailure) => hasFailure);

			if (!hasFailed) {
				handleOpenChange(false);
			}
		});
	}

	const addFilesRef = useRef<(files: File[]) => void>(() => {});
	addFilesRef.current = addFiles;

	useEffect(() => {
		if (!dialogOpen) {
			return;
		}

		const handlePaste = (event: ClipboardEvent) => {
			const files = Array.from(event.clipboardData?.files ?? []).filter(
				(file) => file.type.startsWith("image/"),
			);

			if (files.length > 0) {
				event.preventDefault();
				addFilesRef.current(files);
			}
		};

		window.addEventListener("paste", handlePaste);

		return () => {
			window.removeEventListener("paste", handlePaste);
		};
	}, [dialogOpen]);

	function handleOpenChange(open: boolean) {
		setDialogOpen(open);

		if (!open) {
			resetItems();
			createImageMutation.reset();
		}
	}

	return (
		<Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
			<DialogTrigger
				render={
					<Button>
						<HugeiconsIcon icon={ImageAdd01Icon} data-icon="inline-start" />
						新建图片
					</Button>
				}
			/>
			<DialogContent className="sm:max-w-2xl">
				<div className="flex flex-col gap-4">
					<DialogHeader>
						<DialogTitle>新建图片</DialogTitle>
						<DialogDescription>
							选择后立即自动上传，也可直接按 Ctrl+V 粘贴图片。
						</DialogDescription>
					</DialogHeader>

					<input
						ref={fileInputRef}
						type="file"
						multiple
						accept={ACCEPTED_IMAGE_TYPES.join(",")}
						className="sr-only"
						tabIndex={-1}
						onChange={(e) => {
							const files = Array.from(e.target.files ?? []);

							if (files.length > 0) {
								addFiles(files);
							}

							e.target.value = "";
						}}
					/>
					<button
						type="button"
						onClick={() => fileInputRef.current?.click()}
						onDragOver={(e) => {
							e.preventDefault();
							setDragging(true);
						}}
						onDragLeave={() => setDragging(false)}
						onDrop={(e) => {
							e.preventDefault();
							setDragging(false);

							const files = Array.from(e.dataTransfer.files);

							if (files.length > 0) {
								addFiles(files);
							}
						}}
						className="flex min-h-40 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-muted/40 p-6 text-center transition-colors hover:border-primary/60 hover:bg-muted/60 data-[dragging=true]:border-primary data-[dragging=true]:bg-primary/10"
						data-dragging={dragging}
					>
						<HugeiconsIcon
							icon={ImageUpload01Icon}
							className="size-10 text-muted-foreground"
						/>
						<span className="font-medium text-sm">点击选择图片上传</span>
						<span className="text-muted-foreground text-xs">
							支持多选、拖拽或 Ctrl+V 粘贴，选择后自动上传
						</span>
					</button>

					{items.length > 0 && (
						<div className="flex max-h-72 flex-col gap-2 overflow-y-auto">
							{items.map((item) => (
								<Attachment
									key={item.id}
									size="sm"
									state={
										item.status === "pending"
											? "uploading"
											: item.status === "success"
												? "done"
												: "error"
									}
									className="w-full"
								>
									<AttachmentMedia variant="image">
										<img src={item.previewUrl} alt={item.name} />
									</AttachmentMedia>
									<AttachmentContent>
										<AttachmentTitle>{item.name}</AttachmentTitle>
										<AttachmentDescription>
											{item.status === "pending"
												? "上传中..."
												: item.status === "success"
													? "已上传"
													: "上传失败"}
										</AttachmentDescription>
									</AttachmentContent>
								</Attachment>
							))}
						</div>
					)}
					{errorMessage && (
						<p className="text-destructive text-sm">{errorMessage}</p>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
