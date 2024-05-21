import { hoursToMinutes, ruleOfThree } from "@/app/shared/utils";
import { HOUR_HEIGHT } from ".";
import { Hour } from "./types/IEvents";

export function hourTimeToPixels(hour: Hour, timetableStart?: number): number {
  const [hours, minutes] = hour.split(":");
  const timeInPixels =
    hoursToMinutes(+hours, +minutes) * ruleOfThree(60, 1, HOUR_HEIGHT);

  return timetableStart === undefined
    ? timeInPixels
    : timeInPixels - HOUR_HEIGHT * timetableStart;
}

export function calcEventHeight(startTime: Hour, endTime: Hour) {
  return hourTimeToPixels(endTime) - hourTimeToPixels(startTime);
}
