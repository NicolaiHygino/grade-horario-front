import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Hour } from "../types/IHour";
import { hourTimeToPixels, makeHourWithDateObject } from "../utils";

export default function HourPointer({ hourHeight }: { hourHeight: number }) {
  const [hour, setHour] = useState<Hour>("00:00");

  useEffect(() => {
    setHour(makeHourWithDateObject(new Date()));

    const interval = setInterval(() => {
      setHour(makeHourWithDateObject(new Date()));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return <StyledPointer $fromTop={hourTimeToPixels(hour, hourHeight)} />;
}

export const StyledPointer = styled.div<{
  $fromTop: number;
}>`
  top: ${({ $fromTop }) => $fromTop}px;
  border-bottom: 1px solid red;
  position: absolute;
  width: 100%;
  z-index: 999999999;
`;
