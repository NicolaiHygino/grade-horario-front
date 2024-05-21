import { Button, ButtonWrapper } from "./style";
import { EWeekDays } from "@/app/shared/components/Timetable/types/EWeekDays";
import Input from "@/app/shared/components/Input";
import RadioButton from "@/app/shared/components/RadioButton";
import { Control } from "react-hook-form";
import InputColor from "@/app/shared/components/InputColor";
import { IEvent } from "@/app/shared/components/Timetable/types/IEvents";
import { MouseEvent } from "react";

const WeekDaysOptions = Object.entries(EWeekDays).map(([key, value]) => ({
  value: key,
  label: value,
}));

interface IForm {
  control: Control<IEvent>;
  onSubmit: () => {};
  action: "edit" | "create";
}

export default function Form({ control, onSubmit, action }: IForm) {
  const formSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    onSubmit();
    event.preventDefault();
  };
  return (
    <form>
      <Input
        control={control}
        name="name"
        label="Título"
        placeholder="Escreva..."
        type="text"
      />
      <Input control={control} name="startTime" label="Início" type="time" />
      <Input control={control} name="endTime" label="Fim" type="time" />

      <RadioButton control={control} name="weekDay" options={WeekDaysOptions} />

      <InputColor control={control} name="bgColor" label="Cor" />

      <ButtonWrapper>
        {action === "edit" && <Button onClick={formSubmit}>Deletar</Button>}
        <Button onClick={formSubmit}>Adicionar</Button>
      </ButtonWrapper>
    </form>
  );
}
