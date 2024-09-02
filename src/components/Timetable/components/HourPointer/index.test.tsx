import { render, screen } from "@testing-library/react";
import HourPointer from ".";

describe("Pointer", () => {
  it("should ensure top css equals 0px when time is 00:00", () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2000, 0, 1, 0, 0));

    render(<HourPointer hourHeight={20} />);
    const eventElement = screen.getByLabelText("hour-pointer");
    expect(eventElement).toHaveStyle({ top: "0px" });
  });

  it("should ensure top css equals 60px when time is 01:00 and hourHeight is 60", () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2000, 0, 1, 1, 0));

    render(<HourPointer hourHeight={60} />);
    const eventElement = screen.getByLabelText("hour-pointer");
    expect(eventElement).toHaveStyle({ top: "60px" });
  });

  it("should ensure top css equals 120px when time is 02:00 and hourHeight is 60", () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2000, 0, 1, 2, 0));

    render(<HourPointer hourHeight={60} />);
    const eventElement = screen.getByLabelText("hour-pointer");
    expect(eventElement).toHaveStyle({ top: "120px" });
  });

  it("should ensure top css equals 20px when time is 01:00 and hourHeight is 20", () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2000, 0, 1, 1, 0));

    render(<HourPointer hourHeight={20} />);
    const eventElement = screen.getByLabelText("hour-pointer");
    expect(eventElement).toHaveStyle({ top: "20px" });
  });

  it("should ensure top css equals 80px when time is 04:00 and hourHeight is 20", () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2000, 0, 1, 4, 0));

    render(<HourPointer hourHeight={20} />);
    const eventElement = screen.getByLabelText("hour-pointer");
    expect(eventElement).toHaveStyle({ top: "80px" });
  });
});
