import styled from "styled-components";

export const TimetableStyled = styled.div`
  position: relative;
  height: 800px;
  overflow: scroll;
  overflow-x: hidden;
`;

export const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  white-space: nowrap;
  width: calc(100% - 50px);
  margin-left: 50px;
  height: 100%;
`;

export const DaysOfWeekHeader = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DaysOfWeek = styled.div`
  border: 1px solid #ebebeb;
  position: relative;
`;

interface IStyledEventWrapper {
  $hourItensHeight: number;
  $hoursItensQuantity: number;
}

export const EventsWrapper = styled.div<IStyledEventWrapper>`
  position: relative;
  height: ${({ $hourItensHeight, $hoursItensQuantity }) =>
    $hourItensHeight * $hoursItensQuantity}px;
  border: 1px solid #ebebeb;
  margin: 0px -1px 0px -1px;
`;

interface IStyledEvent {
  $fromTop: number;
  $height: number;
  $bgColor: string;
}

export const Event = styled.div<IStyledEvent>`
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
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    transform: scale(1.05);
  }
`;

export const EventHeader = styled.h4`
  font-size: 14px;
  font-weight: 500;
`;

export const HoursColumn = styled.div`
  top: 31px;
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  z-index: 99;
`;

export const Hour = styled.div<{ $height: number }>`
  display: flex;
  height: ${(props) => props.$height}px;
  border-bottom: 1px solid #ebebeb;
  width: 100%;
  align-items: center;
`;
