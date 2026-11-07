export function formatFileSize(bytes: number, decimals = 1) {
	if (!Number.isFinite(bytes) || bytes < 0) {
		return "-";
	}

	if (bytes === 0) {
		return "0 B";
	}

	const units = ["B", "KB", "MB", "GB", "TB", "PB"] as const;
	const index = Math.min(
		Math.floor(Math.log(bytes) / Math.log(1024)),
		units.length - 1,
	);
	const value = bytes / 1024 ** index;

	if (index === 0) {
		return `${bytes} B`;
	}

	return `${value.toFixed(decimals)} ${units[index]}`;
}
