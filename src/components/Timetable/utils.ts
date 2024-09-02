import { hoursToMinutes, ruleOfThree } from "@/utils/functions-utils";
import { Hour } from "./types/IHour";

function padStartWithZero(number: number): string {
  return number.toString().padStart(2, "0");
}

export function hourTimeToPixels(hour: Hour, hourHeight: number): number {
  const [hours, minutes] = hour.split(":");
  return hoursToMinutes(+hours, +minutes) * ruleOfThree(60, 1, hourHeight);
}

export function pixelsToHourTime(pixel: number, hourHeight: number): Hour {
  const totalMinutes = (pixel / hourHeight) * 60;
  const hours = padStartWithZero(Math.floor(totalMinutes / 60));
  const minutes = padStartWithZero(Math.floor(totalMinutes % 60));

  return `${hours}:${minutes}` as Hour;
}

export function roundHourTimeToNearestHalfHour(hour: Hour): Hour {
  const [hours, minutes] = hour.split(":").map(Number);
  const roundedMinutes = minutes < 30 ? 0 : 30;
  return `${padStartWithZero(hours)}:${padStartWithZero(
    roundedMinutes
  )}` as Hour;
}

export function increaseHour(time: Hour, increments: number): Hour {
  const [hours, minutes] = time.split(":").map(Number);
  let totalMinutes = hours * 60 + minutes + increments * 60;

  // Handle overflow
  totalMinutes = totalMinutes % (24 * 60);

  const newHours = padStartWithZero(Math.floor(totalMinutes / 60));
  const newMinutes = padStartWithZero(totalMinutes % 60);

  return `${newHours}:${newMinutes}` as Hour;
}

export function makeHourWithDateObject(date: Date): Hour {
  const hours = padStartWithZero(date.getHours());
  const minutes = padStartWithZero(date.getMinutes());
  return `${hours}:${minutes}` as Hour;
}
