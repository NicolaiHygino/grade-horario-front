"use client";

import { mask24hours } from "@/utils/functions-utils";
import { useEffect, useState } from "react";
import DraftEvent from "./components/DraftEvent";
import Event from "./components/Event";
import HourPointer from "./components/HourPointer";
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
  events: IFieldEvent[];
  hourHeight?: number;
  handleSubmit: (event: IEvent) => void;
  handleEdit: (index: number, event: IEvent) => void;
  handleDelete: (eventId?: number) => void;
}

export type IFieldEvent = {
  fieldKey: string;
} & IEvent;

interface TimetableEvent {
  event: IFieldEvent;
  index: number;
}

const DAY_HOURS = [...Array(24)].map((_, index) => mask24hours(index));
const TABLE_WEEK_DAYS = Object.keys(EWeekDays);

export default function Timetable({
  events,
  hourHeight = 50,
  handleSubmit,
  handleEdit,
  handleDelete,
}: props) {
  const [timetableEvents, setTimetableEvents] = useState<TimetableEvent[]>([]);

  const [draftEvent, setDraftEvent] = useState<IEvent | null>(null);
  const [editingEvent, setEditingEvent] = useState<TimetableEvent | null>(null);
  const [editingEventEl, setEditingEventEl] = useState<HTMLElement | null>(
    null
  );

  const timetableHeight = hourHeight * 25 - 30;

  const handleAddDraftEventClick = (
    e: React.MouseEvent<HTMLDivElement>,
    weekDay: keyof typeof EWeekDays
  ) => {
    if (draftEvent || editingEvent) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const relativeY = Math.floor(e.clientY - rect.top);
    const hour = pixelsToHourTime(relativeY, hourHeight);

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

  useEffect(() => {
    setTimetableEvents(
      events.map((event, index) => ({
        event,
        index,
      }))
    );
  }, [events]);

  return (
    <TimetableWrapper $height={timetableHeight}>
      <HoursColumn>
        {DAY_HOURS.map((hour) => (
          <HourWrapper key={hour}>
            <Hour>{hour}</Hour>
            <HourRow $height={hourHeight}></HourRow>
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
                aria-label={day}
                $height={timetableHeight - 30}
                onClick={(e) =>
                  handleAddDraftEventClick(e, day as keyof typeof EWeekDays)
                }
              >
                <HourPointer hourHeight={hourHeight} />
                {timetableEvents
                  .filter((item) => item.event.weekDay === day)
                  .map((item) => (
                    <Event
                      ariaDescribedBy={`${item.event.fieldKey}`}
                      event={item.event}
                      key={item.event.fieldKey}
                      hourHeight={hourHeight}
                      onClick={(e) => {
                        setEditingEvent(item);
                        setEditingEventEl(e.currentTarget);
                      }}
                    />
                  ))}
                {draftEvent?.weekDay === day && Boolean(draftEvent) && (
                  <DraftEvent
                    event={draftEvent}
                    hourHeight={hourHeight}
                    onClickAway={() => setDraftEvent(null)}
                    handleSubmit={handleSubmit}
                  />
                )}
              </EventsWrapper>
            </WeekDayColumn>
          );
        })}
      </TimeTableBody>
      <PopperForm
        id={`${editingEvent?.event.fieldKey}`}
        open={Boolean(editingEvent)}
        anchorEl={editingEventEl}
        event={editingEvent?.event || null}
        onClickAway={() => setEditingEvent(null)}
        handleSubmit={(event) => {
          if (editingEvent?.index !== undefined)
            handleEdit(editingEvent.index, event);
        }}
        handleDelete={() => {
          handleDelete(editingEvent?.index);
          setEditingEvent(null);
        }}
      />
    </TimetableWrapper>
  );
}
