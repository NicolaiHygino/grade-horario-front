import { render, screen } from "@testing-library/react";
import Page from "./page";

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

  daysOfWeek.forEach((day) => {
    it(`renders ${day} column`, () => {
      render(<Page />);
      const element = screen.getByText(day);
      expect(element).toBeInTheDocument();
    });
  });
});
