import { useEffect, useRef, useState } from "react";
import { IEvent } from "../types/IEvents";
import Event, { IEventProps } from "./Event";
import PopperForm from "./PopperForm";

type props = {
  handleSubmit: (event: IEvent) => void;
  onClickAway?: () => void;
} & IEventProps;

export default function DraftEvent({
  event,
  hourHeight,
  onClickAway,
  handleSubmit,
}: props) {
  const [openPopper, setOpenPopper] = useState(false);

  const ref = useRef(null);

  // force popper opens only after draft event rendered
  useEffect(() => {
    setOpenPopper(true);
  }, []);

  return (
    <>
      <Event
        ariaDescribedBy="draft-event"
        event={event}
        hourHeight={hourHeight}
        dataTestId="draft-event"
        ref={ref}
      />
      <PopperForm
        id="draft-event"
        open={openPopper}
        anchorEl={ref.current}
        event={event}
        onClickAway={onClickAway}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
