import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { RadioButtonsWrapper, StyledRadioButton } from "./style";

interface IRadioButton<FormType extends FieldValues> {
  control: Control<FormType>;
  name: Path<FormType>;
  options: { value: string; label: string }[];
}

export default function RadioButton<FormType extends FieldValues>({
  control,
  name,
  options,
}: IRadioButton<FormType>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <RadioButtonsWrapper>
          {options.map((option) => (
            <StyledRadioButton key={option.value}>
              <input
                type="radio"
                id={option.label}
                {...field}
                value={option.value}
                checked={field.value === option.value}
                name={name}
              />
              <label htmlFor={option.label}>{option.label}</label>
            </StyledRadioButton>
          ))}
        </RadioButtonsWrapper>
      )}
    />
  );
}
