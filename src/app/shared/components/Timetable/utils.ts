import { hoursToMinutes, ruleOfThree } from "@/app/shared/utils";
import { HOUR_HEIGHT } from ".";

export function minutesToPixels(startTime: Date): number {
  return (
    hoursToMinutes(startTime.getHours(), startTime.getMinutes()) *
    ruleOfThree(60, 1, HOUR_HEIGHT)
  );
}

export function calcEventHeight(startTime: Date, endTime: Date) {
  return minutesToPixels(endTime) - minutesToPixels(startTime);
}
