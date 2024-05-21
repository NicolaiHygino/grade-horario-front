"use client";
import { enumToEnumKeyList, mask24hours } from "@/app/shared/utils";
import { EWeekDays } from "./types/EWeekDays";
import { IEvent } from "./types/IEvents";
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
  EventTime,
  TimetableContentWrapper,
} from "./styles";
import { calcEventHeight, hourTimeToPixels } from "./utils";

export const HOUR_HEIGHT = 45;
const START_TIME = 0;

const DAY_HOURS = [...Array(24)].map((_, index) =>
  mask24hours(index + START_TIME)
);
const TABLE_WEEK_DAYS = enumToEnumKeyList(EWeekDays);

interface ITimetable {
  events: IEvent[];
}

export default function Timetable({ events }: ITimetable) {
  return (
    <TimetableStyled>
      <TimetableContentWrapper $height={HOUR_HEIGHT * DAY_HOURS.length + 30}>
        <HoursColumn>
          {DAY_HOURS.map((hour) => (
            <Hour $height={HOUR_HEIGHT} key={hour}>
              {hour}
            </Hour>
          ))}
        </HoursColumn>
        <WeekDays>
          {TABLE_WEEK_DAYS.map((day) => {
            return (
              <DaysOfWeek key={day}>
                <DaysOfWeekHeader>
                  {EWeekDays[day as keyof typeof EWeekDays]}
                </DaysOfWeekHeader>
                <EventsWrapper
                  $hourItensHeight={HOUR_HEIGHT}
                  $hoursItensQuantity={DAY_HOURS.length}
                >
                  {events
                    .filter((event) => event.weekDay === day)
                    .map((event) => {
                      return (
                        <Event
                          $fromTop={hourTimeToPixels(event.startTime, 7)}
                          $height={calcEventHeight(
                            event.startTime,
                            event.endTime
                          )}
                          $bgColor={event.bgColor}
                          key={event.id}
                        >
                          <EventTime>
                            {event.startTime} - {event.endTime}
                          </EventTime>
                          <EventHeader>{event.name}</EventHeader>
                        </Event>
                      );
                    })}
                </EventsWrapper>
              </DaysOfWeek>
            );
          })}
        </WeekDays>
      </TimetableContentWrapper>
    </TimetableStyled>
  );
}
