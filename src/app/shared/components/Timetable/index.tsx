"use client";
import { enumToEnumKeyList, mask24hours } from "@/app/shared/utils";
import { useState } from "react";
import DraftEvent from "./components/DraftEvent";
import Event from "./components/Event";
import Pointer from "./components/Pointer";
import PopperForm from "./components/PopperForm";
import {
  EventsWrapper,
  Hour,
  HourRow,
  HourWrapper,
  HoursColumn,
  TimeTableBody,
  TimetableWrapper,
  WeekDayColumn,
  WeekDayHeader,
} from "./styles";
import { EWeekDays } from "./types/EWeekDays";
import { IEvent } from "./types/IEvents";
import {
  increaseHour,
  pixelsToHourTime,
  roundHourTimeToNearestHalfHour,
} from "./utils";

interface props {
  events: IEvent[];
  handleSubmitEvent: (event: IEvent) => void;
  handleDeleteEvent: (eventId: number) => void;
}

const DAY_HOURS = [...Array(24)].map((_, index) => mask24hours(index));
const TABLE_WEEK_DAYS = enumToEnumKeyList(EWeekDays);
const TIMETABLE_HEIGHT = 1500;
const HOUR_HEIGHT = (TIMETABLE_HEIGHT - 30) / 24;

export default function Timetable({
  events,
  handleSubmitEvent,
  handleDeleteEvent,
}: props) {
  const [draftEvent, setDraftEvent] = useState<IEvent | null>(null);

  const [editingEvent, setEditingEvent] = useState<IEvent | null>(null);
  const [editingEventEl, setEditingEventEl] = useState<null | HTMLElement>(
    null
  );

  const handleAddDraftEventClick = (
    e: React.MouseEvent<HTMLDivElement>,
    weekDay: keyof typeof EWeekDays
  ) => {
    if (Boolean(draftEvent) || editingEvent) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const relativeY = Math.floor(e.clientY - rect.top);
    const hour = pixelsToHourTime(relativeY, HOUR_HEIGHT);

    const startTime = roundHourTimeToNearestHalfHour(hour);
    const endTime = increaseHour(startTime, 1);

    setDraftEvent({
      id: 0,
      name: "Sem título...",
      startTime: startTime,
      endTime: endTime,
      bgColor: "#BCE7FD",
      weekDay: weekDay,
    });
  };

  return (
    <TimetableWrapper $height={TIMETABLE_HEIGHT}>
      <HoursColumn>
        {DAY_HOURS.map((hour) => (
          <HourWrapper key={hour}>
            <Hour>{hour}</Hour>
            <HourRow $height={HOUR_HEIGHT}></HourRow>
          </HourWrapper>
        ))}
      </HoursColumn>
      <TimeTableBody>
        {TABLE_WEEK_DAYS.map((day) => {
          return (
            <WeekDayColumn key={day}>
              <WeekDayHeader>
                {EWeekDays[day as keyof typeof EWeekDays]}
              </WeekDayHeader>
              <EventsWrapper
                $height={TIMETABLE_HEIGHT - 30}
                onClick={(e) =>
                  handleAddDraftEventClick(e, day as keyof typeof EWeekDays)
                }
              >
                <Pointer hourHeight={HOUR_HEIGHT} />
                {events
                  .filter((event) => event.weekDay === day)
                  .map((event) => (
                    <Event
                      ariaDescribedBy={`${event.id}`}
                      event={event}
                      key={event.id}
                      hourHeight={HOUR_HEIGHT}
                      onClick={(e) => {
                        setEditingEvent(event);
                        setEditingEventEl(e.currentTarget);
                      }}
                    />
                  ))}
                {draftEvent?.weekDay === day && Boolean(draftEvent) && (
                  <DraftEvent
                    event={draftEvent}
                    hourHeight={HOUR_HEIGHT}
                    onClickAway={() => setDraftEvent(null)}
                    handleSubmit={handleSubmitEvent}
                  />
                )}
              </EventsWrapper>
            </WeekDayColumn>
          );
        })}
      </TimeTableBody>
      <PopperForm
        id={`${editingEvent?.id}`}
        open={Boolean(editingEvent)}
        anchorEl={editingEventEl}
        event={editingEvent}
        onClickAway={() => setEditingEvent(null)}
        handleSubmit={handleSubmitEvent}
        handleDelete={handleDeleteEvent}
      />
    </TimetableWrapper>
  );
}
