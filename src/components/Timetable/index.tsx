"use client";
import { enumToEnumKeyList, mask24hours } from "@/utils/functions-utils";
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
  handleSubmitEvent: (event: IEvent) => void;
  handleEditEvent: (index: number, event: IEvent) => void;
  handleDeleteEvent: (eventId?: number) => void;
}

type IFieldEvent = {
  fieldKey: string;
} & IEvent;

interface TimetableEvent {
  event: IFieldEvent;
  index: number;
  key: string;
}

const DAY_HOURS = [...Array(24)].map((_, index) => mask24hours(index));
const TABLE_WEEK_DAYS = enumToEnumKeyList(EWeekDays);
const TIMETABLE_HEIGHT = 1300;
const HOUR_HEIGHT = (TIMETABLE_HEIGHT - 30) / 24;

export default function Timetable({
  events,
  handleSubmitEvent,
  handleEditEvent,
  handleDeleteEvent,
}: props) {
  const [timetableEvents, setTimetableEvents] = useState<TimetableEvent[]>([]);

  const [draftEvent, setDraftEvent] = useState<IEvent | null>(null);
  const [editingEvent, setEditingEvent] = useState<TimetableEvent | null>(null);
  const [editingEventEl, setEditingEventEl] = useState<HTMLElement | null>(
    null
  );

  const handleAddDraftEventClick = (
    e: React.MouseEvent<HTMLDivElement>,
    weekDay: keyof typeof EWeekDays
  ) => {
    if (draftEvent || editingEvent) return;

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

  const handleDelete = () => {
    handleDeleteEvent(editingEvent?.index);
    setEditingEvent(null);
  };

  useEffect(() => {
    const eventsMapped: TimetableEvent[] = events.map((event, index) => ({
      event,
      index,
      key: crypto.randomUUID?.(),
    }));
    setTimetableEvents(eventsMapped);
  }, [events]);

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
                key={`${day}-week-days`}
                $height={TIMETABLE_HEIGHT - 30}
                onClick={(e) =>
                  handleAddDraftEventClick(e, day as keyof typeof EWeekDays)
                }
              >
                <HourPointer hourHeight={HOUR_HEIGHT} />
                {timetableEvents
                  .filter((item) => item.event.weekDay === day)
                  .map((item) => (
                    <Event
                      ariaDescribedBy={`${item.event.fieldKey}`}
                      event={item.event}
                      key={item.key}
                      hourHeight={HOUR_HEIGHT}
                      onClick={(e) => {
                        setEditingEvent(item);
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
        id={`${editingEvent?.key}`}
        open={Boolean(editingEvent)}
        anchorEl={editingEventEl}
        event={editingEvent?.event || null}
        onClickAway={() => setEditingEvent(null)}
        handleSubmit={(event) => {
          if (editingEvent?.index !== undefined)
            handleEditEvent(editingEvent.index, event);
        }}
        handleDelete={handleDelete}
      />
    </TimetableWrapper>
  );
}
