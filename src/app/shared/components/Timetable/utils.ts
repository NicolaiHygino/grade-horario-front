import { hoursToMinutes, ruleOfThree } from "@/app/shared/utils";
import { Hour } from "./types/IHour";

export function hourTimeToPixels(hour: Hour, hour_height: number): number {
  const [hours, minutes] = hour.split(":");
  return hoursToMinutes(+hours, +minutes) * ruleOfThree(60, 1, hour_height);
}

export function pixelsToHourTime(pixel: number, hour_height: number): Hour {
  const totalMinutes = (pixel / hour_height) * 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}` as Hour;
}

export function roundHourTimeToNearestHalfHour(hour: Hour): Hour {
  const [hours, minutes] = hour.split(":").map(Number);
  const roundedMinutes = minutes < 30 ? 0 : 30;
  return `${hours.toString().padStart(2, "0")}:${roundedMinutes
    .toString()
    .padStart(2, "0")}` as Hour;
}

export function increaseHourByOne(hour: Hour): Hour {
  const [hours, minutes] = hour.split(":").map(Number);
  let totalMinutes = hours * 60 + minutes + 60;

  // Handle overflow
  totalMinutes = totalMinutes % (24 * 60);

  const newHours = Math.floor(totalMinutes / 60);
  const newMinutes = totalMinutes % 60;

  return `${newHours.toString().padStart(2, "0")}:${newMinutes
    .toString()
    .padStart(2, "0")}` as Hour;
}

export function increaseHour(time: Hour, increments: number): Hour {
  const [hours, minutes] = time.split(":").map(Number);
  let totalMinutes = hours * 60 + minutes + increments * 60;

  // Handle overflow
  totalMinutes = totalMinutes % (24 * 60);

  const newHours = Math.floor(totalMinutes / 60);
  const newMinutes = totalMinutes % 60;

  return `${newHours.toString().padStart(2, "0")}:${newMinutes
    .toString()
    .padStart(2, "0")}` as Hour;
}

export function makeHourWithDateObject(date: Date): Hour {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}` as Hour;
}
