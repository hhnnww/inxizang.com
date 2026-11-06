export function randomNumber({
	minNumber,
	maxNumber,
}: {
	minNumber: number;
	maxNumber: number;
}) {
	const min = Math.min(minNumber, maxNumber);
	const max = Math.max(minNumber, maxNumber);

	return Math.floor(Math.random() * (max - min + 1)) + min;
}
