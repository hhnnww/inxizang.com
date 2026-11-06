export type ImageVariant = "sm" | "lg" | "ori";

export const IMAGE_VARIANT_WIDTH = {
	sm: 800,
	lg: 1600,
} as const;

export function getImageVariantKey(id: string, variant: ImageVariant) {
	return `image/${id}/${variant}.webp`;
}

export function getImageVariantUrl(id: string, variant: ImageVariant) {
	return `/image-view/${id}/${variant}`;
}
