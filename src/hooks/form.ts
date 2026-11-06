import { createFormHook } from "@tanstack/react-form";

import {
	CheckboxGroupField,
	InputField,
	RadioGroupField,
	SelectField,
	SubmitButton,
	SwitchField,
	TextareaField,
} from "../components/form";
import { fieldContext, formContext } from "./form-context";

export const { useAppForm, withForm } = createFormHook({
	fieldComponents: {
		CheckboxGroupField,
		InputField,
		RadioGroupField,
		SelectField,
		SwitchField,
		TextareaField,
	},
	formComponents: {
		SubmitButton,
	},
	fieldContext,
	formContext,
});
