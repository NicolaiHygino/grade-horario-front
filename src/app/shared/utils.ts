export function enumToEnumKeyList(enumObj: any): string[] {
  return Object.keys(enumObj).filter((key) => isNaN(Number(enumObj[key])));
}

export function hoursToMinutes(hours: number, minutes: number): number {
  return hours * 60 + minutes;
}

export function ruleOfThree(a: number, b: number, c: number): number {
  return (c * b) / a;
}

export function mask24hours(number: number): string {
  return number < 10 ? `0${number}:00` : `${number}:00`;
}
