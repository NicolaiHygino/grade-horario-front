import {
  asyncGetButtonByTextAndClick,
  asyncGetInputByLabelClearAndType,
} from "@/utils/test-utils";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Timetable, { IFieldEvent } from ".";
import { EWeekDays } from "./types/EWeekDays";

describe("Timetable", () => {
  const eventsMock: IFieldEvent[] = [
    {
      id: 900,
      name: "Intervalo",
      startTime: "21:00",
      endTime: "23:59",
      weekDay: "SEGUNDA",
      bgColor: "#CDD3CE",
      fieldKey: "mockteste1",
    },
  ];

  it.each([
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ])("should render %s column", (day) => {
    render(
      <Timetable
        events={eventsMock}
        handleSubmit={() => {}}
        handleEdit={() => {}}
        handleDelete={() => {}}
      />
    );
    const element = screen.getByText(day);
    expect(element).toBeInTheDocument();
  });

  it.each([
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ])("should render %s slot", (hour) => {
    render(
      <Timetable
        events={eventsMock}
        handleSubmit={() => {}}
        handleEdit={() => {}}
        handleDelete={() => {}}
      />
    );
    const element = screen.getByText(hour);
    expect(element).toBeInTheDocument();
  });

  const getDayColumnAndClickPxFromTop = (
    day: keyof typeof EWeekDays,
    fromTop: number
  ) => {
    const eventWrapperElement = screen.getByLabelText(day);
    const rect = eventWrapperElement.getBoundingClientRect();
    const clickY = rect.top + fromTop;
    fireEvent.click(eventWrapperElement, { clientY: clickY });
  };

  it("should render draft event when clicks on timetable day column", async () => {
    const handleSubmitEventMock = jest.fn();

    render(
      <Timetable
        events={eventsMock}
        handleSubmit={handleSubmitEventMock}
        handleEdit={() => {}}
        handleDelete={() => {}}
      />
    );

    getDayColumnAndClickPxFromTop("SEGUNDA", 0);

    const draftEvent = await screen.findByTestId("draft-event");
    expect(draftEvent).toBeInTheDocument();
  });

  it("should render a draft event from 00:00 to 01:00 when clicks the first half of the 00:00 time span", async () => {
    render(
      <Timetable
        events={eventsMock}
        hourHeight={60}
        handleSubmit={() => {}}
        handleEdit={() => {}}
        handleDelete={() => {}}
      />
    );

    getDayColumnAndClickPxFromTop("SEGUNDA", 0);

    const draftEventTime = screen.getByText("00:00 - 01:00");
    expect(draftEventTime).toBeInTheDocument();
  });

  it("should render a draft event from 00:30 to 01:30 when clicks the second half of the 00:00 time span", () => {
    render(
      <Timetable
        events={eventsMock}
        hourHeight={60}
        handleSubmit={() => {}}
        handleEdit={() => {}}
        handleDelete={() => {}}
      />
    );

    getDayColumnAndClickPxFromTop("SEGUNDA", 40);

    const draftEventTime = screen.getByText("00:30 - 01:30");
    expect(draftEventTime).toBeInTheDocument();
  });

  it("should call handleSubmit with newly created event", async () => {
    const handleSubmitMock = jest.fn();

    render(
      <Timetable
        events={eventsMock}
        hourHeight={60}
        handleSubmit={handleSubmitMock}
        handleEdit={() => {}}
        handleDelete={() => {}}
      />
    );

    getDayColumnAndClickPxFromTop("SEGUNDA", 0);

    await asyncGetInputByLabelClearAndType("Título", "Mock Event");
    await asyncGetInputByLabelClearAndType("Início", "1200");
    await asyncGetInputByLabelClearAndType("Fim", "1300");
    await asyncGetButtonByTextAndClick("Salvar");

    expect(handleSubmitMock).toHaveBeenCalledWith({
      bgColor: "#BCE7FD",
      endTime: "13:00",
      id: 0,
      name: "Mock Event",
      startTime: "12:00",
      weekDay: "SEGUNDA",
    });
  });

  it("should call handleDelete with the index of the deleted event", async () => {
    const handleDeleteMock = jest.fn();

    render(
      <Timetable
        events={eventsMock}
        hourHeight={60}
        handleSubmit={() => {}}
        handleEdit={() => {}}
        handleDelete={handleDeleteMock}
      />
    );

    const eventElements = screen.getAllByTestId("event");
    const user = userEvent.setup();

    await user.click(eventElements[0]);

    const deleteButton = await screen.findByLabelText("delete");
    await user.click(deleteButton);

    expect(handleDeleteMock).toHaveBeenCalledWith(0);
  });

  it("should call handleEdit with newly edited event", async () => {
    const handleEditMock = jest.fn();

    render(
      <Timetable
        events={eventsMock}
        hourHeight={60}
        handleSubmit={() => {}}
        handleEdit={handleEditMock}
        handleDelete={() => {}}
      />
    );

    const user = userEvent.setup();

    const eventElements = screen.getAllByTestId("event");
    await user.click(eventElements[0]);

    await asyncGetInputByLabelClearAndType("Título", "Edited Mock Event");
    await asyncGetInputByLabelClearAndType("Início", "1800");
    await asyncGetInputByLabelClearAndType("Fim", "1900");
    await asyncGetButtonByTextAndClick("Salvar");

    expect(handleEditMock).toHaveBeenCalledWith(0, {
      bgColor: "#CDD3CE",
      endTime: "19:00",
      fieldKey: "mockteste1",
      id: 900,
      name: "Edited Mock Event",
      startTime: "18:00",
      weekDay: "SEGUNDA",
    });
  });
});
