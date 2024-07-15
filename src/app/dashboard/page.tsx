"use client";

import Timetable from "../shared/components/Timetable";
import { IEvent } from "../shared/components/Timetable/types/IEvents";

export default function Dashboard() {
  return (
    <div>
      <Timetable events={EVENTS} />
    </div>
  );
}

export const EVENTS: IEvent[] = [
  {
    id: 900,
    name: "Intervalo",
    startTime: "09:50",
    endTime: "10:10",
    weekDay: "SEGUNDA",
    bgColor: "#CDD3CE",
  },
  {
    id: 901,
    name: "Intervalo",
    startTime: "09:50",
    endTime: "10:10",
    weekDay: "TERCA",
    bgColor: "#CDD3CE",
  },
  {
    id: 901,
    name: "Intervalo",
    startTime: "09:50",
    endTime: "10:10",
    weekDay: "QUARTA",
    bgColor: "#CDD3CE",
  },
  {
    id: 901,
    name: "Intervalo",
    startTime: "09:50",
    endTime: "10:10",
    weekDay: "QUINTA",
    bgColor: "#CDD3CE",
  },
  {
    id: 901,
    name: "Intervalo",
    startTime: "09:50",
    endTime: "10:10",
    weekDay: "SEXTA",
    bgColor: "#CDD3CE",
  },
];
