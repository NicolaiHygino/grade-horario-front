import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { InputWrapper, StyledInput } from "./style";

interface IInput<FormType extends FieldValues> {
  control: Control<FormType>;
  name: Path<FormType>;
  id?: string;
  label: string;
  type?: string;
  placeholder?: string;
}

export default function Input<FormType extends FieldValues>({
  control,
  id,
  label,
  name,
  placeholder,
  type,
}: IInput<FormType>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <InputWrapper>
          <label htmlFor={id || name}>{label}</label>
          <StyledInput
            {...field}
            value={field.value || ""}
            id={id || name}
            type={type || "text"}
            placeholder={placeholder}
          />
        </InputWrapper>
      )}
    />
  );
}
