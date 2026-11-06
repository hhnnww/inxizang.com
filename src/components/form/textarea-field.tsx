import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "#/components/ui/field";
import { Textarea } from "#/components/ui/textarea";
import { useFieldContext } from "#/hooks/form-context";

export function TextareaField({
	label,
	placeholder,
	description,
}: {
	label: string;
	placeholder?: string;
	description?: string;
}) {
	const field = useFieldContext<string>();
	const { isTouched, isValid, errors } = field.state.meta;
	const isInvalid = isTouched && !isValid;

	return (
		<Field data-invalid={isInvalid}>
			<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
			<Textarea
				id={field.name}
				name={field.name}
				value={field.state.value}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value)}
				aria-invalid={isInvalid}
				placeholder={placeholder}
				className="min-h-30"
			/>
			{description && <FieldDescription>{description}</FieldDescription>}
			{isInvalid && <FieldError errors={errors} />}
		</Field>
	);
}
