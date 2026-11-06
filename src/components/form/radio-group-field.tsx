import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldLabel,
	FieldLegend,
	FieldSet,
	FieldTitle,
} from "#/components/ui/field";
import { RadioGroup, RadioGroupItem } from "#/components/ui/radio-group";
import { useFieldContext } from "#/hooks/form-context";

export function RadioGroupField({
	label,
	description,
	options,
}: {
	label: string;
	description?: string;
	options: Array<{ value: string; title: string; description?: string }>;
}) {
	const field = useFieldContext<string>();
	const { isTouched, isValid, errors } = field.state.meta;
	const isInvalid = isTouched && !isValid;

	return (
		<FieldSet>
			<FieldLegend>{label}</FieldLegend>
			{description && <FieldDescription>{description}</FieldDescription>}
			<RadioGroup
				name={field.name}
				value={field.state.value}
				onValueChange={field.handleChange}
			>
				{options.map((option) => {
					const id = `${field.name}-${option.value}`;
					return (
						<FieldLabel key={option.value} htmlFor={id} className="font-normal">
							<Field orientation="horizontal" data-invalid={isInvalid}>
								<FieldContent>
									<FieldTitle>{option.title}</FieldTitle>
									{option.description && (
										<FieldDescription>{option.description}</FieldDescription>
									)}
								</FieldContent>
								<RadioGroupItem
									value={option.value}
									id={id}
									aria-invalid={isInvalid}
								/>
							</Field>
						</FieldLabel>
					);
				})}
			</RadioGroup>
			{isInvalid && <FieldError errors={errors} />}
		</FieldSet>
	);
}
