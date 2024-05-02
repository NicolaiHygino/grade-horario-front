"use client";
import { enumToEnumKeyList, mask24hours } from "@/app/shared/utils";
import { EWeekDays } from "./types/EWeekDays";
import { IEvents } from "./types/IEvents";
import {
  TimetableStyled,
  DaysOfWeek,
  DaysOfWeekHeader,
  Event,
  EventHeader,
  EventsWrapper,
  Hour,
  HoursColumn,
  WeekDays,
} from "./styles";
import { calcEventHeight, minutesToPixels } from "./utils";

const DAY_HOURS = [...Array(24)].map((_, index) => mask24hours(index));

const TABLE_WEEK_DAYS = enumToEnumKeyList(EWeekDays);

export const HOUR_HEIGHT = 40;

export default function Timetable({ events }: { events: IEvents }) {
  return (
    <TimetableStyled>
      <HoursColumn>
        {DAY_HOURS.map((hour) => (
          <Hour $height={HOUR_HEIGHT} key={hour}>
            {hour}
          </Hour>
        ))}
      </HoursColumn>

      <WeekDays>
        {TABLE_WEEK_DAYS.map((day) => (
          <DaysOfWeek key={day}>
            <DaysOfWeekHeader>
              {EWeekDays[day as keyof typeof EWeekDays]}
            </DaysOfWeekHeader>
            <EventsWrapper
              $hourItensHeight={HOUR_HEIGHT}
              $hoursItensQuantity={DAY_HOURS.length}
            >
              {events
                .filter((event) => event.dayOfTheWeek === day)
                .map((event) => (
                  <Event
                    $fromTop={minutesToPixels(event.startTime)}
                    $height={calcEventHeight(event.startTime, event.endTime)}
                    $bgColor={event.bgColor}
                    key={event.name}
                  >
                    <EventHeader>{event.name}</EventHeader>
                  </Event>
                ))}
            </EventsWrapper>
          </DaysOfWeek>
        ))}
      </WeekDays>
    </TimetableStyled>
  );
}
