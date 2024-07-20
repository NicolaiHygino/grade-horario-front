import styled from "@emotion/styled";

export const TimetableWrapper = styled.div<{ $height: number }>`
  height: ${({ $height }) => $height}px;
  overflow: hidden;
  border: 1px solid #ebebeb;
`;

export const TimeTableBody = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  white-space: nowrap;
  width: calc(100% - 50px);
  margin-left: 50px;
  height: 100%;
`;

export const WeekDayHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  height: 30px;
`;

export const WeekDayColumn = styled.div`
  border-left: 1px solid #ebebeb;
  position: relative;
`;

export const EventsWrapper = styled.div<{ $height: number }>`
  z-index: 100;
  position: relative;
  height: ${({ $height }) => $height}px;
`;

export const EventsWrapperTest = styled.div<{ $height: number }>`
  z-index: 9999999;
  border: 1px solid red;
  position: absolute;
  width: 100%;
  height: ${({ $height }) => $height}px;
`;

export const HoursColumn = styled.div`
  top: 31px;
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  z-index: 99;
`;

export const HourWrapper = styled.div`
  display: flex;
`;

export const Hour = styled.div`
  display: flex;
  justify-content: center;
  font-size: 12px;
  margin-top: -6px;
  width: 50px;
`;

export const HourRow = styled.div<{ $height: number }>`
  height: ${(props) => props.$height}px;
  border-top: 1px solid #ebebeb;
  width: 100%;
`;
