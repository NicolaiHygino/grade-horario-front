"use client";

import Timetable from "@/components/Timetable";
import { Box } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { IEvent } from "../components/Timetable/types/IEvents";

interface EventsPayload {
  data: IEvent[];
}

export default function Page() {
  const { control } = useForm<EventsPayload>({
    defaultValues: { data: EVENTS },
  });
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "data",
    keyName: "fieldKey",
  });

  return (
    <Box>
      <Timetable
        events={fields}
        handleSubmitEvent={append}
        handleEditEvent={update}
        handleDeleteEvent={remove}
      />
    </Box>
  );
}

export const EVENTS: IEvent[] = [
  {
    id: 900,
    name: "Intervalo",
    startTime: "21:00",
    endTime: "23:59",
    weekDay: "SEGUNDA",
    bgColor: "#CDD3CE",
  },
  {
    id: 901,
    name: "Intervalo",
    startTime: "00:00",
    endTime: "01:00",
    weekDay: "TERCA",
    bgColor: "#CDD3CE",
  },
  {
    id: 902,
    name: "Intervalo",
    startTime: "13:00",
    endTime: "16:00",
    weekDay: "QUARTA",
    bgColor: "#CDD3CE",
  },
];
