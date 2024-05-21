import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { InputWrapper } from "./style";

interface IInputColor<FormType extends FieldValues> {
  control: Control<FormType>;
  name: Path<FormType>;
  id?: string;
  label: string;
  type?: string;
  placeholder?: string;
}

export default function InputColor<FormType extends FieldValues>({
  control,
  name,
  id,
  label,
}: IInputColor<FormType>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, formState: { errors } }) => (
        <InputWrapper>
          <input
            type="color"
            {...field}
            value={field.value || ""}
            id={id || name}
          />
          <label htmlFor={id || name}>{label}</label>
        </InputWrapper>
      )}
    />
  );
}
