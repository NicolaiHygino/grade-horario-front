import { EWeekDays } from "./EWeekDays";

interface IEvent {
  id: number;
  name: string;
  startTime: Date;
  endTime: Date;
  dayOfTheWeek: keyof typeof EWeekDays;
  bgColor: string;
}

export type IEvents = IEvent[];
