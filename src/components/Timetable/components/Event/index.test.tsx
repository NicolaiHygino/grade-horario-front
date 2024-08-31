import { render, screen } from "@testing-library/react";
import Event from ".";
import { IEvent } from "../../types/IEvents";

describe("Event", () => {
  const mockEvent: IEvent = {
    id: 1,
    name: "Mock Event",
    startTime: "01:00",
    endTime: "02:00",
    weekDay: "DOMINGO",
    bgColor: "#ffffff",
  };

  it("should render event name", () => {
    render(<Event event={mockEvent} hourHeight={60} />);
    const element = screen.getByText("Mock Event");
    expect(element).toBeInTheDocument();
  });

  it("should render Start Time and End Time", () => {
    render(<Event event={mockEvent} hourHeight={60} />);
    const element = screen.getByText("01:00 - 02:00");
    expect(element).toBeInTheDocument();
  });

  it("should ensure height css equals 20px when hourHeight is 20 and event have one hour lenght", () => {
    const mockEvent: IEvent = {
      id: 1,
      name: "Mock Event 1",
      startTime: "01:00",
      endTime: "02:00",
      weekDay: "DOMINGO",
      bgColor: "#ffffff",
    };

    render(<Event event={mockEvent} hourHeight={20} />);
    const eventElement = screen.getByTestId("event");
    expect(eventElement).toHaveStyle({ height: "20px" });
  });

  it("should ensure heght css equals 40px when hourHeiht is 40 and event have one hour lenght", () => {
    const mockEvent: IEvent = {
      id: 1,
      name: "Mock Event 1",
      startTime: "01:00",
      endTime: "02:00",
      weekDay: "DOMINGO",
      bgColor: "#ffffff",
    };

    render(<Event event={mockEvent} hourHeight={40} />);
    const eventElement = screen.getByTestId("event");
    expect(eventElement).toHaveStyle({ height: "40px" });
  });

  it("should ensure heght css equals 120px when hourHeiht is 60 and event have two hour lenght", () => {
    const mockEvent: IEvent = {
      id: 1,
      name: "Mock Event 1",
      startTime: "01:00",
      endTime: "03:00",
      weekDay: "DOMINGO",
      bgColor: "#ffffff",
    };

    render(<Event event={mockEvent} hourHeight={60} />);
    const eventElement = screen.getByTestId("event");
    expect(eventElement).toHaveStyle({ height: "120px" });
  });

  it("should ensure heght css equals 80px when hourHeiht is 20 and event have four hour lenght", () => {
    const mockEvent: IEvent = {
      id: 1,
      name: "Mock Event 1",
      startTime: "01:00",
      endTime: "05:00",
      weekDay: "DOMINGO",
      bgColor: "#ffffff",
    };

    render(<Event event={mockEvent} hourHeight={20} />);
    const eventElement = screen.getByTestId("event");
    expect(eventElement).toHaveStyle({ height: "80px" });
  });

  it("should have css top 0px when startTime 00:00", () => {
    const mockEvent: IEvent = {
      id: 1,
      name: "Mock Event 1",
      startTime: "00:00",
      endTime: "00:00",
      weekDay: "DOMINGO",
      bgColor: "#ffffff",
    };

    render(<Event event={mockEvent} hourHeight={60} />);
    const eventElement = screen.getByTestId("event");
    expect(eventElement).toHaveStyle({ top: "0px" });
  });

  it("should have css top 60px when startTime 01:00 and hourHeight is 60", () => {
    const mockEvent: IEvent = {
      id: 1,
      name: "Mock Event 1",
      startTime: "01:00",
      endTime: "00:00",
      weekDay: "DOMINGO",
      bgColor: "#ffffff",
    };

    render(<Event event={mockEvent} hourHeight={60} />);
    const eventElement = screen.getByTestId("event");
    expect(eventElement).toHaveStyle({ top: "60px" });
  });

  it("should have css top 60px when startTime 01:00 and hourHeight is 60", () => {
    const mockEvent: IEvent = {
      id: 1,
      name: "Mock Event 1",
      startTime: "01:00",
      endTime: "00:00",
      weekDay: "DOMINGO",
      bgColor: "#ffffff",
    };

    render(<Event event={mockEvent} hourHeight={60} />);
    const eventElement = screen.getByTestId("event");
    expect(eventElement).toHaveStyle({ top: "60px" });
  });
});
