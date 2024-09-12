import { render, screen } from "@testing-library/react";
import Timetable, { IFieldEvent } from ".";

describe("Page", () => {
  const daysOfWeek = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

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
    {
      id: 901,
      name: "Intervalo",
      startTime: "21:00",
      endTime: "23:59",
      weekDay: "TERCA",
      bgColor: "#CDD3CE",
      fieldKey: "mockteste1",
    },
    {
      id: 902,
      name: "Intervalo",
      startTime: "21:00",
      endTime: "23:59",
      weekDay: "QUARTA",
      bgColor: "#CDD3CE",
      fieldKey: "mockteste1",
    },
  ];

  daysOfWeek.forEach((day) => {
    it(`renders ${day} column`, () => {
      render(
        <Timetable
          events={eventsMock}
          handleSubmitEvent={() => {}}
          handleEditEvent={() => {}}
          handleDeleteEvent={() => {}}
        />
      );
      const element = screen.getByText(day);
      expect(element).toBeInTheDocument();
    });
  });
});
