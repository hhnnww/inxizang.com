import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "#/components/ui/field";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "#/components/ui/select";
import { useFieldContext } from "#/hooks/form-context";

export function SelectField({
	label,
	placeholder,
	description,
	options,
}: {
	label: string;
	placeholder?: string;
	description?: string;
	options: Array<{ value: string; label: string }>;
}) {
	const field = useFieldContext<string>();
	const { isTouched, isValid, errors } = field.state.meta;
	const isInvalid = isTouched && !isValid;

	return (
		<Field orientation="responsive" data-invalid={isInvalid}>
			<FieldContent>
				<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
				{description && <FieldDescription>{description}</FieldDescription>}
				{isInvalid && <FieldError errors={errors} />}
			</FieldContent>
			<Select
				name={field.name}
				value={field.state.value}
				items={options}
				onValueChange={(value) => field.handleChange(value ?? "")}
			>
				<SelectTrigger
					id={field.name}
					aria-invalid={isInvalid}
					className="min-w-30"
				>
					<SelectValue placeholder={placeholder ?? "Select"} />
				</SelectTrigger>
				<SelectContent alignItemWithTrigger={false}>
					<SelectGroup>
						{options.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</Field>
	);
}
