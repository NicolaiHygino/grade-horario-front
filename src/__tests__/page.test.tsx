import { render, screen } from "@testing-library/react";
import { describe } from "node:test";
import Page from "../app/page";

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
