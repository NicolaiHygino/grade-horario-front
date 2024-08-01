import styled from "@emotion/styled";

interface IStyledEvent {
  $fromTop: number;
  $height: number;
  $bgColor: string;
}

export const StyledEvent = styled.div<IStyledEvent>`
  top: ${({ $fromTop }) => $fromTop}px;
  height: ${({ $height }) => $height}px;
  background-color: ${({ $bgColor }) => $bgColor};
  position: absolute;
  padding: 5px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 999;
  transition: all 0.2s;

  &:hover {
    cursor: pointer;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    transform: scale(1.02);
  }

  &:hover .event-buttons {
    display: block;
  }
`;

export const EventTime = styled.span`
  font-size: 12px;
`;

export const EventHeader = styled.h4`
  font-size: 14px;
  font-weight: 500;
`;
