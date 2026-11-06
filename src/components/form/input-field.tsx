import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { useFieldContext } from "#/hooks/form-context";

export function InputField({
	label,
	placeholder,
	description,
	type,
	...inputProps
}: {
	label: string;
	placeholder?: string;
	description?: string;
} & Omit<
	React.ComponentProps<typeof Input>,
	"id" | "name" | "value" | "onChange" | "onBlur" | "aria-invalid"
>) {
	const field = useFieldContext<string | number>();
	const { isTouched, isValid, errors } = field.state.meta;
	const isInvalid = isTouched && !isValid;

	return (
		<Field data-invalid={isInvalid}>
			<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
			<Input
				id={field.name}
				name={field.name}
				value={field.state.value}
				onBlur={field.handleBlur}
				onChange={(e) => {
					if (type === "number") {
						field.handleChange(
							e.target.value === "" ? 0 : Number(e.target.value),
						);
						return;
					}
					field.handleChange(e.target.value);
				}}
				aria-invalid={isInvalid}
				placeholder={placeholder}
				type={type}
				{...inputProps}
			/>
			{description && <FieldDescription>{description}</FieldDescription>}
			{isInvalid && <FieldError errors={errors} />}
		</Field>
	);
}
