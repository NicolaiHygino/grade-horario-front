import { EWeekDays } from "./EWeekDays";

export type Hour = `${number}${number}:${number}${number}`;

export interface IEvent {
  id: number;
  name: string;
  startTime: Hour;
  endTime: Hour;
  weekDay: keyof typeof EWeekDays;
  bgColor: string;
}
