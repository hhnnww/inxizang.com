import { IMAGE_VARIANT_WIDTH } from "#/features/image/component/image-variant";

const WEBP_QUALITY = 0.85;

async function loadImageBitmap(file: File) {
	const bitmap = await createImageBitmap(file);

	return bitmap;
}

function drawToCanvas(
	bitmap: ImageBitmap,
	width: number,
	height: number,
): HTMLCanvasElement {
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;

	const context = canvas.getContext("2d");

	if (!context) {
		throw new Error("无法创建画布");
	}

	context.imageSmoothingEnabled = true;
	context.imageSmoothingQuality = "high";
	context.drawImage(bitmap, 0, 0, width, height);

	return canvas;
}

function canvasToBlob(canvas: HTMLCanvasElement) {
	return new Promise<Blob>((resolve, reject) => {
		canvas.toBlob(
			(blob) => {
				if (blob) {
					resolve(blob);
					return;
				}

				reject(new Error("图片转换失败"));
			},
			"image/webp",
			WEBP_QUALITY,
		);
	});
}

function getScaledSize(bitmap: ImageBitmap, maxWidth: number) {
	if (bitmap.width <= maxWidth) {
		return { width: bitmap.width, height: bitmap.height };
	}

	const ratio = maxWidth / bitmap.width;

	return {
		width: Math.round(maxWidth),
		height: Math.round(bitmap.height * ratio),
	};
}

export async function createImageVariants(file: File) {
	const bitmap = await loadImageBitmap(file);

	try {
		const smSize = getScaledSize(bitmap, IMAGE_VARIANT_WIDTH.sm);
		const lgSize = getScaledSize(bitmap, IMAGE_VARIANT_WIDTH.lg);

		const smBlob = await canvasToBlob(
			drawToCanvas(bitmap, smSize.width, smSize.height),
		);
		const lgBlob = await canvasToBlob(
			drawToCanvas(bitmap, lgSize.width, lgSize.height),
		);
		const oriBlob = await canvasToBlob(
			drawToCanvas(bitmap, bitmap.width, bitmap.height),
		);

		return {
			sm: new File([smBlob], "sm.webp", { type: "image/webp" }),
			lg: new File([lgBlob], "lg.webp", { type: "image/webp" }),
			ori: new File([oriBlob], "ori.webp", { type: "image/webp" }),
		};
	} finally {
		bitmap.close();
	}
}
