import { forwardRef } from "react";
import { IEvent } from "../../types/IEvents";
import { hourTimeToPixels } from "../../utils";
import { EventHeader, EventTime, StyledEvent } from "./style";

export interface IEventProps {
  event: IEvent;
  hourHeight: number;
  ariaDescribedBy?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const Event = forwardRef<HTMLDivElement, IEventProps>(
  ({ event, hourHeight, onClick, ariaDescribedBy }: IEventProps, ref) => {
    return (
      <StyledEvent
        key={event.id}
        aria-describedby={ariaDescribedBy}
        $fromTop={hourTimeToPixels(event.startTime, hourHeight)}
        $height={
          hourTimeToPixels(event.endTime, hourHeight) -
          hourTimeToPixels(event.startTime, hourHeight)
        }
        $bgColor={event.bgColor}
        ref={ref}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(e);
        }}
        data-testid="event"
      >
        <EventTime>
          {event.startTime} - {event.endTime}
        </EventTime>
        <EventHeader>{event.name}</EventHeader>
      </StyledEvent>
    );
  }
);

Event.displayName = "Event";

export default Event;
