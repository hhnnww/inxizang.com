import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "#/components/ui/field";
import { Switch } from "#/components/ui/switch";
import { useFieldContext } from "#/hooks/form-context";

export function SwitchField({
	label,
	description,
}: {
	label: string;
	description?: string;
}) {
	const field = useFieldContext<boolean>();
	const { isTouched, isValid, errors } = field.state.meta;
	const isInvalid = isTouched && !isValid;

	return (
		<Field orientation="horizontal" data-invalid={isInvalid}>
			<FieldContent>
				<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
				{description && <FieldDescription>{description}</FieldDescription>}
				{isInvalid && <FieldError errors={errors} />}
			</FieldContent>
			<Switch
				id={field.name}
				name={field.name}
				checked={field.state.value}
				onCheckedChange={field.handleChange}
				aria-invalid={isInvalid}
			/>
		</Field>
	);
}
