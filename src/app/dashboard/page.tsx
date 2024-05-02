"use client";

import Timetable from "../shared/components/Timetable";
import { IEvents } from "../shared/components/Timetable/types/IEvents";
import { Container } from "./styles";

export default function Dashboard() {
  return (
    <Container>
      <Timetable events={events} />
    </Container>
  );
}

export const events: IEvents = [
  {
    id: 1,
    name: "Estudar",
    startTime: new Date("2024-04-29T00:00:00"),
    endTime: new Date("2024-04-29T07:00:00"),
    dayOfTheWeek: "DOMINGO",
    bgColor: "#A1683A",
  },
  {
    id: 34,
    name: "Mercado",
    startTime: new Date("2024-04-29T08:00:00"),
    endTime: new Date("2024-04-29T10:00:00"),
    dayOfTheWeek: "DOMINGO",
    bgColor: " #586F7C",
  },
  {
    id: 2,
    name: "Nicolai gostoso",
    startTime: new Date("2024-04-29T12:00:00"),
    endTime: new Date("2024-04-29T14:00:00"),
    dayOfTheWeek: "SEGUNDA",
    bgColor: "#B8DBD9",
  },
  {
    id: 3,
    name: "Ain zé da manga",
    startTime: new Date("2024-04-29T17:00:00"),
    endTime: new Date("2024-04-29T18:00:00"),
    dayOfTheWeek: "TERCA",
    bgColor: "#CBDFBD",
  },
  {
    id: 3,
    name: "Livro téc",
    startTime: new Date("2024-04-29T10:00:00"),
    endTime: new Date("2024-04-29T12:00:00"),
    dayOfTheWeek: "QUINTA",
    bgColor: "#CBDFBD",
  },
  {
    id: 3,
    name: "Academia",
    startTime: new Date("2024-04-29T18:00:00"),
    endTime: new Date("2024-04-29T19:30:00"),
    dayOfTheWeek: "SEGUNDA",
    bgColor: "#A8C256",
  },
  {
    id: 3,
    name: "Academia",
    startTime: new Date("2024-04-29T18:00:00"),
    endTime: new Date("2024-04-29T19:30:00"),
    dayOfTheWeek: "TERCA",
    bgColor: "#A8C256",
  },
  {
    id: 3,
    name: "Academia",
    startTime: new Date("2024-04-29T18:00:00"),
    endTime: new Date("2024-04-29T19:30:00"),
    dayOfTheWeek: "QUARTA",
    bgColor: "#A8C256",
  },
  {
    id: 3,
    name: "Academia",
    startTime: new Date("2024-04-29T18:00:00"),
    endTime: new Date("2024-04-29T19:30:00"),
    dayOfTheWeek: "SEXTA",
    bgColor: "#A8C256",
  },
  {
    id: 3,
    name: "Academia",
    startTime: new Date("2024-04-29T09:00:00"),
    endTime: new Date("2024-04-29T10:30:00"),
    dayOfTheWeek: "SABADO",
    bgColor: "#A8C256",
  },
  {
    id: 3,
    name: "Trabalhar",
    startTime: new Date("2024-04-29T09:00:00"),
    endTime: new Date("2024-04-29T18:00:00"),
    dayOfTheWeek: "SEXTA",
    bgColor: "#E5C3D1",
  },
  {
    id: 3,
    name: "Comer cu",
    startTime: new Date("2024-04-29T21:00:00"),
    endTime: new Date("2024-04-29T23:00:00"),
    dayOfTheWeek: "SABADO",
    bgColor: "#8F5C38",
  },
  {
    id: 4,
    name: "Plano maligno",
    startTime: new Date("2024-04-29T09:00:00"),
    endTime: new Date("2024-04-29T11:00:00"),
    dayOfTheWeek: "QUARTA",
    bgColor: " #F1E9DB",
  },
];
