import { LoaderIcon, SentIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { Button } from "#/components/ui/button";
import { useFormContext } from "#/hooks/form-context";

export function SubmitButton({
	label,
	icon = SentIcon,
	className,
}: {
	label: string;
	icon?: IconSvgElement;
	className?: string;
}) {
	const form = useFormContext();

	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => (
				<Button type="submit" disabled={isSubmitting} className={className}>
					{isSubmitting ? (
						<HugeiconsIcon icon={LoaderIcon} data-icon="inline-start" />
					) : (
						<HugeiconsIcon icon={icon} data-icon="inline-start" />
					)}
					{label}
				</Button>
			)}
		</form.Subscribe>
	);
}
