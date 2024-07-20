import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Hour } from "../types/IHour";
import { hourTimeToPixels, makeHourWithDateObject } from "../utils";

interface props {
  hourHeight: number;
}

export default function Pointer({ hourHeight }: props) {
  const [hour, setHour] = useState<Hour>("00:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setHour(makeHourWithDateObject(date));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return <StyledPointer $fromTop={hourTimeToPixels(hour, hourHeight)} />;
}

interface IStyledPointer {
  $fromTop: number;
}

export const StyledPointer = styled.div<IStyledPointer>`
  top: ${({ $fromTop }) => $fromTop}px;
  height: 1.2px;
  background-color: red;
  position: absolute;
  width: 100%;
  z-index: 999;
`;
