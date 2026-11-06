import { Checkbox } from "#/components/ui/checkbox";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "#/components/ui/field";
import { useFieldContext } from "#/hooks/form-context";

export function CheckboxGroupField({
	label,
	description,
	options,
}: {
	label: string;
	description?: string;
	options: Array<{ value: string; label: string }>;
}) {
	const field = useFieldContext<string[]>();
	const { isTouched, isValid, errors } = field.state.meta;
	const isInvalid = isTouched && !isValid;

	return (
		<FieldSet>
			<FieldLegend variant="label">{label}</FieldLegend>
			{description && <FieldDescription>{description}</FieldDescription>}
			<FieldGroup data-slot="checkbox-group">
				{options.map((option) => {
					const id = `${field.name}-${option.value}`;
					return (
						<Field
							key={option.value}
							orientation="horizontal"
							data-invalid={isInvalid}
						>
							<Checkbox
								id={id}
								name={field.name}
								aria-invalid={isInvalid}
								checked={field.state.value.includes(option.value)}
								onCheckedChange={(checked) => {
									if (checked) {
										field.pushValue(option.value);
										return;
									}
									const index = field.state.value.indexOf(option.value);
									if (index > -1) {
										field.removeValue(index);
									}
								}}
							/>
							<FieldLabel htmlFor={id} className="font-normal">
								{option.label}
							</FieldLabel>
						</Field>
					);
				})}
			</FieldGroup>
			{isInvalid && <FieldError errors={errors} />}
		</FieldSet>
	);
}
