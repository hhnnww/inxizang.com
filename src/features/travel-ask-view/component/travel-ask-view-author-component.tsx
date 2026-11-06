export function TravelAskViewAuthorComponent({
	author,
	size = "md",
}: {
	author: string;
	size?: "sm" | "md" | "lg";
}) {
	const boxSize = {
		sm: "size-10 text-sm",
		md: "size-12 text-base",
		lg: "size-14 text-lg",
	}[size];

	return (
		<div
			className={`flex ${boxSize} shrink-0 items-center justify-center rounded-full bg-gray-100 font-semibold`}
		>
			{author.slice(0, 1).toUpperCase()}
		</div>
	);
}
