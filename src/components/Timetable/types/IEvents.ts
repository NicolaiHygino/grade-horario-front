import { EWeekDays } from "./EWeekDays";
import { Hour } from "./IHour";

export interface IEvent {
  id: number;
  name: string;
  startTime: Hour;
  endTime: Hour;
  weekDay: keyof typeof EWeekDays;
  bgColor: string;
}
