"use client";

import { Box } from "@mui/material";
import Timetable from "./shared/components/Timetable";
import { IEvent } from "./shared/components/Timetable/types/IEvents";

export default function Home() {
  const handleSubmit = (e: IEvent) => {
    console.log(e);
  };

  const handleDelete = (e: number) => {
    console.log(e);
  };

  return (
    <Box>
      <Timetable
        events={EVENTS}
        handleSubmitEvent={handleSubmit}
        handleDeleteEvent={handleDelete}
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
